'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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

export default function Footer({ locale: localeProp }: { locale?: 'pt' | 'en' }) {
  const pathname = usePathname();
  const locale: 'pt' | 'en' =
    localeProp ?? (pathname?.startsWith('/en') ? 'en' : 'pt');
  const content = footerContent[locale];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('error');
        setMessage(data?.error ?? 'Something went wrong.');
        return;
      }
      if (data.status === 'already_subscribed') {
        setStatus('success');
        setMessage(locale === 'en' ? 'You are already subscribed.' : 'Você já está inscrito.');
        return;
      }
      setStatus('success');
      setMessage(
        locale === 'en'
          ? 'Check your email to confirm your subscription.'
          : 'Confira seu e-mail para confirmar a inscrição.'
      );
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(locale === 'en' ? 'Something went wrong.' : 'Algo deu errado.');
    }
  };

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
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.newsletter.placeholder}
                disabled={status === 'loading'}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500 disabled:opacity-70"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-70 text-white font-semibold px-6 py-2 rounded transition-colors"
              >
                {status === 'loading'
                  ? locale === 'en'
                    ? 'Subscribing...'
                    : 'Inscrevendo...'
                  : content.newsletter.button}
              </button>
              {message && (
                <p
                  className={`text-sm ${
                    status === 'error' ? 'text-red-400' : 'text-gray-300'
                  }`}
                >
                  {message}
                </p>
              )}
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
