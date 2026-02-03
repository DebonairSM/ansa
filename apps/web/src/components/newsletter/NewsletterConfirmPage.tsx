'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const copy = {
  pt: {
    title: 'Confirmar inscrição',
    loading: 'Carregando...',
    success: 'Sua inscrição foi confirmada. Obrigado!',
    error: 'Link inválido ou expirado.',
    back: 'Voltar ao início',
  },
  en: {
    title: 'Confirm subscription',
    loading: 'Loading...',
    success: 'Your subscription has been confirmed. Thank you!',
    error: 'Invalid or expired link.',
    back: 'Back to home',
  },
};

type Props = { locale: 'pt' | 'en' };

export default function NewsletterConfirmPage({ locale }: Props) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const content = copy[locale];

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    fetch(`/api/newsletter/confirm?token=${encodeURIComponent(token)}`)
      .then((res) => (res.ok ? setStatus('success') : setStatus('error')))
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{content.title}</h1>
        {status === 'loading' && (
          <p className="text-gray-600">{content.loading}</p>
        )}
        {status === 'success' && (
          <p className="text-gray-700 mb-6">{content.success}</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mb-6">{content.error}</p>
        )}
        <Link
          href={`/${locale}`}
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
        >
          {content.back}
        </Link>
      </div>
    </div>
  );
}
