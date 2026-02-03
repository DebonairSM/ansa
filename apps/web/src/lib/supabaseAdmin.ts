import { createClient } from '@supabase/supabase-js';
import { requireEnv } from './safelyGetEnv';

export function getSupabaseAdminClient() {
  const url = requireEnv('SUPABASE_URL');
  const serviceKey = requireEnv('SUPABASE_SERVICE_KEY');
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
