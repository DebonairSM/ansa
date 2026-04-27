import Link from 'next/link';
import { listDraftCampaigns } from '@/lib/newsletter/db';
import DbUnreachable from '@/components/admin/DbUnreachable';

export const dynamic = 'force-dynamic';

function formatDate(iso: string | undefined) {
  if (!iso) return 'Draft';
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Draft';
  }
}

function cleanTitle(title: string | undefined) {
  const value = (title ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return value || 'Untitled draft';
}

export default async function AdminDraftsPage() {
  if (!process.env.SUPABASE_URL) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Drafts</h1>
        <p className="text-gray-600">Set SUPABASE_URL and SUPABASE_SERVICE_KEY to view drafts.</p>
      </div>
    );
  }

  let list: { id: string; title: string; status: string; created_at?: string }[] = [];
  try {
    const drafts = await listDraftCampaigns();
    list = Array.isArray(drafts) ? drafts : [];
  } catch (e) {
    console.error('Drafts list error:', e);
    return <DbUnreachable title="Drafts" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">Newsletter</p>
          <h1 className="text-3xl font-bold text-gray-950">Drafts</h1>
          <p className="mt-1 text-base text-gray-600">Unfinished emails live here until you send them.</p>
        </div>
        <Link
          href="/admin/newsletter/drafts/new"
          className="min-h-14 rounded-lg bg-yellow-500 px-6 py-4 text-lg font-bold text-white shadow-sm hover:bg-yellow-600"
        >
          New draft
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft">
        {list.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-xl font-bold text-gray-900">No drafts yet</p>
            <p className="mt-2 text-base text-gray-600">Start with a template and save it here before sending.</p>
            <Link
              href="/admin/newsletter/drafts/new"
              className="mt-6 inline-flex min-h-14 items-center rounded-lg bg-yellow-500 px-6 py-4 text-lg font-bold text-white hover:bg-yellow-600"
            >
              New draft
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {list.map((draft) => (
              <Link
                key={draft.id}
                href={`/admin/newsletter/drafts/${draft.id}`}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-5 hover:bg-yellow-50"
              >
                <div>
                  <span className="block text-lg font-bold text-gray-950">{cleanTitle(draft.title)}</span>
                  <span className="mt-1 inline-flex rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-900">
                    Draft
                  </span>
                </div>
                <span className="text-base font-medium text-gray-600">
                  Saved {formatDate(draft.created_at)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
