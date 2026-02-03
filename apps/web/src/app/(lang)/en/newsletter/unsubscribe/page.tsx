import { Suspense } from 'react';
import NewsletterUnsubscribePage from '@/components/newsletter/NewsletterUnsubscribePage';

export default function EnNewsletterUnsubscribePage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Loading...</p>}>
      <NewsletterUnsubscribePage locale="en" />
    </Suspense>
  );
}
