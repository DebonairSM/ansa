import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_LOCALES = new Set(['pt', 'en']);
const CTA_PATTERN = /^[a-z0-9][a-z0-9-]{0,63}$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as
      | { cta?: unknown; page?: unknown; locale?: unknown }
      | null;
    if (!body) return new NextResponse(null, { status: 204 });

    const { cta, page, locale } = body;
    if (typeof cta !== 'string' || !CTA_PATTERN.test(cta)) {
      return new NextResponse(null, { status: 204 });
    }
    if (typeof locale !== 'string' || !ALLOWED_LOCALES.has(locale)) {
      return new NextResponse(null, { status: 204 });
    }
    if (typeof page !== 'string' || !page.startsWith('/') || page.length > 200) {
      return new NextResponse(null, { status: 204 });
    }

    const supabase = getSupabaseAdminClient();
    await supabase.from('donation_clicks').insert({
      locale,
      page_path: page,
      cta,
    });
  } catch {
    // Swallow — analytics failures must never surface to the user.
  }
  return new NextResponse(null, { status: 204 });
}
