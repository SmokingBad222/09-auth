'use client';

import css from './Notes.client.module.css';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, FetchNotesResponse } from '@/lib/api/clientApi';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';


interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, tag, searchTerm],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        tag,
        search: searchTerm || undefined,
      }),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load notes</p>;

 return (
    <div className={css.container}>
      <div className={css.topBar}>
        <SearchBox
          value={searchTerm}
          onChange={(value) => debouncedSearch(value)}
        />
        <Link href="/notes/action/create" className={css.createButton}>
          + Create Note
        </Link>
      </div>

      {notes.length > 0 ? (
        <>
          <NoteList notes={notes} />
          <Pagination
            currentPage={page}
            pageCount={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}
