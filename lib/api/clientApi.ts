import axios from 'axios';
import type { Note } from '../../types/note';

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, 
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
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
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

  const { data } = await nextServer.get<FetchNotesResponse>('/notes', { params });
  return data;
};

export const createNote = async (
  body: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', body);
  return data;
};


export const deleteNote = async (id: string): Promise<Note> => {  
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export type User = {
  id: string;
  email: string;
  userName?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export type UpdateUserRequest = {
  userName?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.put<User>('/auth/me', payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await nextServer.post('/upload', formData);
  return data.url;
};