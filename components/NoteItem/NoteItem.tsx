
'use client';

import type { Note } from '../../types/note';
import css from './NoteItem.module.css';
import Link from 'next/link';

interface NoteItemProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
  return (
    <div className={css.card}>
      <div className={css.header}>
        <h3>{note.title}</h3>
        <span className={css.tag}>{note.tag}</span>
      </div>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <Link href={`/notes/${note.id}`} className={css.link}>
          View details
        </Link>
        <button className={css.delete} onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

