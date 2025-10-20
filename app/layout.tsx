
import './globals.css';
import type { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Simple and powerful notes app built with Next.js.',
  openGraph: {
    title: 'NoteHub — Simple note app',
    description: 'A simple note app built with Next.js and React.',
    url: 'https://your-deploy-url.vercel.app',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }, 
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} `}>
        <TanStackProvider>
          <AuthProvider> {/* <-- додаємо провайдер */}
            <Header />
            <main>{/* className={style.main}*/}
              {children}
              {modal}
            </main>
            <footer> {/*className={style.footer}*/}
              <p>
                Created <time dateTime="2025">2025</time>
              </p>
            </footer>
          </AuthProvider> 
        </TanStackProvider>
      </body>
    </html>
  );
}



