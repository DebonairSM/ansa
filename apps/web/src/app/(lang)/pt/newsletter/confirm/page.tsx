import { Suspense } from 'react';
import NewsletterConfirmPage from '@/components/newsletter/NewsletterConfirmPage';

export default function PtNewsletterConfirmPage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Carregando...</p>}>
      <NewsletterConfirmPage locale="pt" />
    </Suspense>
  );
}
