'use client';

import { useState, useEffect } from 'react';
import { NoteResponse } from '@/lib/types/note';

interface UseNoteResult {
  note: NoteResponse | null;
  error: string | null;
  isLoading: boolean;
}

export function useNote(id: string): UseNoteResult {
  const [note, setNote] = useState<NoteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/notes/${id}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch note');
        }
        const data = await response.json();
        setNote(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return { note, error, isLoading };
}