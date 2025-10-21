'use client';

import { FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/clientApi';
import type { NoteTag } from '@/types/note';
import {  useMutation, useQueryClient } from '@tanstack/react-query';



interface NoteFormProps {
  onClose?: () => void;
  onCreated?: () => void;
}

export default function NoteForm({ onClose, onCreated }: NoteFormProps) {
  const router = useRouter();
  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: { title: string; content: string; tag: NoteTag }) =>
      createNote(payload),
    onSuccess: () => {

      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCreated?.();
      router.back();
    },
    onError: (err) => {
      console.error('Create note failed', err);
    },
  });

const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  if (name === 'tag') {
      setDraft({ tag: value as NoteTag });
    } else if (name === 'title') {
      setDraft({ title: value });
    } else if (name === 'content') {
      setDraft({ content: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (!draft.title.trim() || !draft.content.trim()) {
    
    return;
  }

    mutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag as NoteTag,
    });
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
      >
      <label className={css.label}>
        Title
        <input
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
          required
        />
      </label>

      <label className={css.label}>
        Content
        <textarea name="content" value={draft.content} onChange={handleChange} className={css.textarea} required />
      </label>

      <label className={css.label}>
        Tag
         <select
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

     <div className={css.actions}>
        <button
          type="submit"
          className={css.submitBtn}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>

        <button
          type="button"
          className={css.cancelBtn}
          onClick={() => {
      
            if (onClose) onClose();
            else router.back();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
