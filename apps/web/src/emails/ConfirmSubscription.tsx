import { Html, Head, Body, Container, Heading, Text, Button, Preview } from '@react-email/components';

type ConfirmSubscriptionProps = {
  locale: 'pt' | 'en';
  confirmUrl: string;
};

const copy = {
  pt: {
    preview: 'Confirme sua inscrição na newsletter da ANSA.',
    heading: 'Confirme sua inscrição',
    body: 'Obrigado por se inscrever. Clique no botão abaixo para confirmar seu email.',
    button: 'Confirmar inscrição',
  },
  en: {
    preview: 'Confirm your subscription to the ANSA newsletter.',
    heading: 'Confirm your subscription',
    body: 'Thanks for signing up. Click the button below to confirm your email.',
    button: 'Confirm subscription',
  },
};

export default function ConfirmSubscription({ locale, confirmUrl }: ConfirmSubscriptionProps) {
  const content = copy[locale];
  return (
    <Html>
      <Head />
      <Preview>{content.preview}</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9fafb' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px' }}>
          <Heading style={{ marginBottom: '16px', color: '#111827' }}>{content.heading}</Heading>
          <Text style={{ color: '#374151', fontSize: '16px' }}>{content.body}</Text>
          <Button
            href={confirmUrl}
            style={{
              marginTop: '20px',
              backgroundColor: '#eab308',
              color: '#ffffff',
              padding: '12px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: 600,
            }}
          >
            {content.button}
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
