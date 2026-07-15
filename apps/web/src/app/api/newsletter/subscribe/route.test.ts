import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  sendEmail: vi.fn(),
  getFromNewsletter: vi.fn(() => 'ANSA Newsletter <onboarding@resend.dev>'),
  isEmailConfigured: vi.fn(() => true),
  findSubscriberByEmail: vi.fn(),
  upsertSubscriber: vi.fn(),
  generateToken: vi.fn(() => 'token-123'),
  getBaseUrl: vi.fn(() => 'http://localhost:4545'),
  render: vi.fn(async () => '<html>confirm</html>'),
}));

vi.mock('@react-email/render', () => ({
  render: mocks.render,
}));

vi.mock('@/emails/ConfirmSubscription', () => ({
  default: () => null,
}));

vi.mock('@/lib/newsletter/db', () => ({
  findSubscriberByEmail: mocks.findSubscriberByEmail,
  upsertSubscriber: mocks.upsertSubscriber,
}));

vi.mock('@/lib/newsletter/utils', () => ({
  generateToken: mocks.generateToken,
  getBaseUrl: mocks.getBaseUrl,
}));

vi.mock('@/lib/mailer', () => ({
  sendEmail: mocks.sendEmail,
  getFromNewsletter: mocks.getFromNewsletter,
  isEmailConfigured: mocks.isEmailConfigured,
}));

import { POST } from './route';
import { resetRateLimits } from '@/lib/formSecurity';

function buildRequest(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', ...headers },
  });
}

describe('/api/newsletter/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetRateLimits();
    mocks.findSubscriberByEmail.mockResolvedValue(null);
    mocks.upsertSubscriber.mockResolvedValue(undefined);
  });

  it('creates a pending subscriber and sends the confirmation email', async () => {
    const request = new Request('http://localhost/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'reader@example.com', locale: 'en' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true, status: 'pending' });
    expect(mocks.upsertSubscriber).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'reader@example.com',
        locale: 'en',
        status: 'pending',
        confirm_token: 'token-123',
        unsubscribe_token: 'token-123',
      })
    );
    expect(mocks.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'ANSA Newsletter <onboarding@resend.dev>',
        to: ['reader@example.com'],
        subject: 'Confirm your ANSA newsletter subscription',
        html: '<html>confirm</html>',
      })
    );
    expect(mocks.render).toHaveBeenCalledTimes(1);
  });

  it('rejects invalid email addresses', async () => {
    const request = new Request('http://localhost/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email', locale: 'pt' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: 'Invalid email' });
    expect(mocks.upsertSubscriber).not.toHaveBeenCalled();
    expect(mocks.sendEmail).not.toHaveBeenCalled();
  });

  it('normalizes the email before storing and sending', async () => {
    const response = await POST(
      buildRequest({ email: '  Reader@Example.COM ', locale: 'en' })
    );

    expect(response.status).toBe(200);
    expect(mocks.findSubscriberByEmail).toHaveBeenCalledWith('reader@example.com');
    expect(mocks.upsertSubscriber).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'reader@example.com' })
    );
    expect(mocks.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ to: ['reader@example.com'] })
    );
  });

  it('silently drops submissions with the honeypot field filled', async () => {
    const response = await POST(
      buildRequest({ email: 'bot@example.com', locale: 'en', website: 'http://spam.example' })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true, status: 'pending' });
    expect(mocks.upsertSubscriber).not.toHaveBeenCalled();
    expect(mocks.sendEmail).not.toHaveBeenCalled();
  });

  it('rate limits repeated submissions from the same IP', async () => {
    const headers = { 'x-forwarded-for': '203.0.113.9' };

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(
        buildRequest({ email: `reader${i}@example.com`, locale: 'en' }, headers)
      );
      expect(response.status).toBe(200);
    }

    const blocked = await POST(
      buildRequest({ email: 'reader6@example.com', locale: 'en' }, headers)
    );
    const body = await blocked.json();

    expect(blocked.status).toBe(429);
    expect(body).toEqual({ error: 'Too many requests' });
    expect(mocks.upsertSubscriber).toHaveBeenCalledTimes(5);
  });
});
