import React from 'react';
import { NextResponse } from 'next/server';
import { render } from '@react-email/render';
import NewsletterTemplate from '@/emails/NewsletterTemplate';
import { NewsletterContent } from '@/lib/newsletter/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const content = body?.content as NewsletterContent | undefined;
    if (!content?.title) {
      return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
    }

    const html = await render(
      React.createElement(NewsletterTemplate, {
        content,
        unsubscribeUrl: 'https://ansa-brasil.org/unsubscribe',
        trackingPixelUrl: '',
      })
    );

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Newsletter preview error:', error);
    return NextResponse.json({ error: 'Failed to render preview' }, { status: 500 });
  }
}
