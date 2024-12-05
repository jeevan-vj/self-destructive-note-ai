'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SuccessPage() {
  const router = useRouter();
  const noteLink = useNoteStore((state) => state.noteLink);

  useEffect(() => {
    if (!noteLink) {
      router.push('/');
    }
  }, [noteLink, router]);

  if (!noteLink) return null;

  const fullLink = `${window.location.origin}/notes/${noteLink}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullLink);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Note Created Successfully!</CardTitle>
          <CardDescription>
            Share this link with the intended recipient. Remember, the note will self-destruct after being viewed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input value={fullLink} readOnly />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
          <Button variant="outline" className="w-full" onClick={() => router.push('/')}>
            Create Another Note
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}