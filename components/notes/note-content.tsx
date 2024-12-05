import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface NoteContentProps {
  content: string;
}

export function NoteContent({ content }: NoteContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Note</CardTitle>
        <CardDescription>
          This note will be destroyed after viewing. Make sure to save its contents if needed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}