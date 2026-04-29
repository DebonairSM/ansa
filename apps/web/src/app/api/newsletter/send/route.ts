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
import { applyLinkTracking, getBaseUrl } from '@/lib/newsletter/utils';
import { isEmailConfigured, getFromNewsletter, sendBatch } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const secret = process.env.ADMIN_SECRET ?? '';
    const headerSecret = request.headers.get('x-admin-secret');
    const hasGoogle = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
    const session = hasGoogle ? await getServerSession(authOptions) : null;
    const cookieSecret = (await cookies()).get(getAdminCookieName())?.value;
    const isAuthed =
      (secret && headerSecret === secret) ||
      isAdminAuthorized(cookieSecret, secret, session);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { campaignId } = await request.json();
    if (!campaignId) {
      return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const campaign = await getCampaign(campaignId);
    const subscribers = await listActiveSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers' }, { status: 400 });
    }

    const baseUrl = getBaseUrl(request);
    const from = getFromNewsletter();
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

    await sendBatch(batchPayloads);

    await updateCampaignStatus(campaign.id, 'sent', {
      sent_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, sent: subscribers.length });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json({ error: 'Failed to send campaign' }, { status: 500 });
  }
}
