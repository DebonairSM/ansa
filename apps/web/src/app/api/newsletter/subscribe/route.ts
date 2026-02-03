import React from 'react';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import ConfirmSubscription from '@/emails/ConfirmSubscription';
import { findSubscriberByEmail, upsertSubscriber } from '@/lib/newsletter/db';
import { generateToken, getBaseUrl } from '@/lib/newsletter/utils';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, locale } = await request.json();
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const normalizedLocale = locale === 'en' ? 'en' : 'pt';

    const existing = await findSubscriberByEmail(email);
    if (existing?.status === 'active') {
      return NextResponse.json({ ok: true, status: 'already_subscribed' });
    }

    const confirmToken = existing?.confirm_token ?? generateToken();
    const unsubscribeToken = existing?.unsubscribe_token ?? generateToken();

    await upsertSubscriber({
      email,
      status: 'pending',
      locale: normalizedLocale,
      confirm_token: confirmToken,
      unsubscribe_token: unsubscribeToken,
      unsubscribed_at: null,
      confirmed_at: null,
    });

    const baseUrl = getBaseUrl(request);
    const confirmUrl = `${baseUrl}/${normalizedLocale}/newsletter/confirm?token=${confirmToken}`;
    const html = await render(
      React.createElement(ConfirmSubscription, {
        locale: normalizedLocale,
        confirmUrl,
      })
    );

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'ANSA Newsletter <onboarding@resend.dev>',
      to: [email],
      subject:
        normalizedLocale === 'en'
          ? 'Confirm your ANSA newsletter subscription'
          : 'Confirme sua inscrição na newsletter da ANSA',
      html,
    });

    return NextResponse.json({ ok: true, status: 'pending' });
  } catch (error) {
    console.error('Newsletter subscribe error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
