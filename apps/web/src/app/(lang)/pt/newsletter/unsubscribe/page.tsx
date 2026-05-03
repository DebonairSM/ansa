import type { Metadata } from 'next';
import { Suspense } from 'react';
import NewsletterUnsubscribePage from '@/components/newsletter/NewsletterUnsubscribePage';

export const metadata: Metadata = {
  title: 'Cancelar Inscrição - ANSA Brasil',
  description: 'Cancele sua inscrição na newsletter da ANSA Brasil.',
  robots: { index: false, follow: false },
};

export default function PtNewsletterUnsubscribePage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Carregando...</p>}>
      <NewsletterUnsubscribePage locale="pt" />
    </Suspense>
  );
}
