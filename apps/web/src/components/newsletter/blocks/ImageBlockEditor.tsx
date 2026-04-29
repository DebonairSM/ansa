'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type ImageBlock = Extract<NewsletterBlock, { type: 'image' }>;

type Props = {
  block: ImageBlock;
  onChange: (block: ImageBlock) => void;
  onRemove: () => void;
};

export default function ImageBlockEditor({ block, onChange, onRemove }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-950">Photo</h3>
          <p className="text-sm text-gray-600">Add one image and an optional caption.</p>
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
        <label className="mb-2 block text-base font-bold text-gray-800">Photo link</label>
        <input
          type="text"
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Photo description</label>
        <input
          type="text"
          value={block.alt ?? ''}
          onChange={(e) => onChange({ ...block, alt: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Optional, but helpful for accessibility"
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Caption</label>
        <input
          type="text"
          value={block.caption ?? ''}
          onChange={(e) => onChange({ ...block, caption: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Optional"
        />
      </div>
    </div>
  );
}
