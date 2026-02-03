'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const copy = {
  pt: {
    title: 'Cancelar inscrição',
    confirm: 'Tem certeza que deseja cancelar a inscrição na nossa newsletter?',
    button: 'Sim, cancelar inscrição',
    success: 'Inscrição cancelada. Você não receberá mais nossos e-mails.',
    error: 'Link inválido ou algo deu errado.',
    back: 'Voltar ao início',
  },
  en: {
    title: 'Unsubscribe',
    confirm: 'Are you sure you want to unsubscribe from our newsletter?',
    button: 'Yes, unsubscribe',
    success: 'You have been unsubscribed. You will not receive our emails anymore.',
    error: 'Invalid link or something went wrong.',
    back: 'Back to home',
  },
};

type Props = { locale: 'pt' | 'en' };

export default function NewsletterUnsubscribePage({ locale }: Props) {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const content = copy[locale];

  const handleUnsubscribe = async () => {
    if (!token) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (!token) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{content.title}</h1>
          <p className="text-red-600 mb-6">{content.error}</p>
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

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="bg-white border border-gray-200 rounded-lg shadow-soft p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{content.title}</h1>
        {status === 'idle' && (
          <>
            <p className="text-gray-700 mb-6">{content.confirm}</p>
            <button
              type="button"
              onClick={handleUnsubscribe}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded"
            >
              {content.button}
            </button>
          </>
        )}
        {status === 'loading' && <p className="text-gray-600">...</p>}
        {status === 'success' && (
          <p className="text-gray-700 mb-6">{content.success}</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 mb-6">{content.error}</p>
        )}
        {(status === 'success' || status === 'error') && (
          <Link
            href={`/${locale}`}
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded"
          >
            {content.back}
          </Link>
        )}
      </div>
    </div>
  );
}
