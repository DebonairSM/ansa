'use client';

import { useState } from 'react';

type AdminLoginFormProps = {
  redirectTo?: string;
};

export default function AdminLoginForm({ redirectTo = '/admin/newsletter' }: AdminLoginFormProps) {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      });

      if (!response.ok) {
        throw new Error('Invalid secret');
      }

      window.location.assign(redirectTo);
    } catch {
      setError('Invalid admin secret.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <div>
        <label htmlFor="admin-secret" className="block text-sm font-semibold mb-2">
          Admin secret
        </label>
        <input
          id="admin-secret"
          type="password"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          className="w-full min-h-11 px-4 py-2 rounded border border-gray-400 focus:ring-2 focus:ring-amber-700 focus:border-transparent"
          placeholder="Enter secret"
          autoComplete="current-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'admin-login-error' : undefined}
          required
        />
      </div>
      {error && <p id="admin-login-error" role="alert" className="text-sm font-medium text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full min-h-11 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-200 text-white font-semibold px-4 py-2 rounded"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
