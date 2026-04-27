'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type HeroBlock = Extract<NewsletterBlock, { type: 'hero' }>;

type Props = {
  block: HeroBlock;
  onChange: (block: HeroBlock) => void;
  onRemove: () => void;
};

export default function HeroBlockEditor({ block, onChange, onRemove }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-950">Big opening</h3>
          <p className="text-sm text-gray-600">The first thing people see in the email.</p>
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
        <label className="mb-2 block text-base font-bold text-gray-800">Main headline</label>
        <input
          type="text"
          value={block.headline}
          onChange={(e) => onChange({ ...block, headline: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Example: Here is what happened this month"
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Short introduction</label>
        <input
          type="text"
          value={block.subheadline ?? ''}
          onChange={(e) => onChange({ ...block, subheadline: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="One welcoming sentence"
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Photo link</label>
        <input
          type="text"
          value={block.image ?? ''}
          onChange={(e) => onChange({ ...block, image: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Optional: https://..."
        />
      </div>
    </div>
  );
}
