export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  expiresAt: Date;
  isDestroyed: boolean;
}

export interface NoteResponse {
  content: string;
}