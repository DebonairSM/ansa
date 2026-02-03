import { Section, Link, Text } from '@react-email/components';
import type { NewsletterBlock } from '@/lib/newsletter/types';

type SocialBlock = Extract<NewsletterBlock, { type: 'social' }>;

export default function SocialEmail({ block }: { block: SocialBlock }) {
  const links = [
    block.facebook && { href: block.facebook, label: 'Facebook' },
    block.instagram && { href: block.instagram, label: 'Instagram' },
  ].filter(Boolean) as { href: string; label: string }[];

  if (links.length === 0) return null;

  return (
    <Section style={{ padding: '16px 0' }}>
      <Text style={{ margin: '0 0 8px', fontSize: '14px', color: '#6b7280' }}>
        Siga-nos:
      </Text>
      {links.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          style={{
            marginRight: '12px',
            color: '#eab308',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {label}
        </Link>
      ))}
    </Section>
  );
}
