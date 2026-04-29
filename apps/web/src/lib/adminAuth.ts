import type { Session } from 'next-auth';
import crypto from 'crypto';
import { isAllowedAdminEmail } from './auth';

const ADMIN_COOKIE = 'admin_session';

export function getAdminCookieName() {
  return ADMIN_COOKIE;
}

export function getAdminSessionValue(secret: string) {
  return crypto.createHmac('sha256', secret).update('admin-session').digest('hex');
}

export function isAdminSessionValid(cookieValue: string | undefined, secret: string) {
  if (!cookieValue) return false;
  return cookieValue === getAdminSessionValue(secret);
}

/**
 * Returns true if the user is authorized as admin via cookie/secret OR via NextAuth session (Google) with allowed email.
 */
export function isAdminAuthorized(
  cookieValue: string | undefined,
  secret: string,
  session: Session | null
): boolean {
  if (secret && isAdminSessionValid(cookieValue, secret)) return true;
  if (session?.user?.email && isAllowedAdminEmail(session.user.email)) return true;
  return false;
}
