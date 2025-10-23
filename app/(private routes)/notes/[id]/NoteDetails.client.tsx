'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi'; 
import css from './NoteDetails.module.css';

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p className={css.loading}>Loading note...</p>;
  if (isError) return <p className={css.error}>Error loading note.</p>;
  if (!note) return <p className={css.error}>Note not found</p>;

  return (
    <div className={css.noteDetails}>
      <h1 className={css.noteTitle}>{note.title}</h1>
      <p className={css.noteContent}>{note.content}</p>
      {note.tag && <p className={css.noteTag}>#{note.tag}</p>}
      {note.createdAt && (
        <p className={css.noteDate}>
          Created at: {new Date(note.createdAt).toLocaleString()}
        </p>
      )}
    </div>
  );
}
