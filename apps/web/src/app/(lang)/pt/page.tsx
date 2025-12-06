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
      {/* TODO: New hero section will be implemented here based on hero-mockup.html */}

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
                  <span>Mais de <strong>30 milhões de crianças</strong> ainda vivem em pobreza multidimensional</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Acesso a <strong>água, saneamento e educação</strong> ainda são desafios críticos</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Creches, escolas e programas comunitários precisam de <strong>recursos contínuos</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-600 font-bold mt-1">→</span>
                  <span>Cada doação mantém esse <strong>progresso em movimento</strong></span>
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
