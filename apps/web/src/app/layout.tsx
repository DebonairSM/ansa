import './globals.css';
import type { Metadata } from 'next';
import SessionProvider from '@/components/SessionProvider';
import { metadataBase } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-white text-black flex flex-col">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
