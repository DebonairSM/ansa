import { Html, Head, Body, Container, Section, Text, Link, Preview } from '@react-email/components';
import type { NewsletterContent, NewsletterBlock } from '@/lib/newsletter/types';
import HeroEmail from './blocks/HeroEmail';
import TextEmail from './blocks/TextEmail';
import CtaEmail from './blocks/CtaEmail';
import ImageEmail from './blocks/ImageEmail';
import DividerEmail from './blocks/DividerEmail';
import SocialEmail from './blocks/SocialEmail';

const FOOTER_ADDRESS = 'University Dr. Fairfax, 3586, Virginia - ZIP: 22030 - USA';
const FOOTER_PHONE = '(703) 785-5159';

type NewsletterTemplateProps = {
  content: NewsletterContent;
  unsubscribeUrl: string;
  trackingPixelUrl?: string;
};

function BlockRenderer({ block }: { block: NewsletterBlock }) {
  switch (block.type) {
    case 'hero':
      return <HeroEmail block={block} />;
    case 'text':
      return <TextEmail block={block} />;
    case 'cta':
      return <CtaEmail block={block} />;
    case 'image':
      return <ImageEmail block={block} />;
    case 'divider':
      return <DividerEmail />;
    case 'social':
      return <SocialEmail block={block} />;
    default:
      return null;
  }
}

export default function NewsletterTemplate({
  content,
  unsubscribeUrl,
  trackingPixelUrl = '',
}: NewsletterTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>{content.preview ?? content.title}</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '32px' }}>
          <Section style={{ marginBottom: '24px', textAlign: 'center' }}>
            <Text style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#111827' }}>
              ANSA Brasil
            </Text>
          </Section>

          <Section style={{ marginBottom: '24px' }}>
            <Text
              style={{
                margin: '0 0 24px',
                fontSize: '22px',
                fontWeight: 700,
                color: '#111827',
                lineHeight: 1.3,
              }}
            >
              {content.title}
            </Text>
            {content.blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </Section>

          <Section
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e7eb',
              fontSize: '12px',
              color: '#6b7280',
            }}
          >
            <Text style={{ margin: '0 0 8px' }}>{FOOTER_ADDRESS}</Text>
            <Text style={{ margin: '0 0 16px' }}>{FOOTER_PHONE}</Text>
            <Link
              href={unsubscribeUrl}
              style={{ color: '#6b7280', textDecoration: 'underline' }}
            >
              Unsubscribe
            </Link>
          </Section>

          {trackingPixelUrl ? (
            <img
              src={trackingPixelUrl}
              alt=""
              width={1}
              height={1}
              style={{ display: 'block', width: 1, height: 1, border: 0 }}
            />
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}
