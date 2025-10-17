import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: 'Create note — NoteHub',
  description: 'Create a new note in NoteHub.',
 openGraph: {
    title: 'Create Note — NoteHub',
    description: 'Create a new note in NoteHub.',
    url: 'https://your-deploy-url.vercel.app/notes/action/create',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
