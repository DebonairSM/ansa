'use client';

import { useState, useCallback } from 'react';
import type { NewsletterContent, NewsletterBlock } from '@/lib/newsletter/types';
import HeroBlockEditor from './blocks/HeroBlockEditor';
import TextBlockEditor from './blocks/TextBlockEditor';
import CtaBlockEditor from './blocks/CtaBlockEditor';
import ImageBlockEditor from './blocks/ImageBlockEditor';
import DividerBlockEditor from './blocks/DividerBlockEditor';
import SocialBlockEditor from './blocks/SocialBlockEditor';

type NewsletterBlockDraft = NewsletterBlock extends infer B
  ? B extends NewsletterBlock
    ? Omit<B, 'id'>
    : never
  : never;

function generateId() {
  return crypto.randomUUID?.() ?? `block-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const BLOCK_OPTIONS: {
  type: NewsletterBlock['type'];
  label: string;
  description: string;
}[] = [
  { type: 'hero', label: 'Big opening', description: 'Headline, short intro, optional photo' },
  { type: 'text', label: 'Message', description: 'A paragraph or short update' },
  { type: 'cta', label: 'Button', description: 'Send readers to a page or form' },
  { type: 'image', label: 'Photo', description: 'Add a single image with caption' },
  { type: 'divider', label: 'Separator', description: 'Create a visual pause' },
  { type: 'social', label: 'Social links', description: 'Facebook and Instagram links' },
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

function withFreshIds(blocks: NewsletterBlockDraft[]): NewsletterBlock[] {
  return blocks.map((block) => ({ ...block, id: generateId() } as NewsletterBlock));
}

const TEMPLATES: {
  name: string;
  description: string;
  content: NewsletterContent;
}[] = [
  {
    name: 'Monthly Update',
    description: 'Best for news, project highlights, and community notes.',
    content: {
      title: 'ANSA Brasil Monthly Update',
      preview: 'News, progress, and ways to stay connected with ANSA Brasil.',
      blocks: withFreshIds([
        {
          type: 'hero',
          headline: 'Here is what happened this month',
          subheadline: 'A short, warm opening that tells readers why this update matters.',
        },
        {
          type: 'text',
          content:
            'Dear friends,\n\nThank you for staying close to ANSA Brasil. This month we want to share a few important updates from our work and our community.',
        },
        { type: 'divider' },
        {
          type: 'text',
          content:
            'Highlight 1: Add one clear paragraph about a recent achievement, visit, partnership, or story.\n\nHighlight 2: Add another short paragraph with the next important update.',
        },
        {
          type: 'cta',
          label: 'Read more on our website',
          url: 'https://www.ansabrasil.org/pt',
        },
        { type: 'social' },
      ]),
    },
  },
  {
    name: 'Event Invitation',
    description: 'A polished invite with details and a clear registration button.',
    content: {
      title: 'You are invited: ANSA Brasil Event',
      preview: 'Join us for an upcoming ANSA Brasil event.',
      blocks: withFreshIds([
        {
          type: 'hero',
          headline: 'Join us for a special ANSA Brasil gathering',
          subheadline: 'Add the date, time, and location here so readers see it right away.',
        },
        {
          type: 'text',
          content:
            'We would be honored to have you with us. Use this space to explain what the event is, who should attend, and what guests can expect.',
        },
        {
          type: 'cta',
          label: 'Reserve my place',
          url: 'https://www.ansabrasil.org/pt',
        },
        {
          type: 'text',
          content:
            'Questions? Reply to this email and our team will be happy to help.',
        },
      ]),
    },
  },
  {
    name: 'Support Our Work',
    description: 'A donor-friendly message with story, impact, and next step.',
    content: {
      title: 'Help ANSA Brasil continue its work',
      preview: 'Your support helps ANSA Brasil serve more people.',
      blocks: withFreshIds([
        {
          type: 'hero',
          headline: 'Your support makes this work possible',
          subheadline: 'Share a simple sentence about the people or mission your readers can help.',
        },
        {
          type: 'text',
          content:
            'Every contribution helps ANSA Brasil keep building practical support, connection, and opportunity. Add a short story here that shows the impact of the work.',
        },
        {
          type: 'cta',
          label: 'Support ANSA Brasil',
          url: 'https://www.ansabrasil.org/pt',
        },
        { type: 'divider' },
        {
          type: 'text',
          content:
            'Thank you for believing in this mission and for walking with us.',
        },
      ]),
    },
  },
];

type Props = {
  content: NewsletterContent;
  onChange: (content: NewsletterContent) => void;
};

export default function BlockEditor({ content, onChange }: Props) {
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
    },
    [content, onChange]
  );

  const applyTemplate = useCallback(
    (template: NewsletterContent) => {
      const hasDraft =
        content.title.trim().length > 0 ||
        (content.preview ?? '').trim().length > 0 ||
        content.blocks.length > 0;
      if (hasDraft && !window.confirm('Replace this newsletter with the selected template?')) {
        return;
      }
      onChange({
        ...template,
        blocks: withFreshIds(template.blocks.map(({ id: _id, ...block }) => block)),
      });
    },
    [content, onChange]
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">Step 1</p>
          <h2 className="text-xl font-bold text-gray-950">Choose a ready-made starting point</h2>
          <p className="text-base text-gray-600">Pick a template, then replace the sample words with your own.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.name}
              type="button"
              onClick={() => applyTemplate(template.content)}
              className="min-h-36 rounded-lg border-2 border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-yellow-500 hover:bg-yellow-50 focus-ring"
            >
              <span className="block text-lg font-bold text-gray-950">{template.name}</span>
              <span className="mt-2 block text-sm leading-6 text-gray-600">{template.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">Step 2</p>
          <h2 className="text-xl font-bold text-gray-950">Name the email</h2>
        </div>
        <label className="block text-base font-bold text-gray-800">Subject line</label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-4 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="Example: ANSA Brasil Monthly Update"
        />
        <label className="block text-base font-bold text-gray-800">Short inbox preview</label>
        <input
          type="text"
          value={content.preview ?? ''}
          onChange={(e) => onChange({ ...content, preview: e.target.value || undefined })}
          className="w-full rounded-lg border-2 border-gray-300 px-4 py-4 text-lg focus:border-transparent focus:ring-4 focus:ring-yellow-400"
          placeholder="One sentence people see before opening the email"
        />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-700">Step 3</p>
          <h2 className="text-xl font-bold text-gray-950">Build the email</h2>
          <p className="text-base text-gray-600">Add the simple pieces you need. The preview updates automatically.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {BLOCK_OPTIONS.map(({ type, label, description }) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="rounded-lg border-2 border-gray-200 bg-white p-4 text-left transition hover:border-yellow-500 hover:bg-yellow-50 focus-ring"
            >
              <span className="block text-lg font-bold text-gray-950">{label}</span>
              <span className="mt-1 block text-sm leading-6 text-gray-600">{description}</span>
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {content.blocks.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white px-5 py-10 text-center">
              <p className="text-lg font-bold text-gray-900">No email sections yet</p>
              <p className="mt-2 text-gray-600">Choose a template above or add a Big opening to begin.</p>
            </div>
          ) : (
            content.blocks.map((block, index) => (
              <div key={block.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-gray-700 ring-1 ring-gray-200">
                    Section {index + 1}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'up')}
                      disabled={index === 0}
                      className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move up
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 'down')}
                      disabled={index === content.blocks.length - 1}
                      className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Move down
                    </button>
                  </div>
                </div>
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
            ))
          )}
        </div>
      </section>
    </div>
  );
}
