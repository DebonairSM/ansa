const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const DEFAULT_CONTACT_TO = 'associacaonsraa@gmail.com';
const MONITOR_BCC = 'info@vsol.software';
const DEFAULT_RESEND_FROM = 'ANSA Contact Form <onboarding@resend.dev>';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const index = trimmed.indexOf('=');
    if (index === -1) continue;

    const key = trimmed.slice(0, index);
    if (process.env[key]) continue;

    process.env[key] = trimmed.slice(index + 1).replace(/^['"]|['"]$/g, '');
  }
}

function getBcc(to) {
  return to.toLowerCase() === MONITOR_BCC ? undefined : MONITOR_BCC;
}

async function sendWithResend({ to, from, subject, html }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      bcc: getBcc(to) ? [getBcc(to)] : undefined,
      subject,
      html,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`${result.name || result.error || 'resend_error'}: ${result.message || JSON.stringify(result)}`);
  }

  return { provider: 'resend', id: result.id };
}

async function sendWithGmail({ to, from, subject, html }) {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const info = await transport.sendMail({
    from,
    to,
    bcc: getBcc(to),
    subject,
    html,
  });

  return { provider: 'gmail', id: info.messageId };
}

async function main() {
  loadEnvFile(path.resolve(__dirname, '../.env.local'));

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_CONTACT_TO;
  const subject = `ANSA website email smoke test - ${new Date().toISOString()}`;
  const html = [
    '<p>This is a smoke test from the ANSA website email configuration.</p>',
    `<p>Primary recipient: ${to}</p>`,
    `<p>BCC monitor: ${getBcc(to) || '(not added because it is already the primary recipient)'}</p>`,
  ].join('');

  if (process.env.RESEND_API_KEY) {
    const from = process.env.RESEND_FROM_CONTACT || DEFAULT_RESEND_FROM;
    const result = await sendWithResend({ to, from, subject, html });
    console.log(JSON.stringify({ ok: true, ...result, from, to, bcc: getBcc(to) }, null, 2));
    return;
  }

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const from = process.env.GMAIL_FROM_CONTACT || process.env.GMAIL_USER;
    const result = await sendWithGmail({ to, from, subject, html });
    console.log(JSON.stringify({ ok: true, ...result, from, to, bcc: getBcc(to) }, null, 2));
    return;
  }

  throw new Error('Email not configured: set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD');
}

main().catch((error) => {
  console.error(JSON.stringify({ ok: false, error: error.message }, null, 2));
  process.exitCode = 1;
});
