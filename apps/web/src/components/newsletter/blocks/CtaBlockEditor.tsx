'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type CtaBlock = Extract<NewsletterBlock, { type: 'cta' }>;

type Props = {
  block: CtaBlock;
  onChange: (block: CtaBlock) => void;
  onRemove: () => void;
};

export default function CtaBlockEditor({ block, onChange, onRemove }: Props) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Button (CTA)</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
        <input
          type="text"
          value={block.label}
          onChange={(e) => onChange({ ...block, label: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
        <input
          type="url"
          value={block.url}
          onChange={(e) => onChange({ ...block, url: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
