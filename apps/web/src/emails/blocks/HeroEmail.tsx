import { Section, Text } from '@react-email/components';
import type { NewsletterBlock } from '@/lib/newsletter/types';

type HeroBlock = Extract<NewsletterBlock, { type: 'hero' }>;

export default function HeroEmail({ block }: { block: HeroBlock }) {
  return (
    <Section style={{ padding: '24px 0' }}>
      {block.image ? (
        <img
          src={block.image}
          alt={block.headline}
          style={{ maxWidth: '100%', height: 'auto', display: 'block', marginBottom: '16px' }}
        />
      ) : null}
      <Text
        style={{
          margin: '0 0 8px',
          fontSize: '24px',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1.3,
        }}
      >
        {block.headline}
      </Text>
      {block.subheadline ? (
        <Text style={{ margin: 0, fontSize: '16px', color: '#4b5563', lineHeight: 1.5 }}>
          {block.subheadline}
        </Text>
      ) : null}
    </Section>
  );
}
