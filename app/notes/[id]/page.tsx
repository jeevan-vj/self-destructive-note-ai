'use client';

import { useNote } from '@/hooks/use-note';
import { NoteContent } from '@/components/notes/note-content';
import { NoteError } from '@/components/notes/note-error';
import { NoteSkeleton } from '@/components/notes/note-skeleton';

export default function NotePage({ params }: { params: { id: string } }) {
  const { note, error, isLoading } = useNote(params.id);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <NoteSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <NoteError message={error} />
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <NoteContent content={note.content} />
    </div>
  );
}