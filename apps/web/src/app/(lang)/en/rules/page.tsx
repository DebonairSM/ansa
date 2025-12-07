import Link from 'next/link';
import type { Metadata } from 'next';
import { FaCheckCircle, FaGlobe, FaCopyright, FaHeart, FaLock, FaExternalLinkAlt, FaExclamationTriangle, FaEdit, FaEnvelope } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Terms of Use - ANSA Brasil',
  description: 'Terms and conditions for using the ANSA Brasil website. Learn about our policies on donations, privacy, intellectual property, and more.',
};

export default function RulesEn() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section style={{ backgroundColor: '#eab308' }} className="text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">Legal</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
            Terms and conditions for using the ANSA Brasil website
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
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                By accessing and using this website, you accept and agree to comply with the terms 
                and conditions set forth in this document. If you do not agree with any part of these 
                terms, please do not use the website.
              </p>
            </section>

            {/* Section 2 */}
            <section id="use" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaGlobe className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">2. Use of the Website</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                This website is provided by ANSA Brasil (Associação Nossa Senhora Aparecida) for 
                informational purposes about our projects, mission, and charitable activities. You 
                agree to use the website only for lawful purposes and in a manner that does not 
                infringe the rights of third parties.
              </p>
            </section>

            {/* Section 3 */}
            <section id="intellectual" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaCopyright className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">3. Intellectual Property</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                All content on this website, including text, graphics, logos, images, and software, 
                is the property of ANSA Brasil or its content suppliers and is protected by 
                copyright laws.
              </p>
            </section>

            {/* Section 4 */}
            <section id="donations" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaHeart className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">4. Donations</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                All donations made through this website are processed through secure third-party 
                platforms (such as PayPal). Donations are voluntary and will be used to support 
                our projects assisting underprivileged communities in Brazil.
              </p>
            </section>

            {/* Section 5 */}
            <section id="privacy" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaLock className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">5. Privacy</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                We respect your privacy. Personal information provided through contact forms will 
                be used only to respond to your inquiries and will not be shared with third parties 
                without your consent.
              </p>
            </section>

            {/* Section 6 */}
            <section id="links" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaExternalLinkAlt className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">6. External Links</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                This website may contain links to third-party websites. We are not responsible for 
                the content or privacy practices of these external sites.
              </p>
            </section>

            {/* Section 7 */}
            <section id="disclaimer" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">7. Disclaimer</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                The information provided on this website is for general purposes. While we strive 
                to keep the information up to date and correct, we make no representations or 
                warranties of any kind about the completeness or accuracy of the information.
              </p>
            </section>

            {/* Section 8 */}
            <section id="modifications" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaEdit className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">8. Modifications</h2>
              </div>
              <p className="text-gray-700 leading-relaxed pl-14">
                ANSA Brasil reserves the right to modify these terms at any time. Changes will 
                take effect immediately upon posting on the website.
              </p>
            </section>

            {/* Section 9 - Contact */}
            <section id="contact" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8" style={{ scrollMarginTop: '160px' }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">9. Contact</h2>
              </div>
              <div className="pl-14">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about these terms of use, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Email:</span>{' '}
                    <a href="mailto:associacaonsraa@gmail.com" className="text-yellow-600 hover:text-yellow-700 hover:underline">
                      associacaonsraa@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Phone:</span> (703) 785-5159
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Address:</span> 3586 University Dr., Fairfax, Virginia 22030, USA
                  </p>
                </div>
              </div>
            </section>

          {/* Last Updated */}
          <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <p className="text-sm text-gray-500">
              Last updated: <span className="font-medium text-gray-700">December 2024</span>
            </p>
            <Link
              href="/en/contact"
              className="text-sm text-yellow-600 hover:text-yellow-700 font-medium hover:underline"
            >
              Questions? Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to support our mission?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Your donation helps underprivileged children and communities in Brazil.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/contact"
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="https://www.paypal.com/US/fundraiser/charity/2006255"
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}





