'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const footerContent = {
  pt: {
    copyright: '© 2025 ANSA Brasil. Todos os direitos reservados.',
    description: 'Associação Nossa Senhora Aparecida - Ajudando comunidades brasileiras desde 1982.',
    contact: {
      title: 'Contato',
      address: 'Rua: University Dr. Fairfax, 3586, Virgínia - CEP: 22030 - EUA',
      phone: '(703) 785-5159',
    },
    social: {
      title: 'Redes Sociais',
      facebook: 'https://www.facebook.com/ANSABRAS',
      instagram: 'https://www.instagram.com/ansabrasilorg',
    },
    newsletter: {
      title: 'Fique por Dentro',
      placeholder: 'Seu e-mail',
      button: 'Inscrever-se',
    },
  },
  en: {
    copyright: '© 2025 ANSA Brasil. All rights reserved.',
    description: 'Associação Nossa Senhora Aparecida - Helping Brazilian communities since 1982.',
    contact: {
      title: 'Contact',
      address: 'University Dr. Fairfax, 3586, Virginia - ZIP: 22030 - USA',
      phone: '(703) 785-5159',
    },
    social: {
      title: 'Social Media',
      facebook: 'https://www.facebook.com/ANSABRAS',
      instagram: 'https://www.instagram.com/ansabrasilorg',
    },
    newsletter: {
      title: 'Stay Updated',
      placeholder: 'Your email',
      button: 'Subscribe',
    },
  },
};

export default function Footer({ locale = 'pt' }: { locale?: 'pt' | 'en' }) {
  const content = footerContent[locale];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">{content.contact.title}</h3>
            <div className="space-y-3 text-gray-300">
              <p className="text-sm leading-relaxed">{content.contact.address}</p>
              <p className="text-lg font-semibold">{content.contact.phone}</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6">{content.social.title}</h3>
            <div className="flex space-x-4">
              <a
                href={content.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a
                href={content.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">{content.newsletter.title}</h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={content.newsletter.placeholder}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded transition-colors"
              >
                {content.newsletter.button}
              </button>
            </form>
          </div>
        </div>

        {/* Brand & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <Link href={`/${locale}`} className="inline-block mb-4">
            <Image
              src="/ansa-logo.png"
              alt="ANSA Brasil"
              width={240}
              height={65}
              className="h-16 w-auto mx-auto"
              style={{ height: 'auto' }}
            />
          </Link>
          <p className="text-gray-400 text-sm">{content.description}</p>
          <p className="text-gray-500 text-sm mt-4">{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
