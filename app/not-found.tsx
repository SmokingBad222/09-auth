import type { Metadata } from 'next';
import NotFoundClient from '@/components/NotFoundClient/NotFoundClient';

export const metadata: Metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'This page does not exist. Return to home.',
  openGraph: {
    title: '404 - Page Not Found | NoteHub',
    description: 'This page does not exist. Return to home.',
    url: 'https://your-deploy-url.vercel.app/404',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}