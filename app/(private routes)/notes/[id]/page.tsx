
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from '@/components/NoteDetails/NoteDetails';
import { Metadata } from 'next';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const note = await fetchNoteById(id);
   return {
    title: `Note: ${note.title} | NoteHub`,
    description: note.content.slice(0, 60),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 60),
      url: `https://your-deploy-url.vercel.app/notes/${id}`,
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    },
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
   const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NoteDetailsClient id={id} />
    </TanStackProvider>
  );
}
