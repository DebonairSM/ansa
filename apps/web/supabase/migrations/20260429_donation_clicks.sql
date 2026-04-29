-- Donation click tracking.
-- Records outbound PayPal CTA clicks by page and locale.
-- No donor PII: no IP, no user agent, no cookies, no fingerprint.

create extension if not exists "pgcrypto";

create table if not exists donation_clicks (
  id        uuid        primary key default gen_random_uuid(),
  ts        timestamptz not null    default now(),
  locale    text        not null,
  page_path text        not null,
  cta       text        not null
);

create index if not exists donation_clicks_ts_idx
  on donation_clicks (ts desc);

create index if not exists donation_clicks_page_locale_cta_idx
  on donation_clicks (page_path, locale, cta);
