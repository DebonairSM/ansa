import { Suspense } from 'react';
import NewsletterUnsubscribePage from '@/components/newsletter/NewsletterUnsubscribePage';

export default function PtNewsletterUnsubscribePage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Carregando...</p>}>
      <NewsletterUnsubscribePage locale="pt" />
    </Suspense>
  );
}
