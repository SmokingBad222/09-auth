
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { fetchNoteById } from "@/lib/api";
import NoteDetailsPage from "./NoteDetails.client";
import NoteDetailsClient from '@/components/NoteDetails/NoteDetails';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)
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

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={ id} />
    </HydrationBoundary>
  )
}

export default NoteDetails
