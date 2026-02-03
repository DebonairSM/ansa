import { NextResponse } from 'next/server';
import {
  findSubscriberByUnsubscribeToken,
  recordEmailEvent,
  updateSubscriberStatus,
} from '@/lib/newsletter/db';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const subscriber = await findSubscriberByUnsubscribeToken(token);
    if (!subscriber) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    }

    if (subscriber.status !== 'unsubscribed') {
      await updateSubscriberStatus(subscriber.id, 'unsubscribed', {
        unsubscribed_at: new Date().toISOString(),
      });
      await recordEmailEvent({
        subscriber_id: subscriber.id,
        campaign_id: '',
        type: 'unsubscribe',
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
