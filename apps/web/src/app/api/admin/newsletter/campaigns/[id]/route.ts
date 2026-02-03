import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminCookieName, isAdminSessionValid } from '@/lib/adminAuth';
import { getCampaign, updateCampaign } from '@/lib/newsletter/db';
import type { NewsletterContent } from '@/lib/newsletter/types';

async function requireAdmin() {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Admin access not configured' }, { status: 500 });
  }
  const cookieSecret = (await cookies()).get(getAdminCookieName())?.value;
  if (!isAdminSessionValid(cookieSecret, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const campaign = await getCampaign(params.id);
    return NextResponse.json(campaign);
  } catch (error) {
    console.error('Get campaign error:', error);
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const { title, content } = body as { title?: string; content?: NewsletterContent };
    if (!title || typeof title !== 'string' || !content?.blocks) {
      return NextResponse.json({ error: 'Invalid title or content' }, { status: 400 });
    }

    await updateCampaign(params.id, content, title);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Update campaign error:', error);
    return NextResponse.json({ error: 'Failed to update campaign' }, { status: 500 });
  }
}
