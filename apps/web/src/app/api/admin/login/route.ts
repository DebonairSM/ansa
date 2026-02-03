import { NextResponse } from 'next/server';
import { getAdminCookieName, getAdminSessionValue } from '@/lib/adminAuth';

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Admin access not configured' }, { status: 500 });
  }

  const body = await request.json();
  if (!body?.secret || body.secret !== secret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), getAdminSessionValue(secret), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
  return response;
}
