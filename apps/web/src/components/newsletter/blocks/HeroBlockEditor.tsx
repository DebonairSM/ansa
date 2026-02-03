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
    <div className="border border-gray-200 rounded p-4 bg-white space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Hero</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
        <input
          type="text"
          value={block.headline}
          onChange={(e) => onChange({ ...block, headline: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline (optional)</label>
        <input
          type="text"
          value={block.subheadline ?? ''}
          onChange={(e) => onChange({ ...block, subheadline: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
        <input
          type="text"
          value={block.image ?? ''}
          onChange={(e) => onChange({ ...block, image: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}
