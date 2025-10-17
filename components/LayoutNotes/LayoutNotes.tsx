'use client';

import { PropsWithChildren } from 'react';
import css from './LayoutNotes.module.css';


export default function LayoutNotes({ children }: PropsWithChildren) {
  return <div className={css.container}>{children}</div>;
}