'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import DonateLink from './DonateLink';

const menuItems = {
  pt: [
    { href: '/pt', label: 'HOME' },
    { href: '/pt/about', label: 'QUEM SOMOS' },
    { href: '/pt/projects', label: 'PROJETOS' },
    { href: '/pt/contact', label: 'CONTATO' },
    { href: '/pt/rules', label: 'REGRAS' },
    { href: '/pt#newsletter', label: 'NEWSLETTER' },
  ],
  en: [
    { href: '/en', label: 'HOME' },
    { href: '/en/about', label: 'ABOUT US' },
    { href: '/en/projects', label: 'PROJECTS' },
    { href: '/en/contact', label: 'CONTACT' },
    { href: '/en/rules', label: 'TERMS' },
    { href: '/en#newsletter', label: 'NEWSLETTER' },
  ],
};

const donateLabel = { pt: 'DOAR', en: 'DONATE' };

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith('/en') ? 'en' : 'pt';
  const items = menuItems[currentLocale as keyof typeof menuItems];
  const menuLabel = currentLocale === 'pt' ? 'Navegação principal' : 'Main navigation';
  const openMenuLabel = currentLocale === 'pt' ? 'Abrir menu' : 'Open menu';
  const closeMenuLabel = currentLocale === 'pt' ? 'Fechar menu' : 'Close menu';

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === `/${currentLocale}`) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" aria-label={menuLabel}>
      <div className="container-custom">
        <div className="flex min-h-16 items-center justify-between py-2 sm:min-h-18 sm:py-3">
          {/* Logo/Brand */}
          <Link href={`/${currentLocale}`} className="flex items-center no-underline">
            <Image
              src="/ansa-logo.png"
              alt="ANSA Brasil"
              width={140}
              height={45}
              priority
              className="h-9 w-auto sm:h-11"
              style={{ height: 'auto' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold transition-colors no-underline ${
                  isActive(item.href)
                    ? 'text-yellow-600'
                    : 'text-gray-700 hover:text-yellow-600'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            {currentLocale === 'pt' ? (
              <Link
                href="/pt/donate"
                className="text-sm font-semibold text-gray-700 hover:text-yellow-600 transition-colors no-underline"
              >
                {donateLabel[currentLocale as keyof typeof donateLabel]}
              </Link>
            ) : (
              <DonateLink
                cta="nav-desktop"
                className="text-sm font-semibold text-gray-700 hover:text-yellow-600 transition-colors no-underline"
              >
                {donateLabel[currentLocale as keyof typeof donateLabel]}
              </DonateLink>
            )}
            {/* Admin link hidden for now
            <Link
              href="/admin/newsletter"
              className="text-sm font-semibold text-gray-500 hover:text-yellow-600 transition-colors no-underline"
            >
              Admin
            </Link>
            */}
          </div>

          {/* Desktop Language Switcher */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? closeMenuLabel : openMenuLabel}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
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
          <div id="mobile-navigation" className="lg:hidden border-t py-3">
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex min-h-11 items-center rounded-md px-3 text-base font-semibold transition-colors no-underline ${
                    isActive(item.href)
                      ? 'text-yellow-600'
                      : 'text-gray-700 hover:text-yellow-600'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {currentLocale === 'pt' ? (
                <Link
                  href="/pt/donate"
                  className="flex min-h-11 items-center rounded-md px-3 text-base font-semibold text-gray-800 no-underline hover:bg-amber-50 hover:text-amber-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {donateLabel[currentLocale as keyof typeof donateLabel]}
                </Link>
              ) : (
                <DonateLink
                  cta="nav-mobile"
                  className="flex min-h-11 items-center rounded-md px-3 text-base font-semibold text-gray-800 no-underline hover:bg-amber-50 hover:text-amber-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {donateLabel[currentLocale as keyof typeof donateLabel]}
                </DonateLink>
              )}
              {/* Admin link hidden for now
              <Link
                href="/admin/newsletter"
                className="text-base font-semibold text-gray-500 hover:text-yellow-600 transition-colors no-underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
              */}
              <div className="mt-2 border-t px-3 pt-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
