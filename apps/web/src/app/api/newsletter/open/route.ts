import { NextResponse } from 'next/server';
import { recordEmailEvent } from '@/lib/newsletter/db';

export const dynamic = 'force-dynamic';

const transparentGif = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
  'base64'
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignId = searchParams.get('campaign');
    const subscriberId = searchParams.get('sub');

    if (campaignId && subscriberId) {
      await recordEmailEvent({
        campaign_id: campaignId,
        subscriber_id: subscriberId,
        type: 'open',
      });
    }
  } catch (error) {
    console.error('Newsletter open tracking error:', error);
  }

  return new NextResponse(transparentGif, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store',
    },
  });
}
