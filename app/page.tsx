import { CreateNoteForm } from '@/components/create-note-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create a Secure Note</CardTitle>
          <CardDescription>
            Share sensitive information securely. Your note will self-destruct after being viewed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNoteForm />
        </CardContent>
      </Card>
    </div>
  );
}