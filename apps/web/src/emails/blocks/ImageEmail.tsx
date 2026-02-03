import { Section, Text } from '@react-email/components';
import type { NewsletterBlock } from '@/lib/newsletter/types';

type ImageBlock = Extract<NewsletterBlock, { type: 'image' }>;

export default function ImageEmail({ block }: { block: ImageBlock }) {
  return (
    <Section style={{ padding: '16px 0' }}>
      <img
        src={block.src}
        alt={block.alt ?? ''}
        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
      />
      {block.caption ? (
        <Text
          style={{
            margin: '8px 0 0',
            fontSize: '14px',
            color: '#6b7280',
            fontStyle: 'italic',
          }}
        >
          {block.caption}
        </Text>
      ) : null}
    </Section>
  );
}
