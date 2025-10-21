import { QueryClient, dehydrate } from '@tanstack/react-query';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { fetchNotes } from '@/lib/api/clientApi';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';
import css from './NotePage.module.css'

type Props = {
  params: Promise<{ slug: string[] }>; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';
   return {
    title: `Notes — ${tag} | NoteHub`,
    description: `Browse your ${tag} notes in NoteHub.`,
    openGraph: {
      title: `Notes — ${tag} | NoteHub`,
      description: `Browse your ${tag} notes in NoteHub.`,
      url: `https://your-deploy-url.vercel.app/notes/filter/${tag}`,
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params; 
  const tag = slug?.[0] === 'All' ? '' : slug?.[0] || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: tag }),
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydrated}>
      <NotesClient tag={tag} />
    </TanStackProvider>
  );
}
