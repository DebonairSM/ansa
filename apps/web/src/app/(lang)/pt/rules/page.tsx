import Link from 'next/link';
import type { Metadata } from 'next';
import { FaCheckCircle, FaGlobe, FaCopyright, FaHeart, FaLock, FaExternalLinkAlt, FaExclamationTriangle, FaEdit, FaEnvelope } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Regras de Uso - ANSA Brasil',
  description: 'Termos e condições para uso do site ANSA Brasil. Conheça nossas políticas sobre doações, privacidade, propriedade intelectual e mais.',
};

export default function RulesPt() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section style={{ backgroundColor: '#eab308' }} className="text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Regras de Uso</h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
            Termos e condições para uso do site ANSA Brasil
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'acceptance', num: '1' },
              { id: 'use', num: '2' },
              { id: 'intellectual', num: '3' },
              { id: 'donations', num: '4' },
              { id: 'privacy', num: '5' },
              { id: 'links', num: '6' },
              { id: 'disclaimer', num: '7' },
              { id: 'modifications', num: '8' },
              { id: 'contact', num: '9' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-yellow-100 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-yellow-700 transition-colors"
              >
                {item.num}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Section 1 */}
          <section id="acceptance" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">1. Aceitação dos Termos</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                Ao acessar e usar este site, você aceita e concorda em cumprir os termos e condições 
                estabelecidos neste documento. Se você não concordar com qualquer parte destes termos, 
                não use o site.
              </p>
            </section>

            {/* Section 2 */}
            <section id="use" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaGlobe className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">2. Uso do Site</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                Este site é fornecido pela ANSA Brasil (Associação Nossa Senhora Aparecida) para fins 
                informativos sobre nossos projetos, missão e atividades de caridade. Você concorda em 
                usar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros.
              </p>
            </section>

            {/* Section 3 */}
            <section id="intellectual" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaCopyright className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">3. Propriedade Intelectual</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                Todo o conteúdo deste site, incluindo textos, gráficos, logotipos, imagens e software, 
                é propriedade da ANSA Brasil ou de seus fornecedores de conteúdo e está protegido por 
                leis de direitos autorais.
              </p>
            </section>

            {/* Section 4 */}
            <section id="donations" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaHeart className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">4. Doações</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                Todas as doações feitas através deste site são processadas por meio de plataformas 
                seguras de terceiros (como PayPal). As doações são voluntárias e serão usadas para 
                apoiar nossos projetos de assistência a comunidades carentes no Brasil.
              </p>
            </section>

            {/* Section 5 */}
            <section id="privacy" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaLock className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">5. Privacidade</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                Respeitamos sua privacidade. Informações pessoais fornecidas através de formulários 
                de contato serão usadas apenas para responder às suas perguntas e não serão compartilhadas 
                com terceiros sem o seu consentimento.
              </p>
            </section>

            {/* Section 6 */}
            <section id="links" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaExternalLinkAlt className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">6. Links Externos</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                Este site pode conter links para sites de terceiros. Não somos responsáveis pelo 
                conteúdo ou práticas de privacidade desses sites externos.
              </p>
            </section>

            {/* Section 7 */}
            <section id="disclaimer" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">7. Isenção de Responsabilidade</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                As informações fornecidas neste site são para fins gerais. Embora nos esforcemos 
                para manter as informações atualizadas e corretas, não fazemos representações ou 
                garantias de qualquer tipo sobre a completude ou precisão das informações.
              </p>
            </section>

            {/* Section 8 */}
            <section id="modifications" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaEdit className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">8. Modificações</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                A ANSA Brasil reserva-se o direito de modificar estes termos a qualquer momento. 
                As alterações entrarão em vigor imediatamente após a publicação no site.
              </p>
            </section>

            {/* Section 9 - Contact */}
            <section id="contact" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">9. Contato</h2>
              </div>
              <div className="pl-14">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Se você tiver dúvidas sobre estas regras de uso, entre em contato conosco:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Email:</span>{' '}
                    <a href="mailto:associacaonsraa@gmail.com" className="text-yellow-600 hover:text-yellow-700 hover:underline">
                      associacaonsraa@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Telefone:</span> (703) 785-5159
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Endereço:</span> 3586 University Dr., Fairfax, Virginia 22030, EUA
                  </p>
                </div>
              </div>
            </section>

          {/* Last Updated */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <p className="text-sm text-gray-500">
              Última atualização: <span className="font-medium text-gray-700">Dezembro de 2024</span>
            </p>
            <Link
              href="/pt/contact"
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium hover:underline"
            >
              Dúvidas? Entre em contato
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Quer apoiar nossa missão?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Sua doação ajuda crianças e comunidades carentes no Brasil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pt/contact"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Entre em Contato
            </Link>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Fazer uma Doação
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

