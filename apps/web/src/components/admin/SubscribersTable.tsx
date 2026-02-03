'use client';

import { useMemo, useState } from 'react';

type Sub = { id: string; email: string; status: string; locale: string; created_at?: string };

function formatDate(iso: string | undefined) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '—';
  }
}

function toCSV(subs: Sub[]): string {
  const header = 'email,status,locale,created_at';
  const rows = subs.map((s) =>
    [s.email, s.status, s.locale, s.created_at ?? ''].map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')
  );
  return [header, ...rows].join('\n');
}

export default function SubscribersTable({ subscribers }: { subscribers: Sub[] }) {
  const [sort, setSort] = useState<'email' | 'created_at'>('created_at');
  const sorted = useMemo(() => {
    const list = [...subscribers];
    list.sort((a, b) => {
      if (sort === 'email') return (a.email ?? '').localeCompare(b.email ?? '');
      return (b.created_at ?? '').localeCompare(a.created_at ?? '');
    });
    return list;
  }, [subscribers, sort]);

  const downloadCSV = () => {
    const blob = new Blob([toCSV(sorted)], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={downloadCSV}
          className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700"
                onClick={() => setSort('email')}
              >
                Email
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Locale
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:text-gray-700"
                onClick={() => setSort('created_at')}
              >
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sorted.map((s) => (
              <tr key={s.id} className="bg-white">
                <td className="px-4 py-2 text-sm text-gray-900">{s.email}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{s.status}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{s.locale}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{formatDate(s.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-gray-500">{subscribers.length} subscribers</p>
    </div>
  );
}
