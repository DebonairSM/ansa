import crypto from 'crypto';

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
