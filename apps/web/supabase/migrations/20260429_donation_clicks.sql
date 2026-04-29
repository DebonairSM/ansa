-- Donation click tracking.
-- Records outbound PayPal CTA clicks by page and locale.
-- No donor PII: no IP, no user agent, no cookies, no fingerprint.

create extension if not exists "pgcrypto";

create table if not exists donation_clicks (
  id        uuid        primary key default gen_random_uuid(),
  ts        timestamptz not null    default now(),
  locale    text        not null check (locale in ('pt', 'en')),
  page_path text        not null check (length(page_path) <= 200),
  cta       text        not null check (cta ~ '^[a-z0-9][a-z0-9-]{0,63}$')
);

create index if not exists donation_clicks_ts_idx
  on donation_clicks (ts desc);

create index if not exists donation_clicks_page_locale_cta_idx
  on donation_clicks (page_path, locale, cta);
