
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/serverApi'; 
import NotePreviewClient from './NotePreview.client'; 
import { HydrationBoundary } from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>; 
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params; 

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}
