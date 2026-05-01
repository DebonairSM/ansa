import { listDonationClicks } from '@/lib/donations/db';
import DonationsView from '@/components/admin/DonationsView';
import DbUnreachable from '@/components/admin/DbUnreachable';

export const dynamic = 'force-dynamic';

type Range = '7d' | '30d' | '90d' | 'all';

const RANGE_DAYS: Record<Range, number | null> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  all: null,
};

function parseRange(value: string | string[] | undefined): Range {
  const v = Array.isArray(value) ? value[0] : value;
  if (v === '7d' || v === '30d' || v === '90d' || v === 'all') return v;
  return '30d';
}

export default async function AdminDonationsPage({
  searchParams,
}: {
  searchParams?: { range?: string | string[] };
}) {
  if (!process.env.SUPABASE_URL) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Donation Clicks</h1>
        <p className="text-gray-600">Set SUPABASE_URL and SUPABASE_SERVICE_KEY to view donation clicks.</p>
      </div>
    );
  }

  const range = parseRange(searchParams?.range);
  const days = RANGE_DAYS[range];
  const since = days === null ? null : new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const rows = await listDonationClicks(since);
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Donation Clicks</h1>
        <DonationsView rows={rows} range={range} />
      </div>
    );
  } catch (e) {
    console.error('Donation clicks list error:', e);
    return <DbUnreachable title="Donation Clicks" />;
  }
}
