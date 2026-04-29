'use client';

import { useEffect } from 'react';

/**
 * On homepage, scroll to the newsletter section when the URL hash is #newsletter
 * (e.g. after clicking NEWSLETTER in the nav).
 */
export default function ScrollToNewsletter() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash !== '#newsletter') return;
    const el = document.getElementById('newsletter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return null;
}
