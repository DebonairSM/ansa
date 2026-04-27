/**
 * Resend from-addresses. For production, set these to verified domain addresses
 * (e.g. newsletter@ansa-brasil.org). When unset, falls back to Resend's default for development.
 */
const DEFAULT_NEWSLETTER_FROM = 'ANSA Newsletter <onboarding@resend.dev>';
const DEFAULT_CONTACT_FROM = 'ANSA Contact Form <onboarding@resend.dev>';

export function getResendFromNewsletter(): string {
  return process.env.RESEND_FROM_NEWSLETTER ?? DEFAULT_NEWSLETTER_FROM;
}

export function getResendFromContact(): string {
  return process.env.RESEND_FROM_CONTACT ?? DEFAULT_CONTACT_FROM;
}
