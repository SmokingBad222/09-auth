// lib/store/noteStore.ts
import { NoteTag } from '@/types/note';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: DraftNote;
  setDraft: (patch: Partial<DraftNote>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) =>
        set((state) => ({ draft: { ...state.draft, ...patch } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-note-store',
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
