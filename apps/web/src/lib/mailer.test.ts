import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  resendSend: vi.fn(),
  gmailSendMail: vi.fn(),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: mocks.resendSend,
    },
  })),
}));

vi.mock('nodemailer', () => ({
  default: {
    createTransport: vi.fn(() => ({
      sendMail: mocks.gmailSendMail,
    })),
  },
}));

import { sendEmail } from './mailer';

describe('sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.RESEND_API_KEY;
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
  });

  it('bccs the monitoring address when sending through Resend', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    mocks.resendSend.mockResolvedValue({});

    await sendEmail({
      from: 'ANSA Contact Form <contact@example.com>',
      to: 'associacaonsraa@gmail.com',
      subject: 'Contact form',
      html: '<p>Hello</p>',
    });

    expect(mocks.resendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ['associacaonsraa@gmail.com'],
        bcc: ['info@vsol.software'],
      })
    );
  });

  it('does not bcc the monitoring address when it is already a recipient', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    mocks.resendSend.mockResolvedValue({});

    await sendEmail({
      from: 'ANSA Contact Form <contact@example.com>',
      to: 'info@vsol.software',
      subject: 'Contact form',
      html: '<p>Hello</p>',
    });

    expect(mocks.resendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ['info@vsol.software'],
        bcc: undefined,
      })
    );
  });

  it('bccs the monitoring address when sending through Gmail SMTP', async () => {
    process.env.GMAIL_USER = 'sender@example.com';
    process.env.GMAIL_APP_PASSWORD = 'app-password';
    mocks.gmailSendMail.mockResolvedValue({});

    await sendEmail({
      from: 'sender@example.com',
      to: ['subscriber@example.com'],
      subject: 'Newsletter',
      html: '<p>Hello</p>',
    });

    expect(mocks.gmailSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'subscriber@example.com',
        bcc: 'info@vsol.software',
      })
    );
  });
});
