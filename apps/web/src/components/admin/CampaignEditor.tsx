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

type SendPreflight = {
  campaignId: string;
  status: string;
  subject: string;
  from: string;
  recipientCount: number;
  emailConfigured: boolean;
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
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialContent));
  const [preflight, setPreflight] = useState<SendPreflight | null>(null);
  const [preflightError, setPreflightError] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [testSending, setTestSending] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const [testError, setTestError] = useState('');
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);

  const readyToSave = content.title.trim().length > 0;
  const hasUnsavedChanges = JSON.stringify(content) !== savedSnapshot;
  const canSend = Boolean(
    campaignId &&
      status !== 'sent' &&
      preflight?.status !== 'sent' &&
      preflight?.emailConfigured &&
      preflight.recipientCount > 0 &&
      !hasUnsavedChanges
  );

  const loadPreflight = useCallback(async () => {
    if (!campaignId || status === 'sent') return;
    setPreflightError('');
    try {
      const response = await fetch(
        `/api/newsletter/send?campaignId=${encodeURIComponent(campaignId)}`
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setPreflightError(data?.error ?? 'Could not load send details');
        return;
      }
      setPreflight(data as SendPreflight);
    } catch {
      setPreflightError('Could not load send details');
    }
  }, [campaignId, status]);

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

  useEffect(() => {
    void loadPreflight();
  }, [loadPreflight]);

  useEffect(() => {
    if (!showSendConfirmation) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !sending) {
        setShowSendConfirmation(false);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [showSendConfirmation, sending]);

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
        setSavedSnapshot(JSON.stringify(content));
        await loadPreflight();
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

  const handleTestSend = async () => {
    if (!campaignId) return;
    setTestError('');
    setTestMessage('');
    setTestSending(true);
    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          mode: 'test',
          testEmail,
          content,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setTestError(data?.error ?? 'Failed to send test');
        return;
      }
      setTestMessage(`Test sent to ${data.testSentTo}.`);
    } catch {
      setTestError('Failed to send test');
    } finally {
      setTestSending(false);
    }
  };

  const handleSend = async () => {
    if (!campaignId || !preflight) return;
    setSendError('');
    setSendSuccess(null);
    setSending(true);
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          mode: 'full',
          confirmRecipientCount: preflight.recipientCount,
          confirmSubject: preflight.subject,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSendError(data?.error ?? 'Failed to send');
        await loadPreflight();
        return;
      }
      setSendSuccess(typeof data.sent === 'number' ? data.sent : 0);
      setShowSendConfirmation(false);
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
                  {saving ? 'Saving...' : hasUnsavedChanges ? 'Save changes' : 'Saved'}
                </button>
                {!readyToSave && (
                  <p className="text-sm font-medium text-gray-600">Add a subject line before saving.</p>
                )}
                {readyToSave && hasUnsavedChanges && (
                  <p className="text-sm font-medium text-amber-800">Save the latest changes before a full send.</p>
                )}
              </div>
              {saveError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{saveError}</p>}

              {campaignId && status !== 'sent' && (
                <section className="mt-6 rounded-lg border border-gray-300 bg-white p-4" aria-labelledby="delivery-checks-title">
                  <h2 id="delivery-checks-title" className="text-lg font-bold text-gray-950">Delivery checks</h2>
                  <p className="mt-1 text-sm text-gray-600">Review the envelope, send yourself a test, then confirm the live audience.</p>

                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="rounded-md bg-gray-50 p-3">
                      <dt className="font-semibold text-gray-600">From</dt>
                      <dd className="mt-1 break-words font-bold text-gray-950">{preflight?.from ?? 'Loading...'}</dd>
                    </div>
                    <div className="rounded-md bg-gray-50 p-3">
                      <dt className="font-semibold text-gray-600">Subject</dt>
                      <dd className="mt-1 break-words font-bold text-gray-950">{content.title || 'Not set'}</dd>
                    </div>
                    <div className="rounded-md bg-gray-50 p-3">
                      <dt className="font-semibold text-gray-600">Active recipients</dt>
                      <dd className="mt-1 text-xl font-bold text-gray-950">{preflight?.recipientCount ?? '—'}</dd>
                    </div>
                    <div className="rounded-md bg-gray-50 p-3">
                      <dt className="font-semibold text-gray-600">Send status</dt>
                      <dd className="mt-1 font-bold capitalize text-gray-950">{sending ? 'Sending' : preflight?.status ?? status}</dd>
                    </div>
                  </dl>

                  {preflightError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{preflightError}</p>}
                  {preflight && !preflight.emailConfigured && (
                    <p role="alert" className="mt-3 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-800">
                      Email delivery is not configured. Add a provider before testing or sending.
                    </p>
                  )}

                  <div className="mt-5 border-t border-gray-200 pt-5">
                    <label htmlFor="newsletter-test-email" className="block text-sm font-bold text-gray-900">Test recipient</label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <input
                        id="newsletter-test-email"
                        type="email"
                        value={testEmail}
                        onChange={(event) => setTestEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="min-h-12 flex-1 rounded-lg border border-gray-400 px-4 py-2"
                      />
                      <button
                        type="button"
                        onClick={handleTestSend}
                        disabled={testSending || !testEmail.includes('@') || !preflight?.emailConfigured || !readyToSave}
                        className="min-h-12 rounded-lg border border-gray-900 bg-white px-5 py-2 font-bold text-gray-950 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {testSending ? 'Sending test...' : 'Send test'}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">The test uses the current editor content and never changes campaign status.</p>
                    {testError && <p role="alert" className="mt-2 text-sm font-semibold text-red-700">{testError}</p>}
                    {testMessage && <p role="status" className="mt-2 text-sm font-semibold text-green-700">{testMessage}</p>}
                  </div>

                  <div className="mt-5 border-t border-gray-200 pt-5">
                    <button
                      type="button"
                      onClick={() => setShowSendConfirmation(true)}
                      disabled={!canSend || sending}
                      className="min-h-14 rounded-lg bg-gray-900 px-6 py-3 text-lg font-bold text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Review full send
                    </button>
                    {!canSend && preflight?.emailConfigured && (
                      <p className="mt-2 text-sm text-gray-600">
                        {hasUnsavedChanges
                          ? 'Save your latest changes to unlock the full send.'
                          : preflight.recipientCount === 0
                            ? 'There are no active subscribers.'
                            : 'Send details are still loading.'}
                      </p>
                    )}
                  </div>
                </section>
              )}

              {sendError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{sendError}</p>}
              {sendSuccess !== null && (
                <p role="status" className="mt-3 text-sm font-semibold text-green-700">
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

      {showSendConfirmation && preflight && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-send-title"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
          >
            <h2 id="confirm-send-title" className="text-2xl font-bold text-gray-950">Confirm full newsletter send</h2>
            <p className="mt-2 text-gray-700">This action sends immediately and cannot be undone.</p>
            <dl className="mt-5 space-y-3 rounded-lg bg-gray-50 p-4 text-sm">
              <div>
                <dt className="font-semibold text-gray-600">Recipients</dt>
                <dd className="text-xl font-bold text-gray-950">{preflight.recipientCount} active subscriber{preflight.recipientCount !== 1 ? 's' : ''}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">From</dt>
                <dd className="break-words font-bold text-gray-950">{preflight.from}</dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-600">Subject</dt>
                <dd className="break-words font-bold text-gray-950">{preflight.subject}</dd>
              </div>
            </dl>
            {sendError && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{sendError}</p>}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setShowSendConfirmation(false)}
                disabled={sending}
                className="min-h-12 rounded-lg border border-gray-400 px-5 py-2 font-bold text-gray-800 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="min-h-12 rounded-lg bg-red-700 px-5 py-2 font-bold text-white hover:bg-red-800 disabled:opacity-50"
              >
                {sending ? 'Sending...' : `Send to ${preflight.recipientCount}`}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
