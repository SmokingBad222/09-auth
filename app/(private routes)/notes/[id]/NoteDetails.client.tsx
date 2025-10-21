import {   dehydrate, QueryClient } from '@tanstack/react-query';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteDetailsClient from '@/components/NoteDetails/NoteDetails'; 
import css from './NoteDetails.module.css'

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params; 
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
