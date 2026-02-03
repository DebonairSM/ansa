import { getSupabaseAdminClient } from '../supabaseAdmin';
import { NewsletterContent, NewsletterLocale, SubscriberRecord } from './types';

export async function findSubscriberByEmail(email: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('email', email)
    .maybeSingle();
  if (error) throw error;
  return data as SubscriberRecord | null;
}

export async function findSubscriberByConfirmToken(token: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('confirm_token', token)
    .maybeSingle();
  if (error) throw error;
  return data as SubscriberRecord | null;
}

export async function findSubscriberByUnsubscribeToken(token: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('unsubscribe_token', token)
    .maybeSingle();
  if (error) throw error;
  return data as SubscriberRecord | null;
}

export async function upsertSubscriber(payload: {
  email: string;
  status: 'pending' | 'active' | 'unsubscribed';
  locale: NewsletterLocale;
  confirm_token: string;
  unsubscribe_token: string;
  unsubscribed_at?: string | null;
  confirmed_at?: string | null;
}) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .upsert(payload, { onConflict: 'email' })
    .select('*')
    .single();
  if (error) throw error;
  return data as SubscriberRecord;
}

export async function updateSubscriberStatus(
  id: string,
  status: 'pending' | 'active' | 'unsubscribed',
  fields: Record<string, string | null> = {}
) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .update({ status, ...fields })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as SubscriberRecord;
}

export async function listActiveSubscribers() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as SubscriberRecord[];
}

export async function listSubscribers() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createCampaign(content: NewsletterContent, title: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('campaigns')
    .insert({ title, content_json: content, status: 'draft' })
    .select('*')
    .single();
  if (error) throw error;
  return data as { id: string; title: string; content_json: NewsletterContent };
}

export async function updateCampaign(id: string, content: NewsletterContent, title: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('campaigns')
    .update({ title, content_json: content })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data as { id: string; title: string; content_json: NewsletterContent; status: string };
}

export async function updateCampaignStatus(id: string, status: string, fields?: Record<string, string>) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from('campaigns')
    .update({ status, ...fields })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function getCampaign(id: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('campaigns').select('*').eq('id', id).single();
  if (error) throw error;
  return data as { id: string; title: string; content_json: NewsletterContent; status: string };
}

export async function listCampaigns() {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from('campaigns').select('*').order('created_at', {
    ascending: false,
  });
  if (error) throw error;
  return data ?? [];
}

export async function recordEmailEvent(payload: {
  subscriber_id: string;
  campaign_id: string;
  type: 'open' | 'click' | 'bounce' | 'unsubscribe';
  url?: string | null;
}) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from('email_events').insert({
    ...payload,
    url: payload.url ?? null,
  });
  if (error) throw error;
}
