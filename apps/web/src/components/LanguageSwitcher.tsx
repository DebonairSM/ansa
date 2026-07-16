'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt';
  const targetLocale = currentLocale === 'en' ? 'pt' : 'en';
  const targetName = targetLocale === 'pt' ? 'Português' : 'English';
  const targetPath = pathname?.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`;

  return (
    <Link
      href={targetPath}
      hrefLang={targetLocale}
      lang={targetLocale}
      className="inline-flex min-h-11 min-w-28 items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 no-underline transition-colors hover:border-amber-600 hover:bg-amber-50"
      aria-label={`Switch language to ${targetName}`}
    >
      {targetName}
    </Link>
  );
}
