import { Suspense } from 'react';
import NewsletterConfirmPage from '@/components/newsletter/NewsletterConfirmPage';

export default function EnNewsletterConfirmPage() {
  return (
    <Suspense fallback={<p className="text-center py-16 text-gray-600">Loading...</p>}>
      <NewsletterConfirmPage locale="en" />
    </Suspense>
  );
}
