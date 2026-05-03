import type { Metadata } from 'next';
import { Suspense } from 'react';
import NewsletterConfirmPage from '@/components/newsletter/NewsletterConfirmPage';

export const metadata: Metadata = {
  title: 'Confirm Subscription - ANSA Brasil',
  description: 'Confirm your subscription to the ANSA Brasil newsletter to receive updates on our projects.',
  robots: { index: false, follow: false },
};

export default function EnNewsletterConfirmPage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Loading...</p>}>
      <NewsletterConfirmPage locale="en" />
    </Suspense>
  );
}
