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
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-950">Button</h3>
          <p className="text-sm text-gray-600">Give readers one clear next step.</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="rounded border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
        >
          Remove section
        </button>
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Button words</label>
        <input
          type="text"
          value={block.label}
          onChange={(e) => onChange({ ...block, label: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Example: Read more"
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Where the button goes</label>
        <input
          type="url"
          value={block.url}
          onChange={(e) => onChange({ ...block, url: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
