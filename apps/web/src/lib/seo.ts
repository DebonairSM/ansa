import type { Metadata } from 'next';

// Canonical site origin. Falls back to the production domain so builds
// without env vars never emit localhost URLs in metadata.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ansa-brasil.org').replace(/\/+$/, '');

export const metadataBase = new URL(siteUrl);

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

/**
 * Canonical + hreflang alternates for a localized route. Paths are relative
 * (resolved against metadataBase). Omit a locale's path when that page has
 * no counterpart — the result is then canonical-only.
 */
export function localeAlternates(
  locale: 'pt' | 'en',
  paths: { pt?: string | null; en?: string | null },
): Metadata['alternates'] {
  const canonical = locale === 'pt' ? paths.pt : paths.en;
  const alternates: Metadata['alternates'] = canonical ? { canonical } : {};
  if (paths.pt && paths.en) {
    alternates.languages = {
      'pt-BR': paths.pt,
      'en-US': paths.en,
      'x-default': paths.pt,
    };
  }
  return alternates;
}
