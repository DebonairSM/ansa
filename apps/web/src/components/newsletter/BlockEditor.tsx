'use client';

import { useState, useCallback } from 'react';
import type { NewsletterContent, NewsletterBlock } from '@/lib/newsletter/types';
import HeroBlockEditor from './blocks/HeroBlockEditor';
import TextBlockEditor from './blocks/TextBlockEditor';
import CtaBlockEditor from './blocks/CtaBlockEditor';
import ImageBlockEditor from './blocks/ImageBlockEditor';
import DividerBlockEditor from './blocks/DividerBlockEditor';
import SocialBlockEditor from './blocks/SocialBlockEditor';

function generateId() {
  return crypto.randomUUID?.() ?? `block-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const BLOCK_OPTIONS: { type: NewsletterBlock['type']; label: string }[] = [
  { type: 'hero', label: 'Hero' },
  { type: 'text', label: 'Text' },
  { type: 'cta', label: 'Button (CTA)' },
  { type: 'image', label: 'Image' },
  { type: 'divider', label: 'Divider' },
  { type: 'social', label: 'Social links' },
];

function createBlock(type: NewsletterBlock['type']): NewsletterBlock {
  const id = generateId();
  switch (type) {
    case 'hero':
      return { id, type: 'hero', headline: '' };
    case 'text':
      return { id, type: 'text', content: '' };
    case 'cta':
      return { id, type: 'cta', label: '', url: '' };
    case 'image':
      return { id, type: 'image', src: '', alt: '' };
    case 'divider':
      return { id, type: 'divider' };
    case 'social':
      return { id, type: 'social' };
    default:
      return { id, type: 'text', content: '' };
  }
}

type Props = {
  content: NewsletterContent;
  onChange: (content: NewsletterContent) => void;
};

export default function BlockEditor({ content, onChange }: Props) {
  const [addOpen, setAddOpen] = useState(false);

  const updateBlock = useCallback(
    (index: number, block: NewsletterBlock) => {
      const blocks = [...content.blocks];
      blocks[index] = block;
      onChange({ ...content, blocks });
    },
    [content, onChange]
  );

  const removeBlock = useCallback(
    (index: number) => {
      const blocks = content.blocks.filter((_, i) => i !== index);
      onChange({ ...content, blocks });
    },
    [content, onChange]
  );

  const moveBlock = useCallback(
    (index: number, dir: 'up' | 'down') => {
      const blocks = [...content.blocks];
      const target = dir === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= blocks.length) return;
      [blocks[index], blocks[target]] = [blocks[target], blocks[index]];
      onChange({ ...content, blocks });
    },
    [content, onChange]
  );

  const addBlock = useCallback(
    (type: NewsletterBlock['type']) => {
      onChange({ ...content, blocks: [...content.blocks, createBlock(type)] });
      setAddOpen(false);
    },
    [content, onChange]
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title (email subject)</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="e.g. Janeiro 2025"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Preview text (optional)</label>
        <input
          type="text"
          value={content.preview ?? ''}
          onChange={(e) => onChange({ ...content, preview: e.target.value || undefined })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="Short preview shown in inbox"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Blocks</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setAddOpen(!addOpen)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium px-3 py-1.5 rounded"
            >
              Add block
            </button>
            {addOpen && (
              <div className="absolute right-0 mt-1 py-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                {BLOCK_OPTIONS.map(({ type, label }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => addBlock(type)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {content.blocks.map((block, index) => (
            <div key={block.id} className="flex gap-2 items-start">
              <div className="flex flex-col gap-1 pt-2">
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === content.blocks.length - 1}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Move down"
                >
                  ↓
                </button>
              </div>
              <div className="flex-1 min-w-0">
                {block.type === 'hero' && (
                  <HeroBlockEditor
                    block={block}
                    onChange={(b) => updateBlock(index, b)}
                    onRemove={() => removeBlock(index)}
                  />
                )}
                {block.type === 'text' && (
                  <TextBlockEditor
                    block={block}
                    onChange={(b) => updateBlock(index, b)}
                    onRemove={() => removeBlock(index)}
                  />
                )}
                {block.type === 'cta' && (
                  <CtaBlockEditor
                    block={block}
                    onChange={(b) => updateBlock(index, b)}
                    onRemove={() => removeBlock(index)}
                  />
                )}
                {block.type === 'image' && (
                  <ImageBlockEditor
                    block={block}
                    onChange={(b) => updateBlock(index, b)}
                    onRemove={() => removeBlock(index)}
                  />
                )}
                {block.type === 'divider' && (
                  <DividerBlockEditor block={block} onRemove={() => removeBlock(index)} />
                )}
                {block.type === 'social' && (
                  <SocialBlockEditor
                    block={block}
                    onChange={(b) => updateBlock(index, b)}
                    onRemove={() => removeBlock(index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
