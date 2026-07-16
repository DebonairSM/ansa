import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getCampaign: vi.fn(),
  listActiveSubscribers: vi.fn(),
  updateCampaignStatus: vi.fn(),
  sendBatch: vi.fn(),
  sendEmail: vi.fn(),
  render: vi.fn(async () => '<html>newsletter</html>'),
}));

vi.mock('next-auth/next', () => ({ getServerSession: vi.fn(async () => null) }));
vi.mock('next/headers', () => ({
  cookies: vi.fn(async () => ({ get: vi.fn(() => ({ value: 'cookie' })) })),
}));
vi.mock('@/lib/auth', () => ({ authOptions: {} }));
vi.mock('@/lib/adminAuth', () => ({
  getAdminCookieName: () => 'admin_session',
  isAdminAuthorized: () => true,
}));
vi.mock('@/lib/newsletter/db', () => ({
  getCampaign: mocks.getCampaign,
  listActiveSubscribers: mocks.listActiveSubscribers,
  updateCampaignStatus: mocks.updateCampaignStatus,
}));
vi.mock('@/lib/mailer', () => ({
  getFromNewsletter: () => 'ANSA Newsletter <newsletter@example.com>',
  isEmailConfigured: () => true,
  sendBatch: mocks.sendBatch,
  sendEmail: mocks.sendEmail,
}));
vi.mock('@/lib/newsletter/utils', () => ({
  applyLinkTracking: (content: unknown) => content,
  getBaseUrl: () => 'https://ansa.example',
}));
vi.mock('@react-email/render', () => ({ render: mocks.render }));
vi.mock('@/emails/NewsletterTemplate', () => ({ default: () => null }));

import { GET, POST } from './route';

const campaign = {
  id: 'campaign-1',
  title: 'July update',
  status: 'draft',
  content_json: {
    title: 'July update',
    preview: 'News from ANSA',
    blocks: [],
  },
};

const subscribers = [
  {
    id: 'subscriber-1',
    email: 'one@example.com',
    locale: 'en',
    unsubscribe_token: 'token-1',
  },
  {
    id: 'subscriber-2',
    email: 'two@example.com',
    locale: 'pt',
    unsubscribe_token: 'token-2',
  },
];

describe('newsletter send safeguards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getCampaign.mockResolvedValue(campaign);
    mocks.listActiveSubscribers.mockResolvedValue(subscribers);
    mocks.updateCampaignStatus.mockResolvedValue({ ...campaign, status: 'sent' });
  });

  it('returns the live send preflight details', async () => {
    const response = await GET(
      new Request('https://ansa.example/api/newsletter/send?campaignId=campaign-1')
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      subject: 'July update',
      recipientCount: 2,
      emailConfigured: true,
      status: 'draft',
    });
  });

  it('sends a test without changing campaign status', async () => {
    const response = await POST(
      new Request('https://ansa.example/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: 'campaign-1',
          mode: 'test',
          testEmail: 'admin@example.com',
          content: campaign.content_json,
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'admin@example.com',
        subject: '[TEST] July update',
      })
    );
    expect(mocks.sendBatch).not.toHaveBeenCalled();
    expect(mocks.updateCampaignStatus).not.toHaveBeenCalled();
  });

  it('blocks a full send when the confirmation is stale', async () => {
    const response = await POST(
      new Request('https://ansa.example/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: 'campaign-1',
          mode: 'full',
          confirmRecipientCount: 1,
          confirmSubject: 'July update',
        }),
      })
    );

    expect(response.status).toBe(409);
    expect(mocks.sendBatch).not.toHaveBeenCalled();
  });

  it('sends only after recipient and subject confirmation match', async () => {
    const response = await POST(
      new Request('https://ansa.example/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: 'campaign-1',
          mode: 'full',
          confirmRecipientCount: 2,
          confirmSubject: 'July update',
        }),
      })
    );

    expect(response.status).toBe(200);
    expect(mocks.sendBatch).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ to: ['one@example.com'], subject: 'July update' }),
      expect.objectContaining({ to: ['two@example.com'], subject: 'July update' }),
    ]));
    expect(mocks.updateCampaignStatus).toHaveBeenCalledWith(
      'campaign-1',
      'sent',
      expect.objectContaining({ sent_at: expect.any(String) })
    );
  });
});
