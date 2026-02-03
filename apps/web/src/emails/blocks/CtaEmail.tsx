import { Section, Button } from '@react-email/components';
import type { NewsletterBlock } from '@/lib/newsletter/types';

type CtaBlock = Extract<NewsletterBlock, { type: 'cta' }>;

export default function CtaEmail({ block }: { block: CtaBlock }) {
  return (
    <Section style={{ padding: '16px 0' }}>
      <Button
        href={block.url}
        style={{
          backgroundColor: '#eab308',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '16px',
        }}
      >
        {block.label}
      </Button>
    </Section>
  );
}
