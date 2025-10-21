"use client";

import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api/clientApi";
import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (notes.length === 0) return <p>No notes available</p>;

  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`}>
            <h3>{note.title}</h3>
          </Link>
          <p>{note.content}</p>
          <span>{note.tag}</span>
          <button onClick={() => mutation.mutate(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

