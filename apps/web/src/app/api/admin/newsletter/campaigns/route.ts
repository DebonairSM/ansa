import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { authOptions } from '@/lib/auth';
import { getAdminCookieName, isAdminAuthorized } from '@/lib/adminAuth';
import { createCampaign } from '@/lib/newsletter/db';
import type { NewsletterContent } from '@/lib/newsletter/types';

export async function POST(request: Request) {
  const secret = process.env.ADMIN_SECRET ?? '';
  const hasGoogle = !!(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);
  const session = hasGoogle ? await getServerSession(authOptions) : null;
  const cookieSecret = (await cookies()).get(getAdminCookieName())?.value;
  if (!isAdminAuthorized(cookieSecret, secret, session)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content } = body as { title?: string; content?: NewsletterContent };
    if (!title || typeof title !== 'string' || !content?.blocks) {
      return NextResponse.json({ error: 'Invalid title or content' }, { status: 400 });
    }

    const campaign = await createCampaign(content, title);
    return NextResponse.json({ id: campaign.id, title: campaign.title });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
  }
}
