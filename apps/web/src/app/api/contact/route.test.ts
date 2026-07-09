import { beforeEach, describe, expect, it, vi } from 'vitest';

const mailer = vi.hoisted(() => ({
  sendEmail: vi.fn(),
  getFromContact: vi.fn(() => 'ANSA Contact Form <onboarding@resend.dev>'),
  getContactRecipient: vi.fn(() => 'associacaonsraa@gmail.com'),
  isEmailConfigured: vi.fn(() => true),
}));

vi.mock('@/lib/mailer', () => ({
  sendEmail: mailer.sendEmail,
  getFromContact: mailer.getFromContact,
  getContactRecipient: mailer.getContactRecipient,
  isEmailConfigured: mailer.isEmailConfigured,
}));

import { POST } from './route';

describe('/api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends contact email to the configured recipient', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Maria',
        email: 'maria@example.com',
        subject: 'Hello',
        message: 'I want to help.\nPlease contact me.',
      }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    expect(mailer.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'ANSA Contact Form <onboarding@resend.dev>',
        to: 'associacaonsraa@gmail.com',
        replyTo: 'maria@example.com',
        subject: 'Hello',
      })
    );
    expect(mailer.getContactRecipient).toHaveBeenCalledTimes(1);
  });

  it('rejects missing required fields before sending', async () => {
    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Maria',
        email: '',
        message: '',
      }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: 'Name, email, and message are required' });
    expect(mailer.sendEmail).not.toHaveBeenCalled();
  });
});
