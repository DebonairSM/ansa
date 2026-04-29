'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type DividerBlock = Extract<NewsletterBlock, { type: 'divider' }>;

type Props = {
  block: DividerBlock;
  onRemove: () => void;
};

export default function DividerBlockEditor({ onRemove }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-bold text-gray-950">Separator</h3>
        <p className="text-sm text-gray-600">A clean line between parts of the email.</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="rounded border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Remove section
      </button>
    </div>
  );
}
