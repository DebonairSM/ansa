import type { Metadata } from 'next';
import { Suspense } from 'react';
import NewsletterUnsubscribePage from '@/components/newsletter/NewsletterUnsubscribePage';

export const metadata: Metadata = {
  title: 'Unsubscribe - ANSA Brasil',
  description: 'Unsubscribe from the ANSA Brasil newsletter.',
  robots: { index: false, follow: false },
};

export default function EnNewsletterUnsubscribePage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Loading...</p>}>
      <NewsletterUnsubscribePage locale="en" />
    </Suspense>
  );
}
