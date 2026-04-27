import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { render } from '@react-email/render';
import { getCampaign } from '@/lib/newsletter/db';
import NewsletterTemplate from '@/emails/NewsletterTemplate';
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

function cleanTitle(title: string | undefined) {
  const value = (title ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return value || 'Untitled campaign';
}

function looksLikeHtml(value: unknown) {
  return typeof value === 'string' && /<\s*(?:!doctype|html|body|table|div|p|h1|span)\b/i.test(value);
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
    if (campaign.status === 'draft') {
      redirect(`/admin/newsletter/drafts/${campaign.id}`);
    }
    const content = normalizeContent(
      campaign.content_json,
      campaign.title ?? ''
    );
    const previewHtml = looksLikeHtml(campaign.content_json)
      ? String(campaign.content_json)
      : await render(
          React.createElement(NewsletterTemplate, {
            content,
            unsubscribeUrl: '#',
            trackingPixelUrl: '',
          })
        );

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin/newsletter/campaigns"
            className="rounded border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100"
          >
            Back to campaigns
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">Sent campaign</p>
            <h1 className="text-3xl font-bold text-gray-950">{cleanTitle(campaign.title ?? content.title)}</h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Status</p>
            <p className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-bold capitalize text-green-800">
              {campaign.status}
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Subject</p>
            <p className="mt-2 text-base font-bold text-gray-950">{cleanTitle(content.title || campaign.title)}</p>
            {content.preview ? (
              <>
                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-gray-500">Inbox preview</p>
                <p className="mt-2 text-sm leading-6 text-gray-700">{content.preview}</p>
              </>
            ) : null}
          </aside>

          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft">
            <div className="border-b border-gray-200 bg-gray-100 px-5 py-4">
              <p className="text-lg font-bold text-gray-950">Email preview</p>
              <p className="text-sm text-gray-600">This is the sent newsletter as readers see it.</p>
            </div>
            <iframe
              title="Sent campaign preview"
              srcDoc={previewHtml}
              className="h-[760px] w-full border-0"
              sandbox="allow-same-origin"
            />
          </section>
        </div>
      </div>
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message + (e.cause instanceof Error ? e.cause.message : '') : String(e);
    if (msg.includes('NEXT_REDIRECT')) {
      throw e;
    }
    if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT|getaddrinfo|fetch failed|supabase\.co/i.test(msg)) {
      return <DbUnreachable title="Edit campaign" />;
    }
    notFound();
  }
}
