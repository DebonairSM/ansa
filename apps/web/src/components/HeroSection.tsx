'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Lang = 'pt' | 'en';

type HeroSectionProps = {
  heroImage: string;
  initialLang?: Lang;
};

const copy: Record<
  Lang,
  {
    headline: string;
    subheadline: string;
    lede: string;
    supporting: string;
    kpiLabel: string;
    year2017: string;
    yearToday: string;
    ratio2017: string;
    ratioToday: string;
    deltaLabel: string;
    primaryCta: string;
    secondaryCta: string;
    donationNote: string;
    trustBadges: string[];
    imageAlt: string;
    paypalHref: string;
    projectsHref: string;
    povertyLabel: string;
    sourceText: string;
  }
> = {
  pt: {
    headline: 'A pobreza infantil no Brasil caiu.',
    subheadline: 'Com você, pode cair muito mais.',
    lede:
      'Desde 2017, o índice de pobreza infantil reduziu, mas milhões de crianças ainda precisam de apoio diário.',
    supporting:
      'Com a sua doação, transformamos dados em ações concretas: acesso à educação, proteção e alimentação.',
    kpiLabel: 'PROGRESSO DESDE 2017',
    year2017: '2017',
    yearToday: 'HOJE',
    ratio2017: '6/10',
    ratioToday: '5/10',
    deltaLabel: 'Redução de 16,7% desde 2017',
    primaryCta: 'Doe Agora',
    secondaryCta: 'Nossos Projetos',
    donationNote: 'Sua contribuição é processada de forma segura.',
    trustBadges: [
      'Pagamento seguro via PayPal',
      '100% voluntário',
      '43 anos de missão',
      '24 projetos ativos',
    ],
    imageAlt: 'Crianças brasileiras sorrindo em um projeto social',
    paypalHref: 'https://www.paypal.com/US/fundraiser/charity/2006255',
    projectsHref: '/pt/projects',
    povertyLabel: 'crianças em pobreza',
    sourceText: 'Dados UNICEF 2023',
  },
  en: {
    headline: 'Child poverty in Brazil has fallen.',
    subheadline: 'With you, it can fall even further.',
    lede:
      'Since 2017, child poverty has decreased, but millions of children still need daily support.',
    supporting:
      'Your donation turns data into action: access to education, protection, and nutrition.',
    kpiLabel: 'PROGRESS SINCE 2017',
    year2017: '2017',
    yearToday: 'TODAY',
    ratio2017: '6/10',
    ratioToday: '5/10',
    deltaLabel: '16.7% reduction since 2017',
    primaryCta: 'Donate Now',
    secondaryCta: 'Our Projects',
    donationNote: 'Your contribution is processed securely.',
    trustBadges: [
      'Secure payment via PayPal',
      '100% volunteer-led',
      '43 years of mission',
      '24 active projects',
    ],
    imageAlt: 'Brazilian children smiling at a social project',
    paypalHref: 'https://www.paypal.com/US/fundraiser/charity/2006255',
    projectsHref: '/en/projects',
    povertyLabel: 'children in poverty',
    sourceText: 'UNICEF 2023 Data',
  },
};

export function HeroSection({ heroImage, initialLang = 'pt' }: HeroSectionProps) {
  const t = copy[initialLang];

  return (
    <header className="bg-white" role="banner">
      {/* Hero Container - side by side on desktop, stacked on mobile */}
      <div className="hero-container">
        {/* Image Section - Left (2/3 width on desktop) */}
        <div className="hero-image-section bg-gradient-to-br from-amber-100 to-amber-200">
          <Image
            src={heroImage}
            alt={t.imageAlt}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 66.666vw"
          />
        </div>

        {/* Content Section - Right (1/3 width on desktop) */}
        <div className="hero-content-section">
          <div className="w-full max-w-[28rem]">
            {/* Headline */}
            <h1 className="text-[1.75rem] sm:text-2xl lg:text-[2.5rem] font-bold text-gray-900 mb-3 leading-[1.2]">
              {t.headline}
            </h1>

            {/* Sub-headline */}
            <p className="text-[1.125rem] sm:text-xl lg:text-2xl font-bold text-amber-600 mb-5">
              {t.subheadline}
            </p>

            {/* Lede */}
            <p className="text-base text-gray-700 mb-3 leading-relaxed">
              {t.lede}
            </p>

            {/* Supporting */}
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              {t.supporting}
            </p>

            {/* Metrics Card */}
            <div className="bg-gray-50 rounded-xl p-5 sm:p-6 mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.05em] text-gray-600 mb-3">
                {t.kpiLabel}
              </p>
              <p className="text-lg font-bold text-gray-900 mb-4">
                {t.deltaLabel}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-3">
                {/* 2017 Metric */}
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase text-gray-600 mb-1">
                    {t.year2017}
                  </p>
                  <p className="text-[2rem] font-black text-gray-800 mb-1 leading-none">
                    {t.ratio2017}
                  </p>
                  <p className="text-xs text-gray-700">
                    {t.povertyLabel}
                  </p>
                </div>

                {/* Today Metric */}
                <div className="text-left">
                  <p className="text-xs font-semibold uppercase text-emerald-700 mb-1">
                    {t.yearToday}
                  </p>
                  <p className="text-[2rem] font-black text-emerald-700 mb-1 leading-none">
                    {t.ratioToday}
                  </p>
                  <p className="text-xs text-emerald-800 font-medium">
                    {t.povertyLabel}
                  </p>
                </div>
              </div>

              {/* Source */}
              <p className="text-xs text-gray-600 italic">
                {t.sourceText}
              </p>
            </div>

            {/* Primary CTA */}
            <a
              href={t.paypalHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-amber-500 text-white font-bold px-8 py-4 rounded-lg hover:bg-amber-600 transition-colors text-center text-lg mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 min-h-[3.5rem] flex items-center justify-center shadow-md"
              aria-label={`${t.primaryCta} - ${initialLang === 'pt' ? 'Abre em nova aba' : 'Opens in new tab'}`}
            >
              {t.primaryCta}
            </a>

            {/* Secondary CTA */}
            <Link
              href={t.projectsHref}
              className="block w-full bg-white border-2 border-gray-300 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 min-h-[3rem] flex items-center justify-center"
            >
              {t.secondaryCta}
            </Link>

            {/* Trust Section */}
            <p className="text-sm text-gray-600 font-medium mb-2">
              {t.donationNote}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
              {t.trustBadges.map((badge, index) => (
                <span key={badge} className="flex items-center gap-1.5">
                  {(index === 0 || index === t.trustBadges.length - 1) && (
                    <span className="text-emerald-600 text-base">✓</span>
                  )}
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}


