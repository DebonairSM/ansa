'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BlockEditor from '@/components/newsletter/BlockEditor';
import type { NewsletterContent } from '@/lib/newsletter/types';

type Props = {
  campaignId: string | null;
  initialContent: NewsletterContent;
  status?: string;
  backHref?: string;
  backLabel?: string;
  savedRedirectBase?: string;
  heading?: string;
};

export default function CampaignEditor({
  campaignId,
  initialContent,
  status = 'draft',
  backHref = '/admin/newsletter/drafts',
  backLabel = 'Back to drafts',
  savedRedirectBase = '/admin/newsletter/drafts',
  heading,
}: Props) {
  const router = useRouter();
  const [content, setContent] = useState<NewsletterContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendSuccess, setSendSuccess] = useState<number | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const canSend = campaignId && status !== 'sent';
  const readyToSave = content.title.trim().length > 0;

  const loadPreview = useCallback(async () => {
    if (!content.title) return;
    try {
      const res = await fetch('/api/newsletter/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) return;
      const html = await res.text();
      setPreviewHtml(html);
    } catch {
      setPreviewHtml(null);
    }
  }, [content]);

  useEffect(() => {
    const t = setTimeout(loadPreview, 500);
    return () => clearTimeout(t);
  }, [loadPreview]);

  const handleSave = async () => {
    setSaveError('');
    setSaving(true);
    try {
      if (campaignId) {
        const res = await fetch(`/api/admin/newsletter/campaigns/${campaignId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: content.title, content }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setSaveError(data?.error ?? 'Failed to save');
          return;
        }
      } else {
        const res = await fetch('/api/admin/newsletter/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: content.title, content }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setSaveError(data?.error ?? 'Failed to save');
          return;
        }
        const data = await res.json();
        router.replace(`${savedRedirectBase}/${data.id}`);
        return;
      }
    } catch (e) {
      setSaveError('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSend = async () => {
    if (!campaignId) return;
    setSendError('');
    setSendSuccess(null);
    setSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSendError(data?.error ?? 'Failed to send');
        return;
      }
      setSendSuccess(typeof data.sent === 'number' ? data.sent : 0);
      router.replace(`/admin/newsletter/campaigns/${campaignId}`);
      router.refresh();
    } catch {
      setSendError('Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href={backHref}
          className="rounded border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100"
        >
          {backLabel}
        </Link>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">Newsletter</p>
          <h1 className="text-3xl font-bold text-gray-950">
            {heading ?? (campaignId ? 'Edit draft' : 'Create draft')}
          </h1>
        </div>
      </div>

      <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-5 py-4">
        <p className="text-base font-semibold text-yellow-950">
          Use a template, replace the sample text, save it, then send when the preview looks right.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-soft sm:p-6">
            <BlockEditor content={content} onChange={setContent} />
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="mb-3 text-lg font-bold text-gray-950">Finish</p>
              <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !readyToSave}
                className="min-h-14 rounded-lg bg-yellow-500 px-6 py-3 text-lg font-bold text-white hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              {canSend && (
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sending}
                  className="min-h-14 rounded-lg bg-gray-900 px-6 py-3 text-lg font-bold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? 'Sending...' : 'Send newsletter'}
                </button>
              )}
              {!readyToSave && (
                <p className="text-sm font-medium text-gray-600">Add a subject line before saving.</p>
              )}
              </div>
            {saveError && <p className="mt-3 text-sm font-semibold text-red-700">{saveError}</p>}
            {sendError && <p className="mt-3 text-sm font-semibold text-red-700">{sendError}</p>}
            {sendSuccess !== null && (
              <p className="mt-3 text-sm font-semibold text-green-700">
                Sent to {sendSuccess} subscriber{sendSuccess !== 1 ? 's' : ''}.
              </p>
            )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-soft xl:sticky xl:top-6 xl:self-start">
          <div className="border-b border-gray-200 bg-gray-100 px-5 py-4">
            <p className="text-lg font-bold text-gray-950">Email preview</p>
            <p className="text-sm text-gray-600">This is what readers will receive.</p>
          </div>
          <iframe
            ref={previewRef}
            title="Preview"
            srcDoc={previewHtml ?? '<div style="font-family: Arial, sans-serif; padding: 32px; color: #4b5563;"><h2 style="color: #111827; margin-top: 0;">Preview will appear here</h2><p>Choose a template or add a subject line to start.</p></div>'}
            className="h-[720px] w-full border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
