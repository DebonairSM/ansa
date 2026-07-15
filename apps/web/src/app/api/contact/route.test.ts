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
import { resetRateLimits } from '@/lib/formSecurity';

function buildRequest(body: Record<string, unknown>, headers: Record<string, string> = {}) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', ...headers },
  });
}

describe('/api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetRateLimits();
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

  it('silently drops submissions with the honeypot field filled', async () => {
    const response = await POST(
      buildRequest({
        name: 'Bot',
        email: 'bot@example.com',
        message: 'Buy stuff',
        website: 'http://spam.example',
      })
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ success: true });
    expect(mailer.sendEmail).not.toHaveBeenCalled();
  });

  it('rejects messages over the maximum length', async () => {
    const response = await POST(
      buildRequest({
        name: 'Maria',
        email: 'maria@example.com',
        message: 'a'.repeat(5001),
      })
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: 'Invalid submission' });
    expect(mailer.sendEmail).not.toHaveBeenCalled();
  });

  it('normalizes the email and escapes HTML in the email body', async () => {
    const response = await POST(
      buildRequest({
        name: '<script>alert(1)</script>',
        email: '  Maria@Example.COM ',
        subject: 'A & B',
        message: '<img src=x onerror=alert(1)>',
      })
    );

    expect(response.status).toBe(200);
    const call = mailer.sendEmail.mock.calls[0][0];
    expect(call.replyTo).toBe('maria@example.com');
    expect(call.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(call.html).toContain('A &amp; B');
    expect(call.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(call.html).not.toContain('<script>');
    expect(call.html).not.toContain('<img');
  });

  it('rate limits repeated submissions from the same IP', async () => {
    const headers = { 'x-forwarded-for': '203.0.113.9' };
    const payload = { name: 'Maria', email: 'maria@example.com', message: 'Hi' };

    for (let i = 0; i < 5; i += 1) {
      const response = await POST(buildRequest(payload, headers));
      expect(response.status).toBe(200);
    }

    const blocked = await POST(buildRequest(payload, headers));
    const body = await blocked.json();

    expect(blocked.status).toBe(429);
    expect(body).toEqual({ error: 'Too many requests' });
    expect(mailer.sendEmail).toHaveBeenCalledTimes(5);
  });
});
