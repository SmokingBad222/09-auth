import css from './NotePreview.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
}

export default function NotePreview({ note }: { note: Note }) {
  return (
    <div className={css.card}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      {note.tag && <p className={css.tag}>#{note.tag}</p>}
    </div>
  );
}