import { NextResponse } from 'next/server';
import { useNoteStore } from '@/lib/store';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await useNoteStore.getState().getNote(params.id);

    if (!note) {
      return NextResponse.json(
        { error: 'Note not found or expired' },
        { status: 404 }
      );
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error retrieving note:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve note' },
      { status: 500 }
    );
  }
}