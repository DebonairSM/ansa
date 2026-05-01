import { getSupabaseAdminClient } from '../supabaseAdmin';

export type DonationClickRow = {
  id: string;
  ts: string;
  locale: string;
  page_path: string;
  cta: string;
};

export async function listDonationClicks(since: Date | null): Promise<DonationClickRow[]> {
  const supabase = getSupabaseAdminClient();
  let query = supabase
    .from('donation_clicks')
    .select('id, ts, locale, page_path, cta')
    .order('ts', { ascending: false })
    .limit(50000);
  if (since) {
    query = query.gte('ts', since.toISOString());
  }
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as DonationClickRow[];
}
