import axios from 'axios';

export const baseURL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: baseURL + '/api',
  withCredentials: true,
});

export const nextServer = api;

import type { AxiosError } from 'axios';
export type ApiError = AxiosError<{ error?: string; message?: string }>;
