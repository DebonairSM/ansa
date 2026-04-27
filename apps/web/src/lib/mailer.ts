/**
 * Send email via Resend (if RESEND_API_KEY) or Gmail SMTP (if GMAIL_USER + GMAIL_APP_PASSWORD).
 * For Gmail: use an App Password from Google Account > Security > 2-Step Verification > App passwords.
 */

import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

const RESEND_NEWSLETTER_FROM = 'ANSA Newsletter <onboarding@resend.dev>';
const RESEND_CONTACT_FROM = 'ANSA Contact Form <onboarding@resend.dev>';

function useResend(): boolean {
  return !!process.env.RESEND_API_KEY;
}

function useGmail(): boolean {
  return !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

export function isEmailConfigured(): boolean {
  return useResend() || useGmail();
}

export function getFromNewsletter(): string {
  if (useResend()) {
    return process.env.RESEND_FROM_NEWSLETTER ?? RESEND_NEWSLETTER_FROM;
  }
  if (useGmail()) {
    return process.env.GMAIL_FROM_NEWSLETTER ?? process.env.GMAIL_USER ?? '';
  }
  return RESEND_NEWSLETTER_FROM;
}

export function getFromContact(): string {
  if (useResend()) {
    return process.env.RESEND_FROM_CONTACT ?? RESEND_CONTACT_FROM;
  }
  if (useGmail()) {
    return process.env.GMAIL_FROM_CONTACT ?? process.env.GMAIL_USER ?? '';
  }
  return RESEND_CONTACT_FROM;
}

type SendEmailParams = {
  to: string | string[];
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
  headers?: Record<string, string>;
};

let gmailTransporter: Transporter | null = null;

function getGmailTransporter(): Transporter {
  if (!gmailTransporter) {
    gmailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return gmailTransporter;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const { to, from, subject, html, replyTo, headers } = params;
  const toList = Array.isArray(to) ? to : [to];

  if (useResend()) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from,
      to: toList,
      subject,
      html,
      replyTo: replyTo,
      headers: headers as Record<string, string> | undefined,
    });
    return;
  }

  if (useGmail()) {
    const transport = getGmailTransporter();
    await transport.sendMail({
      from,
      to: toList.join(', '),
      subject,
      html,
      replyTo,
      headers: headers ?? undefined,
    });
    return;
  }

  throw new Error('Email not configured: set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD');
}

/** Send multiple emails. With Resend uses batch API; with Gmail sends sequentially. */
export async function sendBatch(payloads: SendEmailParams[]): Promise<void> {
  if (payloads.length === 0) return;

  if (useResend()) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const batchSize = 100;
    for (let i = 0; i < payloads.length; i += batchSize) {
      const chunk = payloads.slice(i, i + batchSize).map((p) => ({
        from: p.from,
        to: Array.isArray(p.to) ? p.to : [p.to],
        subject: p.subject,
        html: p.html,
        reply_to: p.replyTo,
        headers: p.headers,
      }));
      await resend.batch.send(chunk);
    }
    return;
  }

  if (useGmail()) {
    for (const p of payloads) {
      await sendEmail(p);
    }
    return;
  }

  throw new Error('Email not configured: set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD');
}
