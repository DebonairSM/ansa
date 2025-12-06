'use client';

import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'pt', name: 'Português' },
  { code: 'en', name: 'English' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt';

  const switchLanguage = (newLocale: string) => {
    if (currentLocale === newLocale) return;

    // Replace current locale in pathname
    const newPath = pathname?.replace(`/${currentLocale}`, `/${newLocale}`) || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            currentLocale === lang.code
              ? 'bg-brand text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label={`Switch to ${lang.name}`}
          title={lang.name}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
}
