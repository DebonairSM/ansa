'use client';

import type { NewsletterBlock } from '@/lib/newsletter/types';

type TextBlock = Extract<NewsletterBlock, { type: 'text' }>;

type Props = {
  block: TextBlock;
  onChange: (block: TextBlock) => void;
  onRemove: () => void;
};

export default function TextBlockEditor({ block, onChange, onRemove }: Props) {
  return (
    <div className="border border-gray-200 rounded p-4 bg-white space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-500">Text</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
