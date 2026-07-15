import { NextResponse } from 'next/server';
import { getContactRecipient, isEmailConfigured, getFromContact, sendEmail } from '@/lib/mailer';
import {
  escapeHtml,
  getClientIp,
  isRateLimited,
  normalizeEmail,
  stripHeaderNewlines,
} from '@/lib/formSecurity';

const MAX_NAME_LENGTH = 200;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(request: Request) {
  try {
    if (isRateLimited(`contact:${getClientIp(request)}`, RATE_LIMIT)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        { error: 'Contact form is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const email = normalizeEmail(body.email);
    const honeypot = typeof body.website === 'string' ? body.website.trim() : '';

    // Honeypot filled in: almost certainly a bot. Pretend success, send nothing.
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (
      name.length > MAX_NAME_LENGTH ||
      subject.length > MAX_SUBJECT_LENGTH ||
      message.length > MAX_MESSAGE_LENGTH ||
      email.length > MAX_EMAIL_LENGTH ||
      !EMAIL_REGEX.test(email)
    ) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 });
    }

    await sendEmail({
      from: getFromContact(),
      to: getContactRecipient(),
      replyTo: email,
      subject: stripHeaderNewlines(subject || `Contact Form: Message from ${name}`),
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || 'No subject')}</p>
        <hr />
        <h3>Message:</h3>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
