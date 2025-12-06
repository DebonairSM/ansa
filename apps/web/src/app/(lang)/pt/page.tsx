import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaMapMarkerAlt } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'ANSA Brasil - Início',
  description: 'Associação Nossa Senhora Aparecida - Ajudando comunidades brasileiras carentes desde 1982 através de doações e trabalho voluntário.',
  openGraph: {
    title: 'ANSA Brasil',
    description: 'Ajudando comunidades brasileiras carentes desde 1982',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function PtHome() {
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
              Fazendo a diferença desde 1982
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
              A pobreza infantil no Brasil
              <span style={{ display: 'block', color: '#047857' }}>caiu.</span>
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
              Com você, pode cair ainda mais.
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
              Desde 2017, a pobreza infantil diminuiu—mas milhões de crianças ainda precisam de apoio diário. 
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
                <span>Redução de 16,7% alcançada</span>
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
                    crianças em pobreza
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
                    Hoje
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
                    crianças em pobreza
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
                Fonte: Relatório UNICEF 2023
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
            Doe Agora
          </Link>
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
              color: '#047857',
              whiteSpace: 'nowrap'
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
              color: '#1d4ed8',
              whiteSpace: 'nowrap'
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
              color: '#7c3aed',
              whiteSpace: 'nowrap'
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
              color: '#b45309',
              whiteSpace: 'nowrap'
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
      <div className="flex justify-center py-10 bg-white">
        <div 
          style={{ 
            width: '280px',
            height: '4px',
            background: '#eab308',
            borderRadius: '2px'
          }}
        />
      </div>

      {/* Progress & Impact Section */}
      <section className="py-16 px-4 bg-white border-b-4 border-yellow-500">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Progresso Mensurável. Impacto Real.</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">O que já avançamos</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Pobreza infantil multidimensional caiu de <strong>62,5% (2017)</strong> para <strong>55,9% (2023)</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Mais de <strong>6 pontos percentuais</strong> de redução confirmados pela UNICEF</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><strong>24 projetos</strong> apoiados pela ANSA em <strong>10+ estados</strong> brasileiros</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span><strong>43 anos</strong> de missão contínua, <strong>100% voluntária</strong></span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">O que ainda precisamos fazer</h3>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span><strong>28,8 milhões de crianças</strong> ainda vivem em pobreza multidimensional</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span><strong>9,8 milhões</strong> estão em situação extrema (múltiplas privações simultâneas)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Crianças são <strong>quase 2 vezes mais propensas</strong> à pobreza que a população geral</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Acesso a <strong>água, saneamento e educação</strong> ainda são desafios críticos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Cada doação mantém esse <strong>progresso em movimento</strong> e acelera a mudança</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xl text-gray-700 mb-6">
              <strong>Você não está apenas ajudando.</strong> Você está acelerando uma mudança que os dados já comprovam.
            </p>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
            >
              Faça Parte Dessa Mudança
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Quem Somos</h2>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              A Associação Nossa Senhora Aparecida (ANSA) é uma associação, criada em 1982,
              mantida por meio de doações e trabalho voluntário, com custo zero (tudo é doado).
            </p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              A ANSA auxilia crianças e mulheres brasileiras carentes, por meio de
              instituições que precisam de recursos como creches, orfanatos, escolas e grupos
              comunitários.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Todos os membros da ANSA, sem exceção, são voluntários, que generosamente
              colaboram nesta missão.
            </p>
          </div>

          {/* Supported Institutions Grid */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">24 Instituições Apoiadas em Todo o Brasil</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/pt/projects/associacao-paulo-vi" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Associação Paulo VI</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Guaratuba, Paraná</p>
                <p className="text-sm text-gray-600 mb-4">
                  Atende crianças e adolescentes em situação de vulnerabilidade com atividades artísticas, dança, teatro e esportes.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">SABER MAIS →</span>
              </Link>
              <Link href="/pt/projects/solar-menino-luz" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Solar Menino de Luz</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Rio de Janeiro, RJ</p>
                <p className="text-sm text-gray-600 mb-4">
                  Promove educação integral às famílias das comunidades do Pavão-Pavãozinho e Cantagalo.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">SABER MAIS →</span>
              </Link>
              <Link href="/pt/projects/comunidade-ilha-maruim" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Comunidade da Ilha do Maruim</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Olinda, Pernambuco</p>
                <p className="text-sm text-gray-600 mb-4">
                  Construção do salão paroquial comunitário para formação profissionalizante.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">SABER MAIS →</span>
              </Link>
              <Link href="/pt/projects/lar-santa-monica" className="group bg-gray-50 rounded-lg p-6 hover:bg-yellow-50 transition-colors">
                <h4 className="text-lg font-bold mb-2 group-hover:text-yellow-600">Lar Santa Mônica</h4>
                <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><FaMapMarkerAlt className="text-yellow-600" /> Fortaleza, Ceará</p>
                <p className="text-sm text-gray-600 mb-4">
                  Acolhe meninas vítimas de abuso e exploração sexual, oferecendo proteção e cuidados.
                </p>
                <span className="text-yellow-600 text-sm font-semibold">SABER MAIS →</span>
              </Link>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/pt/projects"
                className="inline-block text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                Ver todos os 24 projetos →
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
              <p className="text-lg text-white font-semibold">Projetos Apoiados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">10+</p>
              <p className="text-lg text-white font-semibold">Estados Alcançados</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">43+</p>
              <p className="text-lg text-white font-semibold">Anos de Missão</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-white drop-shadow-md">100%</p>
              <p className="text-lg text-white font-semibold">Voluntário</p>
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
              alt="Crianças brasileiras"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Mesmo estando longe trabalhamos para um Brasil melhor!
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Descubra mais sobre nossos projetos comunitários aqui!
            </p>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
            >
              DOAR
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Missão</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Nossa missão é melhorar a qualidade de vida de nossas crianças seja beneficiando
            entidades das quais fazem parte, seja aumentando a renda de sua família através
            dos programas comunitários.
          </p>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-20 px-4 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Como você pode participar?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Divulgando</h3>
              <p className="text-lg text-gray-700">
                Ajude-nos a divulgar a mensagem da ANSA e continue apoiando as crianças do
                Brasil. Contar para um amigo causa um grande impacto.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Mantendo Contato</h3>
              <p className="text-lg text-gray-700">
                Junte-se à nossa lista de e-mails e nós o informaremos sobre os projetos e as
                comunidades com as quais trabalhamos.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Doando</h3>
              <p className="text-lg text-gray-700 mb-6">
                As doações nos ajudam a promover nossa missão e continuam a impactar vidas. Seu
                apoio financeiro ajuda a manter a ANSA funcionando.
              </p>
              <Link
                href="https://www.paypal.com/US/fundraiser/charity/2006255"
                target="_blank"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
              >
                DOAR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-serif italic mb-6">
            "Tudo que fazemos é uma gota d'água no oceano, mas se não o fizermos essa gota se perderá para sempre."
          </blockquote>
          <p className="text-xl">-Madre Teresa de Calcuta.</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Projetos em Destaque</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <Link href="/pt/projects/projeto-papai-noel" className="group block">
              <div className="relative h-80 mb-6">
                <Image
                  src="/uploads/2015/12/image20.png"
                  alt="Projeto Papai Noel"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">Projeto Papai Noel</h3>
              <p className="text-gray-700 leading-relaxed">
                A ANSA lançou um projeto extraordinário no Natal de 2020! Enviou o Papai Noel
                para 150 crianças, filhos de pequenos agricultores, plantadores de cana de açúcar
                da Serra de Redenção, CE.
              </p>
            </Link>
            <Link href="/pt/projects/associacao-artistica" className="group block">
              <div className="relative h-80 mb-6">
                <Image
                  src="/uploads/2015/12/image2.png"
                  alt="Associação Artística"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">Associação Artística Educacional Cultural</h3>
              <p className="text-gray-700 leading-relaxed">
                Redenção pela música! A escola atende 140 alunos com idade entre 6 e 17 anos
                com o objetivo de promover a cultura musical e aproximar a comunidade.
              </p>
            </Link>
          </div>
          <div className="text-center">
            <Link
              href="/pt/projects"
              className="inline-block border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Ver Todos os Projetos
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Entrar em Contato. Participar!</h2>
          <div className="space-y-4 mb-8 text-lg">
            <p className="font-semibold">Rua: University Dr. Fairfax, 3586, Virgínia - CEP: 22030 - EUA</p>
            <p className="font-semibold">(703) 785-5159</p>
          </div>
          <Link
            href="https://www.paypal.com/US/fundraiser/charity/2006255"
            target="_blank"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold px-10 py-4 rounded-lg transition-colors"
          >
            DOAR
          </Link>
        </div>
      </section>
    </div>
  );
}
