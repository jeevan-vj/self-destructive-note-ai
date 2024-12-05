import { NextResponse } from 'next/server';
import { useNoteStore } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const { content, expiration } = await request.json();
    const id = await useNoteStore.getState().createNote(content, expiration);
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}