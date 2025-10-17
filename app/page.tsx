'use client';

import css from './page.module.css';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <section>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.description}>
            NoteHub is a simple and efficient application designed for managing personal notes...
          </p>
          <p className={css.description}>
            The app provides a clean interface for writing, editing, and browsing notes...
          </p>
          <Image
            src="https://picsum.photos/seed/picsum/300/300"
            alt="test"
            width={300}
            height={300}
          />
        </section>
      </div>
    </main>
  );
}
