'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import css from './CategoriesMenu.module.css';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];



export default function TagsMenu() {

  const [open, setOpen] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);

	// Додаємо ефект для запиту
	useEffect(() => {
		// Змінюємо стан
		fetchNotes({}).then(data => setNotes(data.notes));
  }, []);

  return (
    <div className={css.menuContainer}>
      <button 
      className={css.menuButton}
      onClick={() => setOpen((prev) => !prev)}
      >
        Notes ▾
      </button>
      {open && (
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              onClick={() => setOpen(false)}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
  )}
    </div>
  );
}
