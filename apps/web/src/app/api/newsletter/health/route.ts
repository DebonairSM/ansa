import { NextResponse } from 'next/server';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/newsletter/health
 * Checks if Supabase is reachable (env set + network). Use to verify connectivity.
 */
export async function GET() {
  const supabaseHost = process.env.SUPABASE_URL
    ? (() => {
        try {
          return new URL(process.env.SUPABASE_URL).hostname;
        } catch {
          return 'invalid SUPABASE_URL';
        }
      })()
    : null;

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return NextResponse.json(
      { ok: false, error: 'SUPABASE_URL or SUPABASE_SERVICE_KEY not set', supabaseHost },
      { status: 503 }
    );
  }
  try {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from('subscribers')
      .select('id')
      .limit(1)
      .abortSignal(AbortSignal.timeout(10000));
    if (error) {
      console.error('Newsletter health Supabase error:', error);
      return NextResponse.json(
        { ok: false, error: error.message || 'Database error', code: error.code, supabaseHost },
        { status: 503 }
      );
    }
    return NextResponse.json({ ok: true, supabaseHost });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const cause = err instanceof Error && err.cause instanceof Error ? err.cause.message : '';
    const isNetwork = /ENOTFOUND|ECONNREFUSED|ETIMEDOUT|getaddrinfo/i.test(message) || /ENOTFOUND|ECONNREFUSED|ETIMEDOUT|getaddrinfo/i.test(cause);
    console.error('Newsletter health error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: isNetwork ? 'Database unreachable (check network/DNS)' : 'Database check failed',
        message,
        cause,
        supabaseHost,
      },
      { status: 503 }
    );
  }
}
