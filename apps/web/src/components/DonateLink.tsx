'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';

export const PAYPAL_DONATION_URL = 'https://www.paypal.com/US/fundraiser/charity/2006255';

type DonateLinkProps = {
  cta: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export default function DonateLink({
  cta,
  children,
  className,
  style,
  ariaLabel,
  onClick,
}: DonateLinkProps) {
  const pathname = usePathname() || '/';
  const locale: 'pt' | 'en' = pathname.startsWith('/en') ? 'en' : 'pt';

  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((event) => {
    try {
      const payload = JSON.stringify({ cta, page: pathname, locale });
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon('/api/donate/click', blob);
      } else if (typeof fetch === 'function') {
        fetch('/api/donate/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Tracking must never block navigation.
    }
    onClick?.(event);
  }, [cta, pathname, locale, onClick]);

  return (
    <a
      href={PAYPAL_DONATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
