import { notFound } from 'next/navigation';
import { getCampaign } from '@/lib/newsletter/db';
import CampaignEditor from '@/components/admin/CampaignEditor';
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

export default async function EditCampaignPage({ params }: Props) {
  if (!process.env.SUPABASE_URL) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit campaign</h1>
        <p className="text-gray-600">Set SUPABASE_URL and SUPABASE_SERVICE_KEY to edit campaigns.</p>
      </div>
    );
  }
  try {
    const campaign = await getCampaign(params.id);
    const content = normalizeContent(
      campaign.content_json,
      campaign.title ?? ''
    );
    return (
      <CampaignEditor
        campaignId={campaign.id}
        initialContent={content}
        status={campaign.status}
      />
    );
  } catch {
    notFound();
  }
}
