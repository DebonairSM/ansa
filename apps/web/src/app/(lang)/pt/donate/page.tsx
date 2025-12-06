import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doar - ANSA Brasil',
  description: 'Faça uma doação para a ANSA Brasil e ajude crianças e famílias carentes em todo o Brasil.',
};

export default function DonatePT() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">28,8 Milhões de Crianças Ainda Precisam de Você</h1>
          <p className="text-2xl mb-4">
            Mais da metade das crianças brasileiras (55,9%) vivem em pobreza multidimensional.<br />
            <strong>9,8 milhões estão em situação extrema.</strong>
          </p>
          <p className="text-xl opacity-90">
            Apesar do progresso, o trabalho está longe de terminar.
          </p>
        </div>
      </section>

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
            <a
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-bold px-12 py-5 rounded-lg transition-colors shadow-lg"
            >
              Doe Agora e Faça Parte da Mudança
            </a>
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
          <a
            href="https://www.paypal.com/US/fundraiser/charity/2006255"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-bold px-12 py-5 rounded-lg transition-colors"
          >
            DOAR AGORA
          </a>
        </div>
      </section>
    </div>
  );
}
