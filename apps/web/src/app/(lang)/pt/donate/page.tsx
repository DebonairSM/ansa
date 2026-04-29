import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import DonateLink from '@/components/DonateLink';

export const metadata: Metadata = {
  title: 'Doar - ANSA Brasil',
  description: 'Faça uma doação para a ANSA Brasil e ajude crianças e famílias carentes em todo o Brasil.',
};

export default function DonatePT() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Modern 2025 UI/UX */}
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
        {/* Image Section - Left */}
        <div className="hero-img-section relative" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img
            src="/uploads/2020/11/Ansa-Pic.jpg"
            alt="Crianças brasileiras sorrindo em um projeto social"
            className="w-full object-cover"
            style={{ 
              maxHeight: '100%', 
              position: 'relative', 
              zIndex: 1,
              maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
            }}
          />
          {/* Bottom gradient on mobile */}
          <div 
            className="absolute bottom-0 left-0 right-0 pointer-events-none lg:hidden"
            style={{ 
              background: 'linear-gradient(to bottom, transparent 0%, rgba(254, 243, 199, 0.6) 50%, #fef8e8 100%)',
              height: '40%',
              zIndex: 20
            }}
          />
          {/* Right gradient on desktop */}
          <div 
            className="absolute top-0 bottom-0 right-0 pointer-events-none hidden lg:block"
            style={{ 
              background: 'linear-gradient(to right, transparent 0%, rgba(254, 243, 199, 0.6) 50%, #fef8e8 100%)',
              width: '40%',
              zIndex: 20
            }}
          />
        </div>

        {/* Content Section - Right - 2025 UI/UX */}
        <div className="hero-txt-section">
          <div className="w-full max-w-[36rem]">
            {/* Eyebrow label */}
            <div 
              className="inline-flex items-center gap-2 mb-4"
              style={{
                padding: '0.375rem 0.875rem',
                background: 'rgba(220, 38, 38, 0.12)',
                borderRadius: '100px',
                fontSize: 'clamp(0.7rem, 0.85vw, 0.8rem)',
                fontWeight: 600,
                color: '#991b1b',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ 
                width: '6px', 
                height: '6px', 
                background: '#dc2626', 
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              Urgência: Ação necessária agora
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
              28,8 milhões de crianças
              <span style={{ display: 'block', color: '#dc2626' }}>ainda precisam de você.</span>
            </h1>

            {/* Sub-headline - gradient text effect */}
            <p 
              className="mb-5"
              style={{ 
                fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)', 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Mais da metade das crianças brasileiras vivem em pobreza multidimensional.
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
              Apesar do progresso de 2017 a 2023, <strong>9,8 milhões estão em situação extrema</strong> com múltiplas privações simultâneas. 
              Sua doação transforma dados em ação: educação, proteção e nutrição.
            </p>

            {/* Metrics Card - Glass morphism 2025 */}
            <div 
              className="rounded-2xl mb-6"
              style={{ 
                padding: 'clamp(1.25rem, 1.75vw, 1.75rem)',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(220, 38, 38, 0.25)',
                boxShadow: '0 4px 24px -4px rgba(220, 38, 38, 0.15), 0 0 0 1px rgba(255,255,255,0.5) inset'
              }}
            >
              {/* Urgency badge */}
              <div 
                className="mb-4"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.25rem 0.625rem',
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#991b1b'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ flexShrink: 0 }}>
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span>9,8 milhões em situação extrema</span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Total Metric */}
                <div>
                  <p 
                    className="uppercase mb-2"
                    style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.1em' }}
                  >
                    Total
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span 
                      style={{ 
                        fontSize: 'clamp(2.25rem, 3vw, 3rem)', 
                        fontWeight: 800, 
                        color: '#dc2626',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      28,8
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#64748b' }}>M</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                    crianças em pobreza
                  </p>
                </div>

                {/* Extreme Metric - highlighted */}
                <div 
                  className="rounded-xl"
                  style={{ 
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(185, 28, 28, 0.12) 100%)',
                    marginLeft: '-0.5rem',
                    marginRight: '-0.5rem'
                  }}
                >
                  <p 
                    className="uppercase mb-2"
                    style={{ fontSize: '0.7rem', fontWeight: 700, color: '#dc2626', letterSpacing: '0.1em' }}
                  >
                    Extrema
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span 
                      style={{ 
                        fontSize: 'clamp(2.25rem, 3vw, 3rem)', 
                        fontWeight: 800, 
                        color: '#dc2626',
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      9,8
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#ef4444' }}>M</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 500, marginTop: '0.25rem' }}>
                    em situação extrema
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
                Fonte: UNICEF 2023, IBGE 2024
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
          <DonateLink
            cta="donate-hero"
            className="group flex items-center justify-center gap-2 text-center transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '1rem 2.5rem',
              borderRadius: '100px',
              boxShadow: '0 8px 24px -4px rgba(220, 38, 38, 0.4), 0 2px 8px -2px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            Doe Agora
          </DonateLink>
          <Link
            href="/pt/projects"
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
            Nossos Projetos
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
            Seguro via PayPal
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
            43 anos
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
            100% voluntário
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
            24 projetos
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

      {/* The Reality Now - Lead with Scale */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">A Realidade Agora</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Os números mostram a urgência: milhões de crianças brasileiras ainda enfrentam múltiplas privações simultâneas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-red-600 mb-2">28,8</p>
              <p className="text-2xl font-semibold text-gray-800 mb-2">milhões</p>
              <p className="text-gray-700">de crianças e adolescentes (0-17 anos) em pobreza multidimensional</p>
              <p className="text-sm text-gray-500 mt-3 italic">Equivale à população do Peru ou Venezuela</p>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-orange-600 mb-2">9,8</p>
              <p className="text-2xl font-semibold text-gray-800 mb-2">milhões</p>
              <p className="text-gray-700">em pobreza multidimensional extrema</p>
              <p className="text-sm text-gray-500 mt-3 italic">Maior que a população de Portugal</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-yellow-600 mb-2">1 em 2</p>
              <p className="text-2xl font-semibold text-gray-800 mb-2">crianças</p>
              <p className="text-gray-700">ainda vive em situação de pobreza multidimensional</p>
              <p className="text-sm text-gray-500 mt-3 italic">55,9% de todas as crianças brasileiras</p>
            </div>
          </div>

          {/* Disproportionate Vulnerability */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4 text-blue-900">Crianças Carregam o Peso da Pobreza Desproporcionalmente</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-lg text-gray-700 mb-3">
                  <strong className="text-blue-700">40,9%</strong> das crianças brasileiras (0-14 anos) vivem abaixo da linha de pobreza de renda, 
                  comparado a apenas <strong className="text-blue-700">23%</strong> da população total.
                </p>
                <p className="text-gray-600">
                  Crianças são quase <strong>2 vezes mais propensas</strong> a viverem na pobreza do que a população geral.
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-3">
                  <strong className="text-blue-700">59%</strong> das crianças e jovens brasileiros pertencem aos 40% mais pobres da população.
                </p>
                <p className="text-gray-600">
                  Isso representa aproximadamente <strong>29,5 milhões</strong> de crianças concentradas na base da pirâmide de renda.
                </p>
              </div>
            </div>
          </div>

          {/* Extreme Poverty Details */}
          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4 text-red-900">Pobreza Multidimensional Extrema: O Que Isso Significa</h3>
            <p className="text-lg text-gray-700 mb-4">
              As <strong>9,8 milhões de crianças em pobreza extrema</strong> enfrentam privações simultâneas em múltiplas dimensões básicas:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Falta de acesso a <strong>água potável E saneamento básico</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Privação de <strong>educação E informação</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Moradia inadequada <strong>E falta de proteção</strong> contra trabalho infantil</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Renda familiar insuficiente <strong>E múltiplas privações</strong> simultâneas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span>Essas crianças representam os casos <strong>mais vulneráveis</strong>, exigindo intervenção imediata</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Progress Reframed as Work Remaining */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-4 text-green-900">Progresso Feito, Trabalho Restante</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-green-800">O Que Conseguimos (2017-2023)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span><strong>5,5 milhões de crianças</strong> saíram da pobreza multidimensional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span>Redução de <strong>62,5% para 55,9%</strong> (queda de 6,6 pontos percentuais)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span>Pobreza extrema caiu de <strong>23,8% para 18,8%</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span>Políticas como <strong>Bolsa Família</strong> e melhor acesso à informação contribuíram</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3 text-orange-800">O Que Ainda Precisamos Fazer</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">→</span>
                    <span><strong>28,8 milhões de crianças</strong> ainda aguardam ajuda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">→</span>
                    <span>Isso representa <strong>5 vezes</strong> o número de crianças que já foram ajudadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">→</span>
                    <span>Mais da <strong>metade</strong> de todas as crianças brasileiras ainda precisa de apoio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">→</span>
                    <span>O progresso deve <strong>continuar acelerando</strong> para alcançar todas as crianças</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-yellow-50 rounded-2xl p-12 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Por que sua doação importa agora</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Organizações como a ANSA mantêm esse progresso em movimento, apoiando creches, escolas, orfanatos e 
              programas comunitários em 10+ estados. Mas precisamos de mais recursos para alcançar as <strong>28,8 milhões de crianças</strong> que ainda aguardam.
            </p>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Quando você doa para a ANSA, <strong>100% do valor vai direto para os projetos</strong> – 
              sem custos administrativos, porque somos totalmente voluntários. Você não está apenas 
              "ajudando". <strong>Você está acelerando uma mudança que os dados já comprovam.</strong>
            </p>
            <div className="bg-white rounded-lg p-6 border-2 border-yellow-200">
              <p className="text-lg text-gray-700 text-center">
                <strong className="text-yellow-700">Fontes:</strong> Dados UNICEF Brasil (2017–2023), 
                Comunicado de imprensa do UNICEF (16/01/2025), Síntese de Indicadores Sociais 2024 – IBGE, 
                Banco Mundial/SEDLAC, Estudo IPEA/UNICEF (nov. 2025)
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">O que suas doações viabilizam</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-3 text-yellow-600">Educação e Proteção</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Materiais escolares, uniformes e bolsas para crianças carentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Apoio a creches e escolas em comunidades vulneráveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Acolhimento de meninas vítimas de abuso (Lar Santa Mônica, Fortaleza)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-3 text-yellow-600">Saúde e Nutrição</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Bancos de leite materno para recém-nascidos prematuros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Equipamentos médicos e programas de saúde comunitária</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Acesso a água potável e saneamento básico</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-3 text-yellow-600">Desenvolvimento Comunitário</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Capacitação profissional e geração de renda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Construção e reforma de infraestrutura comunitária</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Programas de arte, música e esportes para crianças</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border-2 border-yellow-200 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-3 text-yellow-600">Apoio de Emergência</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Distribuição de alimentos e roupas em situações de crise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Projetos especiais (ex: Papai Noel para 150 crianças na Serra de Redenção, CE)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Resposta rápida a necessidades urgentes das comunidades</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <DonateLink
              cta="donate-mid"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-bold px-12 py-5 rounded-lg transition-colors shadow-lg"
            >
              Doe Agora e Faça Parte da Mudança
            </DonateLink>
            <p className="text-sm text-gray-500 mt-4">
              Você será redirecionado para o PayPal Giving Fund (seguro e verificado)
            </p>
          </div>
        </div>
      </section>

      {/* Tax Deductible Info */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <div className="border border-green-200 rounded-xl p-8">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-4 text-center">100% Dedutível de Impostos</h3>
            <p className="text-green-700 text-center">
              A ANSA Brasil é uma organização sem fins lucrativos 501(c)(3) registrada nos Estados Unidos. 
              Todas as doações são dedutíveis de impostos na medida permitida por lei.
            </p>
          </div>
        </div>
      </section>

      {/* How Donations Help */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Como Sua Doação Ajuda</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Educação</h3>
              <p className="text-gray-600">
                Materiais escolares, uniformes, e apoio a escolas e creches em comunidades carentes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Saúde</h3>
              <p className="text-gray-600">
                Bancos de leite, equipamentos médicos e programas de saúde para crianças e mães.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Comunidade</h3>
              <p className="text-gray-600">
                Capacitação profissional, geração de renda e fortalecimento de comunidades locais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-yellow-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold mb-2">24</p>
              <p className="text-lg">Projetos Apoiados</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">10+</p>
              <p className="text-lg">Estados Alcançados</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">43+</p>
              <p className="text-lg">Anos de Missão</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">0%</p>
              <p className="text-lg">Custos Administrativos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Outras Formas de Ajudar</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">📣 Divulgue</h3>
              <p className="text-gray-700 mb-4">
                Compartilhe nossa missão com amigos e familiares. Cada pessoa que conhece a ANSA 
                é uma oportunidade de ajudar mais crianças.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/ANSABRAS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/ansabrasilorg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700"
                >
                  Instagram
                </a>
              </div>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">📧 Fique Informado</h3>
              <p className="text-gray-700 mb-4">
                Inscreva-se para receber atualizações sobre nossos projetos e o impacto 
                das doações nas comunidades que apoiamos.
              </p>
              <Link
                href="/pt/contact"
                className="text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                Entre em contato →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Transparência Total</h2>
          <p className="text-xl text-gray-700 mb-8">
            A ANSA Brasil é mantida inteiramente por voluntários. Isso significa que 
            <strong> 100% das doações</strong> vão diretamente para os projetos e comunidades 
            que apoiamos. Não temos custos administrativos porque tudo é doado - 
            inclusive o tempo de nossa equipe.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600 mb-2">100%</p>
              <p className="text-gray-600">das doações vão<br />para projetos</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600 mb-2">9</p>
              <p className="text-gray-600">voluntários<br />dedicados</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-600 mb-2">1982</p>
              <p className="text-gray-600">desde o<br />início</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif italic mb-6">
            "Tudo que fazemos é uma gota d'água no oceano, mas se não o fizermos essa gota se perderá para sempre."
          </blockquote>
          <p className="text-xl mb-8">-Madre Teresa de Calcuta</p>
          <DonateLink
            cta="donate-final"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-bold px-12 py-5 rounded-lg transition-colors"
          >
            DOAR AGORA
          </DonateLink>
        </div>
      </section>
    </div>
  );
}
