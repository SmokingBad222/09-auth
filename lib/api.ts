import axios from 'axios';
import type { Note } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  tag?: string;
  search?: string;
}


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNoteById = async (id: string): Promise<Note> => { 
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const fetchNotes = async ({
  page =1,
  tag,
  search = '',
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page};
  if (tag) params.tag = tag;
  if (search) params.search = search;

  const { data } = await api.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const createNote = async (
  body: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', body);
  return data;
};


export const deleteNote = async (id: string): Promise<Note> => {  
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};



