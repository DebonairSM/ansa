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
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-950">Message</h3>
          <p className="text-sm text-gray-600">Write a paragraph, update, or short note.</p>
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
        <label className="mb-2 block text-base font-bold text-gray-800">Text</label>
        <textarea
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          rows={7}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg leading-8 focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Type the message here"
        />
      </div>
    </div>
  );
}
