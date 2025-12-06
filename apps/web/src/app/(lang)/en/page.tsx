import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'ANSA Brasil - Home',
  description: 'Associação Nossa Senhora Aparecida - Helping Brazilian communities in need since 1982 through donations and volunteer work.',
  openGraph: {
    title: 'ANSA Brasil',
    description: 'Helping Brazilian communities in need since 1982',
    type: 'website',
    locale: 'en_US',
  },
};

export default function EnHome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - matching hero-mockup.html exactly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .hero-container {
          display: flex;
          flex-direction: column;
        }
        .hero-img-section {
          width: 100%;
          height: 40vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        .hero-txt-section {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          background: linear-gradient(160deg, #fefce8 0%, #fffdf7 40%, #ffffff 100%);
        }
        @media (min-width: 1024px) {
          .hero-container {
            flex-direction: row;
            align-items: stretch;
          }
          .hero-img-section {
            width: 50%;
            height: auto;
            min-height: 560px;
          }
          .hero-txt-section {
            width: 50%;
            padding: 2.5rem 3rem;
            align-items: flex-start;
          }
        }
        @media (min-width: 1440px) {
          .hero-txt-section {
            padding: 3rem 4rem;
          }
        }
      `}} />
      <div className="hero-container">
        {/* Image Section - Left (2/3 on desktop) */}
        <div className="hero-img-section relative" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img
            src="/uploads/2020/11/Ansa-Pic.jpg"
            alt="Brazilian children smiling at a social project"
            className="w-full object-cover"
            style={{ 
              maxHeight: '100%', 
              position: 'relative', 
              zIndex: 1,
              maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
            }}
          />
          {/* Bottom gradient on mobile - stronger for content blend */}
          <div 
            className="absolute bottom-0 left-0 right-0 pointer-events-none lg:hidden"
            style={{ 
              background: 'linear-gradient(to bottom, transparent 0%, rgba(254, 243, 199, 0.6) 50%, #fef8e8 100%)',
              height: '40%',
              zIndex: 20
            }}
          />
          {/* Right gradient on desktop - blends into content */}
          <div 
            className="absolute top-0 bottom-0 right-0 pointer-events-none hidden lg:block"
            style={{ 
              background: 'linear-gradient(to right, transparent 0%, rgba(254, 243, 199, 0.6) 50%, #fef8e8 100%)',
              width: '40%',
              zIndex: 20
            }}
          />
        </div>

        {/* Content Section - Right (1/3 on desktop) - 2025 UI/UX */}
        <div className="hero-txt-section">
          <div className="w-full max-w-[36rem]">
            {/* Eyebrow label */}
            <div 
              className="inline-flex items-center gap-2 mb-4"
              style={{
                padding: '0.375rem 0.875rem',
                background: 'rgba(245, 158, 11, 0.12)',
                borderRadius: '100px',
                fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
                fontWeight: 600,
                color: '#b45309',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ 
                width: '6px', 
                height: '6px', 
                background: '#f59e0b', 
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              Making an impact since 1982
            </div>

            {/* Headline - tight tracking, dramatic weight */}
            <h1 
              className="leading-[1.05] mb-3"
              style={{ 
                fontSize: 'clamp(2rem, 3vw, 3rem)', 
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.025em'
              }}
            >
              Child poverty in Brazil
              <span style={{ display: 'block', color: '#047857' }}>has fallen.</span>
            </h1>

            {/* Sub-headline - gradient text effect */}
            <p 
              className="mb-5"
              style={{ 
                fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              With you, it can fall even further.
            </p>

            {/* Body copy - refined line height */}
            <p 
              className="mb-6"
              style={{ 
                fontSize: 'clamp(0.95rem, 1.1vw, 1.0625rem)', 
                color: '#475569', 
                lineHeight: 1.7,
                maxWidth: '32rem'
              }}
            >
              Since 2017, child poverty has decreased—but millions of children still need daily support. 
              Your donation turns data into action: education, protection, and nutrition.
            </p>

            {/* Metrics Card - Glass morphism 2025 */}
            <div 
              className="rounded-2xl mb-6"
              style={{ 
                padding: 'clamp(1.25rem, 1.75vw, 1.75rem)',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
                boxShadow: '0 4px 24px -4px rgba(251, 191, 36, 0.15), 0 0 0 1px rgba(255,255,255,0.5) inset'
              }}
            >
              {/* Progress badge */}
              <div 
                className="mb-4"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.625rem',
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#166534'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>16.7% reduction achieved</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* 2017 Metric */}
                <div>
                  <p 
                    className="uppercase mb-2"
                    style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}
                  >
                    2017
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span 
                      style={{ 
                        fontSize: 'clamp(2.25rem, 3vw, 3rem)', 
                        fontWeight: 800, 
                        color: '#334155',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      6
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#64748b' }}>/10</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                    children in poverty
                  </p>
                </div>

                {/* Today Metric - highlighted */}
                <div 
                  className="rounded-xl"
                  style={{ 
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.12) 100%)',
                    marginLeft: '-0.5rem',
                    marginRight: '-0.5rem'
                  }}
                >
                  <p 
                    className="uppercase mb-2"
                    style={{ fontSize: '0.7rem', fontWeight: 700, color: '#059669', letterSpacing: '0.1em' }}
                  >
                    Today
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span 
                      style={{ 
                        fontSize: 'clamp(2.25rem, 3vw, 3rem)', 
                        fontWeight: 800, 
                        color: '#059669',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      5
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#10b981' }}>/10</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 500, marginTop: '0.25rem' }}>
                    children in poverty
                  </p>
                </div>
              </div>

              {/* Source */}
              <p 
                className="mt-4 pt-3"
                style={{ 
                  fontSize: '0.7rem', 
                  color: '#94a3b8',
                  borderTop: '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                Source: UNICEF 2023 Report
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section - Centered below hero */}
      <div 
        style={{ 
          background: 'linear-gradient(180deg, #fef8e8 0%, #ffffff 100%)',
          padding: '2rem 1.5rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* CTA Buttons */}
        <div 
          style={{ 
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link
            href="https://www.paypal.com/US/fundraiser/charity/2006255"
            target="_blank"
            className="group flex items-center justify-center gap-2 text-center transition-all duration-200 hover:scale-105"
            style={{ 
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '1rem 2.5rem',
              borderRadius: '100px',
              boxShadow: '0 8px 24px -4px rgba(245, 158, 11, 0.4), 0 2px 8px -2px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Donate Now
          </Link>
          <Link
            href="/en/projects"
            className="flex items-center justify-center gap-2 text-center transition-all duration-200 hover:bg-amber-50"
            style={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#92400e',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '1rem 2.5rem',
              border: '2px solid #fcd34d',
              borderRadius: '100px',
              boxShadow: '0 2px 8px -2px rgba(0,0,0,0.05)'
            }}
          >
            Our Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Trust Badges */}
        <div 
          style={{ 
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1.25rem'
          }}
        >
          <span 
            className="inline-flex items-center gap-1.5"
            style={{
              padding: '0.375rem 0.75rem',
              background: 'rgba(16, 185, 129, 0.08)',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#047857'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Secure via PayPal
          </span>
          <span 
            className="inline-flex items-center gap-1.5"
            style={{
              padding: '0.375rem 0.75rem',
              background: 'rgba(59, 130, 246, 0.08)',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#1d4ed8'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            43 years
          </span>
          <span 
            className="inline-flex items-center gap-1.5"
            style={{
              padding: '0.375rem 0.75rem',
              background: 'rgba(168, 85, 247, 0.08)',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#7c3aed'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            100% volunteer
          </span>
          <span 
            className="inline-flex items-center gap-1.5"
            style={{
              padding: '0.375rem 0.75rem',
              background: 'rgba(245, 158, 11, 0.08)',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#b45309'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            24 projects
          </span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="flex justify-center py-8 bg-white">
        <div 
          style={{ 
            width: '200px',
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #eab308, transparent)',
            borderRadius: '2px'
          }}
        />
      </div>

      {/* Progress & Impact Section */}
      <section className="py-16 px-4 bg-white border-b-4 border-yellow-500">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Measurable Progress. Real Impact.</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">What we've achieved</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Multidimensional child poverty fell from <strong>62.5% (2017)</strong> to <strong>55.9% (2023)</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>More than <strong>6 percentage points</strong> reduction confirmed by UNICEF</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><strong>24 projects</strong> supported by ANSA in <strong>10+ Brazilian states</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><strong>43 years</strong> of continuous mission, <strong>100% volunteer-run</strong></span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">What we still need to do</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>More than <strong>30 million children</strong> still live in multidimensional poverty</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Access to <strong>water, sanitation, and education</strong> remain critical challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Daycare centers, schools, and community programs need <strong>ongoing resources</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Each donation keeps this <strong>progress moving forward</strong></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xl text-gray-700 mb-6">
              <strong>You're not just helping.</strong> You're accelerating change that data already proves.
            </p>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
            >
              Be Part of This Change
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Who We Are</h2>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The Associação Nossa Senhora Aparecida (ANSA) is an association, created in 1982,
              maintained through donations and volunteer work, with zero costs (everything is donated).
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              ANSA helps Brazilian children and women in need, through institutions that
              need resources such as daycare centers, orphanages, schools and community groups.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              All ANSA members, without exception, are volunteers who generously
              collaborate in this mission.
            </p>
          </div>

          {/* Supported Institutions Grid */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">24 Supported Institutions Across Brazil</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/en/projects/associacao-paulo-vi" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Paulo VI Association</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Guaratuba, Paraná</p>
                <p className="text-sm text-gray-600 mb-4">
                  Serves vulnerable children and adolescents with artistic activities, dance, theater and sports.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
              <Link href="/en/projects/solar-menino-luz" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Solar Menino de Luz</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Rio de Janeiro, RJ</p>
                <p className="text-sm text-gray-600 mb-4">
                  Promotes comprehensive education for families in the Pavão-Pavãozinho and Cantagalo communities.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
              <Link href="/en/projects/comunidade-ilha-maruim" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Ilha do Maruim Community</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Olinda, Pernambuco</p>
                <p className="text-sm text-gray-600 mb-4">
                  Construction of community parish hall for professional training programs.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
              <Link href="/en/projects/lar-santa-monica" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Santa Mônica Home</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Fortaleza, Ceará</p>
                <p className="text-sm text-gray-600 mb-4">
                  Shelters girls who are victims of sexual abuse and exploitation, providing protection and care.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">LEARN MORE →</span>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/en/projects"
                className="inline-block text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                View all 24 projects →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 px-4 bg-yellow-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">24</p>
              <p className="text-lg text-white font-semibold">Projects Supported</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">10+</p>
              <p className="text-lg text-white font-semibold">States Reached</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">43+</p>
              <p className="text-lg text-white font-semibold">Years of Mission</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">100%</p>
              <p className="text-lg text-white font-semibold">Volunteer-Run</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Image */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96">
            <Image
              src="/uploads/2015/12/image2.png"
              alt="Brazilian children"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Even from afar, we work for a better Brazil!
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Discover more about our community projects here!
            </p>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
            >
              DONATE
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our mission is to improve the quality of life of our children, whether by benefiting
            entities they belong to, or by increasing their family income through
            community programs.
          </p>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How can you participate?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Spreading the Word</h3>
              <p className="text-lg text-gray-700">
                Help us spread ANSA's message and continue supporting children in
                Brazil. Telling a friend makes a big impact.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Staying in Touch</h3>
              <p className="text-lg text-gray-700">
                Join our email list and we will keep you informed about the projects and
                communities we work with.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Donating</h3>
              <p className="text-lg text-gray-700 mb-6">
                Donations help us promote our mission and continue to impact lives. Your
                financial support helps keep ANSA running.
              </p>
              <Link
                href="https://www.paypal.com/US/fundraiser/charity/2006255"
                target="_blank"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                DONATE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif italic mb-6">
            "Everything we do is a drop in the ocean, but if we don't do it, that drop will be lost forever."
          </blockquote>
          <p className="text-xl">-Mother Teresa of Calcutta</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Link href="/en/projects/santa-claus-project" className="group block">
              <div className="relative h-80 mb-6">
                <Image
                  src="/uploads/2015/12/image20.png"
                  alt="Santa Claus Project"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">Santa Claus Project</h3>
              <p className="text-gray-700 leading-relaxed">
                ANSA launched an extraordinary project at Christmas 2020! Sent Santa Claus
                to 150 children, children of small farmers, sugarcane planters
                from Serra de Redenção, CE.
              </p>
            </Link>
            <Link href="/en/projects/artistic-association" className="group block">
              <div className="relative h-80 mb-6">
                <Image
                  src="/uploads/2015/12/image2.png"
                  alt="Artistic Association"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">Artistic Educational Cultural Association</h3>
              <p className="text-gray-700 leading-relaxed">
                Redemption through music! The school serves 140 students aged 6 to 17
                with the goal of promoting musical culture and bringing the community together.
              </p>
            </Link>
          </div>
          <div className="text-center">
            <Link
              href="/en/projects"
              className="inline-block border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Get in Touch. Participate!</h2>
          <div className="space-y-4 mb-8 text-lg">
            <p className="font-semibold">Address: University Dr. Fairfax, 3586, Virginia - ZIP: 22030 - USA</p>
            <p className="font-semibold">(703) 785-5159</p>
          </div>
          <Link
            href="https://www.paypal.com/US/fundraiser/charity/2006255"
            target="_blank"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
          >
            DONATE
          </Link>
        </div>
      </section>
    </div>
  );
}
