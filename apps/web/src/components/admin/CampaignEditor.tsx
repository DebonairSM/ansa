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
};

export default function CampaignEditor({
  campaignId,
  initialContent,
  status = 'draft',
}: Props) {
  const router = useRouter();
  const [content, setContent] = useState<NewsletterContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const canSend = campaignId && status !== 'sent';

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
        router.replace(`/admin/newsletter/campaigns/${data.id}`);
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
    setSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setSendError(data?.error ?? 'Failed to send');
        return;
      }
      router.refresh();
    } catch {
      setSendError('Failed to send');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/newsletter/campaigns"
          className="text-gray-600 hover:text-gray-900 text-sm"
        >
          ← Campaigns
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {campaignId ? 'Edit campaign' : 'New campaign'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <BlockEditor content={content} onChange={setContent} />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-70 text-white font-semibold px-4 py-2 rounded"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            {canSend && (
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="bg-gray-800 hover:bg-gray-900 disabled:opacity-70 text-white font-semibold px-4 py-2 rounded"
              >
                {sending ? 'Sending...' : 'Send campaign'}
              </button>
            )}
          </div>
          {saveError && <p className="text-sm text-red-600">{saveError}</p>}
          {sendError && <p className="text-sm text-red-600">{sendError}</p>}
        </div>

        <div className="border border-gray-200 rounded bg-white overflow-hidden">
          <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-700">
            Email preview
          </div>
          <iframe
            ref={previewRef}
            title="Preview"
            srcDoc={previewHtml ?? '<p class="p-4 text-gray-500">Enter a title to see preview.</p>'}
            className="w-full h-[600px] border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}
