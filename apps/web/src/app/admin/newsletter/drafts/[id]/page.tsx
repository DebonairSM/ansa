import { notFound, redirect } from 'next/navigation';
import { getCampaign } from '@/lib/newsletter/db';
import CampaignEditor from '@/components/admin/CampaignEditor';
import DbUnreachable from '@/components/admin/DbUnreachable';
import type { NewsletterContent, NewsletterBlock } from '@/lib/newsletter/types';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

function normalizeContent(
  raw: unknown,
  fallbackTitle: string
): NewsletterContent {
  const obj =
    typeof raw === 'object' && raw !== null && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : {};
  const title =
    typeof obj.title === 'string' ? obj.title : fallbackTitle;
  const preview =
    typeof obj.preview === 'string' ? obj.preview : undefined;
  const blocksRaw = Array.isArray(obj.blocks) ? obj.blocks : [];
  const blocks: NewsletterBlock[] = blocksRaw.map((b, i) => {
    const block = typeof b === 'object' && b !== null ? (b as Record<string, unknown>) : {};
    const id =
      typeof block.id === 'string' ? block.id : `block-${i}-${Date.now()}`;
    return { ...block, id } as NewsletterBlock;
  });
  return { title, preview, blocks };
}

export default async function EditDraftPage({ params }: Props) {
  if (!process.env.SUPABASE_URL) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit draft</h1>
        <p className="text-gray-600">Set SUPABASE_URL and SUPABASE_SERVICE_KEY to edit drafts.</p>
      </div>
    );
  }

  try {
    const campaign = await getCampaign(params.id);
    if (campaign.status !== 'draft') {
      redirect(`/admin/newsletter/campaigns/${campaign.id}`);
    }
    const content = normalizeContent(
      campaign.content_json,
      campaign.title ?? ''
    );
    return (
      <CampaignEditor
        campaignId={campaign.id}
        initialContent={content}
        status={campaign.status}
        backHref="/admin/newsletter/drafts"
        backLabel="Back to drafts"
        savedRedirectBase="/admin/newsletter/drafts"
        heading="Edit draft"
      />
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message + (e.cause instanceof Error ? e.cause.message : '') : String(e);
    if (msg.includes('NEXT_REDIRECT')) {
      throw e;
    }
    if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT|getaddrinfo|fetch failed|supabase\.co/i.test(msg)) {
      return <DbUnreachable title="Edit draft" />;
    }
    notFound();
  }
}
