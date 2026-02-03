'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type DividerBlock = Extract<NewsletterBlock, { type: 'divider' }>;

type Props = {
  block: DividerBlock;
  onRemove: () => void;
};

export default function DividerBlockEditor({ onRemove }: Props) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white flex items-center justify-between">
      <span className="text-sm font-medium text-gray-500">Divider</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
}
