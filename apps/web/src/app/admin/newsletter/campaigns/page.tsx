import Link from 'next/link';
import { listCampaigns } from '@/lib/newsletter/db';

export const dynamic = 'force-dynamic';

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

export default async function AdminCampaignsPage() {
  if (!process.env.SUPABASE_URL) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Campaigns</h1>
        <p className="text-gray-600">Set SUPABASE_URL and SUPABASE_SERVICE_KEY to view campaigns.</p>
      </div>
    );
  }
  const campaigns = await listCampaigns();
  const list = Array.isArray(campaigns) ? campaigns : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <Link
          href="/admin/newsletter/campaigns/new"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded"
        >
          New campaign
        </Link>
      </div>
      <div className="border border-gray-200 rounded-lg bg-white divide-y divide-gray-200 shadow-soft">
        {list.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-600">No campaigns yet. Create one to get started.</p>
            <p className="text-sm text-gray-500 mt-2">Use the newsletter form on the homepage to grow your list.</p>
          </div>
        ) : (
          list.map((c: { id: string; title: string; status: string; created_at?: string; sent_at?: string }) => (
            <Link
              key={c.id}
              href={`/admin/newsletter/campaigns/${c.id}`}
              className="block px-4 py-3 hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <span className="font-medium text-gray-900">{c.title}</span>
                <span className="ml-2 text-sm text-gray-500">({c.status})</span>
              </div>
              <span className="text-sm text-gray-500">
                {c.status === 'sent' ? `Sent ${formatDate(c.sent_at)}` : `Created ${formatDate(c.created_at)}`}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
