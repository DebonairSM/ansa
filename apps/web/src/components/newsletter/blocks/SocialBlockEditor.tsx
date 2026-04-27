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
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-950">Social links</h3>
          <p className="text-sm text-gray-600">Add links where readers can follow ANSA Brasil.</p>
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
        <label className="mb-2 block text-base font-bold text-gray-800">Facebook link</label>
        <input
          type="url"
          value={block.facebook ?? ''}
          onChange={(e) => onChange({ ...block, facebook: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="https://facebook.com/..."
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-bold text-gray-800">Instagram link</label>
        <input
          type="url"
          value={block.instagram ?? ''}
          onChange={(e) => onChange({ ...block, instagram: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="https://instagram.com/..."
        />
      </div>
    </div>
  );
}
