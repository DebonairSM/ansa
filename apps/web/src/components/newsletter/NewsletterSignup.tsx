'use client';

import { useState } from 'react';

const copy = {
  pt: {
    placeholder: 'Seu e-mail',
    button: 'Inscrever-se',
    loading: 'Inscrevendo...',
    success: 'Confira seu e-mail para confirmar a inscrição.',
    already: 'Você já está inscrito.',
    error: 'Algo deu errado.',
  },
  en: {
    placeholder: 'Your email',
    button: 'Subscribe',
    loading: 'Subscribing...',
    success: 'Check your email to confirm your subscription.',
    already: 'You are already subscribed.',
    error: 'Something went wrong.',
  },
};

type Props = {
  locale: 'pt' | 'en';
  variant?: 'footer' | 'inline';
};

export default function NewsletterSignup({ locale, variant = 'footer' }: Props) {
  const content = copy[locale];
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
        setMessage(data?.error ?? content.error);
        return;
      }
      if (data.status === 'already_subscribed') {
        setStatus('success');
        setMessage(content.already);
        return;
      }
      setStatus('success');
      setMessage(content.success);
      setEmail('');
    } catch {
      setStatus('error');
      setMessage(content.error);
    }
  };

  const isFooter = variant === 'footer';

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={content.placeholder}
        disabled={status === 'loading'}
        required
        className={
          isFooter
            ? 'w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-500 disabled:opacity-70'
            : 'w-full max-w-xs mx-auto block px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-70 text-gray-900'
        }
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={
          isFooter
            ? 'w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-70 text-white font-semibold px-6 py-2 rounded transition-colors'
            : 'inline-block bg-yellow-500 hover:bg-yellow-600 disabled:opacity-70 text-white font-semibold px-6 py-2 rounded transition-colors'
        }
      >
        {status === 'loading' ? content.loading : content.button}
      </button>
      {message && (
        <p
          className={`text-sm ${
            status === 'error' ? 'text-red-600' : isFooter ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
