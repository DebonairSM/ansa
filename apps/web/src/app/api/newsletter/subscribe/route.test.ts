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

describe('/api/newsletter/subscribe', () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
});
