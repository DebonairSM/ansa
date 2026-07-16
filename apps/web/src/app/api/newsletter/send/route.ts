import React from 'react';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import { cookies } from 'next/headers';
import NewsletterTemplate from '@/emails/NewsletterTemplate';
import { authOptions } from '@/lib/auth';
import { getAdminCookieName, isAdminAuthorized } from '@/lib/adminAuth';
import {
  getCampaign,
  listActiveSubscribers,
  updateCampaignStatus,
} from '@/lib/newsletter/db';
import type { NewsletterContent } from '@/lib/newsletter/types';
import { applyLinkTracking, getBaseUrl } from '@/lib/newsletter/utils';
import {
  getFromNewsletter,
  isEmailConfigured,
  sendBatch,
  sendEmail,
} from '@/lib/mailer';

type SendRequestBody = {
  campaignId?: string;
  mode?: 'test' | 'full';
  testEmail?: string;
  content?: NewsletterContent;
  confirmRecipientCount?: number;
  confirmSubject?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function isAuthorized(request: Request) {
  const secret = process.env.ADMIN_SECRET ?? '';
  const headerSecret = request.headers.get('x-admin-secret');
  const hasGoogle = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const session = hasGoogle ? await getServerSession(authOptions) : null;
  const cookieSecret = (await cookies()).get(getAdminCookieName())?.value;
  return (
    (secret && headerSecret === secret) ||
    isAdminAuthorized(cookieSecret, secret, session)
  );
}

function isNewsletterContent(value: unknown): value is NewsletterContent {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const content = value as Partial<NewsletterContent>;
  return typeof content.title === 'string' && Array.isArray(content.blocks);
}

export async function GET(request: Request) {
  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const campaignId = new URL(request.url).searchParams.get('campaignId');
    if (!campaignId) {
      return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 });
    }

    const [campaign, subscribers] = await Promise.all([
      getCampaign(campaignId),
      listActiveSubscribers(),
    ]);

    return NextResponse.json({
      campaignId: campaign.id,
      status: campaign.status,
      subject: campaign.content_json.title,
      from: getFromNewsletter(),
      recipientCount: subscribers.length,
      emailConfigured: isEmailConfigured(),
    });
  } catch (error) {
    console.error('Newsletter preflight error:', error);
    return NextResponse.json({ error: 'Failed to load send details' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let deliveryStarted = false;

  try {
    if (!(await isAuthorized(request))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as SendRequestBody;
    const { campaignId } = body;
    if (!campaignId) {
      return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const campaign = await getCampaign(campaignId);
    const from = getFromNewsletter();

    if (body.mode === 'test') {
      const testEmail = body.testEmail?.trim().toLowerCase() ?? '';
      if (!emailPattern.test(testEmail)) {
        return NextResponse.json({ error: 'Enter a valid test email' }, { status: 400 });
      }

      const testContent = isNewsletterContent(body.content)
        ? body.content
        : campaign.content_json;
      if (!testContent.title.trim()) {
        return NextResponse.json({ error: 'Add a subject before testing' }, { status: 400 });
      }

      const html = await render(
        React.createElement(NewsletterTemplate, {
          content: testContent,
          unsubscribeUrl: '#',
          trackingPixelUrl: '',
        })
      );

      await sendEmail({
        from,
        to: testEmail,
        subject: `[TEST] ${testContent.title}`,
        html,
      });

      return NextResponse.json({ ok: true, testSentTo: testEmail });
    }

    if (campaign.status === 'sent') {
      return NextResponse.json({ error: 'Campaign has already been sent' }, { status: 409 });
    }

    const subscribers = await listActiveSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers' }, { status: 400 });
    }

    if (
      body.confirmRecipientCount !== subscribers.length ||
      body.confirmSubject !== campaign.content_json.title
    ) {
      return NextResponse.json(
        { error: 'Send details changed. Review the latest recipient count and subject.' },
        { status: 409 }
      );
    }

    const baseUrl = getBaseUrl(request);
    const batchPayloads = await Promise.all(
      subscribers.map(async (subscriber) => {
        const unsubscribeUrl = `${baseUrl}/${subscriber.locale}/newsletter/unsubscribe?token=${subscriber.unsubscribe_token}`;
        const trackedContent = applyLinkTracking(
          campaign.content_json,
          baseUrl,
          campaign.id,
          subscriber.id
        );
        const trackingPixelUrl = `${baseUrl}/api/newsletter/open?campaign=${campaign.id}&sub=${subscriber.id}`;
        const html = await render(
          React.createElement(NewsletterTemplate, {
            content: trackedContent,
            unsubscribeUrl,
            trackingPixelUrl,
          })
        );
        return {
          from,
          to: [subscriber.email],
          subject: campaign.content_json.title,
          html,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl}>`,
          },
        };
      })
    );

    deliveryStarted = true;
    await sendBatch(batchPayloads);

    await updateCampaignStatus(campaign.id, 'sent', {
      sent_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, sent: subscribers.length });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      {
        error: deliveryStarted
          ? 'Send did not complete. Some recipients may have received it; review provider logs before retrying.'
          : 'Failed to send campaign',
      },
      { status: 500 }
    );
  }
}
