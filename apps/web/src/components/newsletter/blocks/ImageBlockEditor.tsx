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
    <div className="border border-gray-200 rounded p-4 bg-white space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Image</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          value={block.src}
          onChange={(e) => onChange({ ...block, src: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Alt text (optional)</label>
        <input
          type="text"
          value={block.alt ?? ''}
          onChange={(e) => onChange({ ...block, alt: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Caption (optional)</label>
        <input
          type="text"
          value={block.caption ?? ''}
          onChange={(e) => onChange({ ...block, caption: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
