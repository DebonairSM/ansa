import { NextResponse } from 'next/server';
import { findSubscriberByConfirmToken, updateSubscriberStatus } from '@/lib/newsletter/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const subscriber = await findSubscriberByConfirmToken(token);
    if (!subscriber) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 404 });
    }

    if (subscriber.status !== 'active') {
      await updateSubscriberStatus(subscriber.id, 'active', {
        confirmed_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Newsletter confirm error:', error);
    return NextResponse.json({ error: 'Failed to confirm subscription' }, { status: 500 });
  }
}
