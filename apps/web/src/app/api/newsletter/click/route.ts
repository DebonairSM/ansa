import { NextResponse } from 'next/server';
import { recordEmailEvent } from '@/lib/newsletter/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get('to');
  const campaignId = searchParams.get('campaign');
  const subscriberId = searchParams.get('sub');

  if (!destination) {
    return NextResponse.json({ error: 'Missing destination' }, { status: 400 });
  }

  try {
    if (campaignId && subscriberId) {
      await recordEmailEvent({
        campaign_id: campaignId,
        subscriber_id: subscriberId,
        type: 'click',
        url: destination,
      });
    }
  } catch (error) {
    console.error('Newsletter click tracking error:', error);
  }

  return NextResponse.redirect(destination);
}
