"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useRouter } from "next/router";
import type { Note } from "@/types/note";
import css from './NoteDetails.module.css'


type NoteDetailsClientProps = {
  id: string; 
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();
  
  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note</p>;
  if (!data) return <p>No note found</p>;

 return (
    <div className={css.container}>
      <div className={css.item}>
        <button onClick={() => router.back()} className={css.backBtn}>
          ← Back
        </button>

        <div className={css.header}>
          <h2>{data.title}</h2>
          {data.tag && <span className={css.tag}>{data.tag}</span>}
        </div>

        <div className={css.content}>{data.content}</div>

        <div className={css.date}>
          Created at: {new Date(data.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}