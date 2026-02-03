'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type SocialBlock = Extract<NewsletterBlock, { type: 'social' }>;

type Props = {
  block: SocialBlock;
  onChange: (block: SocialBlock) => void;
  onRemove: () => void;
};

export default function SocialBlockEditor({ block, onChange, onRemove }: Props) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Social links</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL (optional)</label>
        <input
          type="url"
          value={block.facebook ?? ''}
          onChange={(e) => onChange({ ...block, facebook: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="https://facebook.com/..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL (optional)</label>
        <input
          type="url"
          value={block.instagram ?? ''}
          onChange={(e) => onChange({ ...block, instagram: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="https://instagram.com/..."
        />
      </div>
    </div>
  );
}
