import { create } from 'zustand';
import { encrypt, decrypt } from './encryption';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
  expiresAt: Date;
  isDestroyed: boolean;
}

interface NoteStore {
  notes: Record<string, Note>;
  createNote: (content: string, expirationTime: string) => Promise<string>;
  getNote: (id: string) => Promise<{ content: string } | null>;
  noteLink: string | null;
  setNoteLink: (link: string | null) => void;
}

const EXPIRATION_TIMES = {
  '5m': 5 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
} as const;

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: {},
  noteLink: null,
  setNoteLink: (link) => set({ noteLink: link }),

  createNote: async (content: string, expirationTime: string) => {
    const id = Math.random().toString(36).substring(2, 15);
    const encryptedContent = encrypt(content);
    const expiresAt = new Date(Date.now() + EXPIRATION_TIMES[expirationTime as keyof typeof EXPIRATION_TIMES]);

    const note: Note = {
      id,
      content: encryptedContent,
      createdAt: new Date(),
      expiresAt,
      isDestroyed: false,
    };

    set((state) => ({
      notes: { ...state.notes, [id]: note },
    }));

    return id;
  },

  getNote: async (id: string) => {
    const state = get();
    const note = state.notes[id];

    if (!note) return null;
    if (note.isDestroyed) return null;
    if (new Date() > note.expiresAt) {
      set((state) => ({
        notes: {
          ...state.notes,
          [id]: { ...note, isDestroyed: true },
        },
      }));
      return null;
    }

    const decryptedContent = decrypt(note.content);

    // Mark as destroyed after reading
    set((state) => ({
      notes: {
        ...state.notes,
        [id]: { ...note, isDestroyed: true },
      },
    }));

    return { content: decryptedContent };
  },
}));