'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

const menuItems = {
  pt: [
    { href: '/pt', label: 'HOME' },
    { href: '/pt/about', label: 'QUEM SOMOS' },
    { href: '/pt/projects', label: 'PROJETOS' },
    { href: '/pt/contact', label: 'CONTATO' },
    { href: '/pt/regras', label: 'REGRAS' },
    { href: 'https://www.paypal.com/US/fundraiser/charity/2006255', label: 'DOAR', external: true },
  ],
  en: [
    { href: '/en', label: 'HOME' },
    { href: '/en/about', label: 'ABOUT US' },
    { href: '/en/projects', label: 'PROJECTS' },
    { href: '/en/contact', label: 'CONTACT' },
    { href: '/en/rules', label: 'TERMS' },
    { href: 'https://www.paypal.com/US/fundraiser/charity/2006255', label: 'DONATE', external: true },
  ],
};

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt';
  const items = menuItems[currentLocale as keyof typeof menuItems];

  const isActive = (href: string) => {
    if (href === `/${currentLocale}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link href={`/${currentLocale}`} className="flex items-center no-underline">
            <Image
              src="/ansa-logo.png"
              alt="ANSA Brasil"
              width={140}
              height={45}
              priority
              className="h-11 w-auto"
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-gray-700 hover:text-yellow-600 transition-colors no-underline"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors no-underline ${
                    isActive(item.href)
                      ? 'text-yellow-600'
                      : 'text-gray-700 hover:text-yellow-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {items.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-gray-700 hover:text-yellow-600 transition-colors no-underline"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-base font-semibold transition-colors no-underline ${
                      isActive(item.href)
                        ? 'text-yellow-600'
                        : 'text-gray-700 hover:text-yellow-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
