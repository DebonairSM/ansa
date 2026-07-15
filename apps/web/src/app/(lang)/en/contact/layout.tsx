import type { Metadata } from 'next';
import { localeAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact - ANSA Brasil',
  alternates: localeAlternates('en', { pt: '/pt/contact', en: '/en/contact' }),
  description: 'Get in touch with ANSA Brasil. Reach our team in Fairfax, Virginia by phone, email, or social media, or send us a message directly.',
};

export default function ContactEnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
