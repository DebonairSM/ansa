import type { Metadata } from 'next';
import { Suspense } from 'react';
import NewsletterConfirmPage from '@/components/newsletter/NewsletterConfirmPage';

export const metadata: Metadata = {
  title: 'Confirmar Inscrição - ANSA Brasil',
  description: 'Confirme sua inscrição na newsletter da ANSA Brasil para receber novidades sobre nossos projetos.',
  robots: { index: false, follow: false },
};

export default function PtNewsletterConfirmPage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Carregando...</p>}>
      <NewsletterConfirmPage locale="pt" />
    </Suspense>
  );
}
