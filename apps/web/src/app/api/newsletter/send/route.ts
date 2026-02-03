import React from 'react';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { cookies } from 'next/headers';
import NewsletterTemplate from '@/emails/NewsletterTemplate';
import { getAdminCookieName, isAdminSessionValid } from '@/lib/adminAuth';
import {
  getCampaign,
  listActiveSubscribers,
  updateCampaignStatus,
} from '@/lib/newsletter/db';
import { applyLinkTracking, getBaseUrl } from '@/lib/newsletter/utils';

export async function POST(request: Request) {
  try {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Admin access not configured' }, { status: 500 });
    }

    const headerSecret = request.headers.get('x-admin-secret');
    const cookieSecret = cookies().get(getAdminCookieName())?.value;
    const isAuthed =
      headerSecret === secret || isAdminSessionValid(cookieSecret, secret);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { campaignId } = await request.json();
    if (!campaignId) {
      return NextResponse.json({ error: 'Missing campaignId' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const campaign = await getCampaign(campaignId);
    const subscribers = await listActiveSubscribers();
    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers' }, { status: 400 });
    }

    const baseUrl = getBaseUrl(request);
    const resend = new Resend(apiKey);
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
          from: 'ANSA Newsletter <onboarding@resend.dev>',
          to: [subscriber.email],
          subject: campaign.content_json.title,
          html,
          headers: {
            'List-Unsubscribe': `<${unsubscribeUrl}>`,
          },
        };
      })
    );

    const batchSize = 100;
    for (let i = 0; i < batchPayloads.length; i += batchSize) {
      const chunk = batchPayloads.slice(i, i + batchSize);
      await resend.batch.send(chunk);
    }

    await updateCampaignStatus(campaign.id, 'sent', {
      sent_at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, sent: subscribers.length });
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json({ error: 'Failed to send campaign' }, { status: 500 });
  }
}
