import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FaMapMarkerAlt } from 'react-icons/fa';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import HeroCollage from '@/components/HeroCollage';
import ScrollToNewsletter from '@/components/ScrollToNewsletter';

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
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fef3c7 0%, #fefce8 15%, #fffdf7 30%, #ffffff 50%)' }}>
      <ScrollToNewsletter />
      {/* Hero Section - Quem Somos */}
      <section className="bg-gray-900">
        <div className="py-16 px-4 text-gray-900 bg-[linear-gradient(145deg,_#fef3c7_0%,_#fde68a_50%,_#fcd34d_100%)]">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Quem Somos</h1>
            <p className="text-lg md:text-2xl max-w-3xl mx-auto opacity-95">
              A Associação Nossa Senhora Aparecida reúne voluntários na região de Washington, DC, dedicados ao apoio a crianças, mulheres e comunidades carentes no Brasil, por meio de instituições parceiras em todo o país.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://www.paypal.com/US/fundraiser/charity/2006255"
                target="_blank"
                className="inline-block bg-white text-amber-800 hover:bg-amber-50 font-bold px-8 py-4 rounded-lg transition-colors"
              >
                Fazer uma Doação
              </Link>
              <Link
                href="/pt/about"
                className="inline-block border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Conheça nossa equipe
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-8 px-4">
          <HeroCollage ariaLabel="Colagem de projetos comunitários da ANSA no Brasil" />
        </div>
      </section>

      {/* CTA Section - Centered below hero */}
      <div 
        style={{ 
          background: 'transparent',
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
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span style={{ whiteSpace: 'nowrap' }}>Seguro via PayPal</span>
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
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span style={{ whiteSpace: 'nowrap' }}>43 anos</span>
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
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span style={{ whiteSpace: 'nowrap' }}>100% voluntário</span>
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
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ flexShrink: 0 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span style={{ whiteSpace: 'nowrap' }}>24 projetos</span>
          </span>
        </div>
      </div>

      {/* Divider Line */}
      <div className="flex justify-center py-10 bg-white">
        <div 
          style={{ 
            width: '280px',
            height: '4px',
            background: '#fcd34d',
            borderRadius: '2px'
          }}
        />
      </div>

      {/* Progress & Impact Section */}
      <section className="py-16 px-4 bg-white border-b-4 border-yellow-500">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Progresso que podemos medir. Trabalho que ainda precisa ser feito.
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 text-lg">
            A ANSA atua junto a comunidades, parceiros e esforços nacionais mais amplos—apoiando projetos onde
            as crianças mais precisam.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">Evidências e o papel da ANSA</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Em todo o Brasil</h4>
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    No país, a pobreza infantil multidimensional caiu de <strong>62,5% (2017)</strong> para{' '}
                    <strong>55,9% (2023)</strong>—um movimento construído por muitas políticas, programas e
                    atores ao longo do tempo.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    Dados da UNICEF confirmam uma queda de mais de <strong>6 pontos percentuais</strong> nesse
                    período.
                  </span>
                </li>
              </ul>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Na prática, com a ANSA</h4>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    A ANSA apoiou <strong>24 projetos</strong> em <strong>mais de 10 estados</strong> brasileiros.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>
                    <strong>43 anos</strong> de missão contínua, <strong>100% voluntária</strong>.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-600">O que ainda falta fazer</h3>
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
                  <span>
                    Cada doação ajuda a <strong>manter esse progresso mais amplo</strong> e acelera a mudança onde
                    ela mais importa.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-xl text-gray-700 mb-6">
              <strong>Você faz parte de um esforço maior</strong>—e ajuda a manter em movimento um progresso
              que os dados já comprovam.
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
          <h2 className="text-4xl font-bold text-center mb-12">Nossa Missão</h2>
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
            <div className="mt-6">
              <Link
                href="/pt/about"
                className="inline-block text-yellow-600 hover:text-yellow-700 font-semibold"
              >
                Conheça nossa equipe →
              </Link>
            </div>
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
      <section className="py-16 px-4 bg-[linear-gradient(180deg,_#fef3c7_0%,_#fde68a_100%)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-gray-900">24</p>
              <p className="text-lg text-gray-800 font-semibold">Projetos Apoiados</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-gray-900">10+</p>
              <p className="text-lg text-gray-800 font-semibold">Estados Alcançados</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-gray-900">43+</p>
              <p className="text-lg text-gray-800 font-semibold">Anos de Missão</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <p className="text-5xl font-bold mb-2 text-gray-900">100%</p>
              <p className="text-lg text-gray-800 font-semibold">Voluntário</p>
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
                comunidades com as quais trabalhamos (inscreva-se na seção abaixo).
              </p>
              <a
                href="#newsletter"
                className="inline-block mt-4 text-yellow-600 font-semibold hover:text-yellow-700"
              >
                Ir para a inscrição
              </a>
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

      {/* Newsletter signup */}
      <section id="newsletter" className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Fique por Dentro</h2>
          <p className="text-gray-600 mb-8">
            Junte-se à nossa lista de e-mails para receber notícias sobre os projetos e as comunidades com as quais trabalhamos.
          </p>
          <NewsletterSignup locale="pt" variant="inline" />
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
