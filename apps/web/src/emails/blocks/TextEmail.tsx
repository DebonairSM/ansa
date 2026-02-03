import { Section, Text } from '@react-email/components';
import type { NewsletterBlock } from '@/lib/newsletter/types';

type TextBlock = Extract<NewsletterBlock, { type: 'text' }>;

export default function TextEmail({ block }: { block: TextBlock }) {
  return (
    <Section style={{ padding: '12px 0' }}>
      <Text
        style={{
          margin: 0,
          fontSize: '16px',
          color: '#374151',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
        }}
      >
        {block.content}
      </Text>
    </Section>
  );
}
