# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

npm-workspaces monorepo:

- `apps/web/` — Next.js 14 App Router site (TypeScript, Tailwind v4). This is where ~all real code lives.
- `apps/api/` — Express service, currently a stub (`src/index.ts`). The web app no longer depends on it; legacy entry kept for the second Render service in `render.yaml`.
- `scripts/` — Cloudflare Tunnel and image audit utilities (PowerShell + Node).
- `docs/` — Operator docs (publishing posts, Cloudflare tunnel, WP migration).

`.github/copilot-instructions.md` is **stale** — it describes a Strapi/Postgres CMS that has been removed. Do not treat it as authoritative; content is now file-based Markdown (see below).

## Common commands

Run from repo root unless noted. Dev server uses port **4545** (not 3000).

```bash
npm install              # installs all workspaces
npm run web:dev          # next dev -p 4545
npm run web:build        # next build (apps/web/.next)
npm run db:migrate       # runs apps/web/supabase/migrations/*.sql against DATABASE_URL
                         # reads env from apps/web/.env.local
```

There is no lint or test script wired up. `tsc` is invoked implicitly by `next build`; if you need a standalone type check, run `npx tsc --noEmit` inside `apps/web`.

To verify Supabase reachability before running migrations: `node apps/web/scripts/check-supabase-connection.js`.

## Architecture

### Content (file-based, no CMS)

Markdown + YAML frontmatter under `apps/web/src/content/{pages,projects,categories}/{pt,en}/*.md`. Loaders in `apps/web/src/lib/local{Content,Projects,Categories}.ts` use `gray-matter` and read straight from disk at request time. Every content type is duplicated per locale — there is no fallback between `pt` and `en`.

### i18n routing

Locales live under `apps/web/src/app/(lang)/{en,pt}/`. The `(lang)` route group's `layout.tsx` reads `params.lang` to pick the locale for `Footer` and `Navigation`. Default locale is `pt` when missing. There is no middleware-driven locale negotiation — the URL prefix is the source of truth.

### Newsletter subsystem

Supabase Postgres backs three tables (see `apps/web/supabase/migrations/20260202_newsletter.sql`): `subscribers`, `campaigns`, `email_events`.

- DB access goes through `lib/supabaseAdmin.ts` (service-role key) wrapped by `lib/newsletter/db.ts`.
- Admin UI: `app/admin/newsletter/{subscribers,campaigns}` — campaigns are JSON `NewsletterContent` blobs (typed in `lib/newsletter/types.ts`) edited block-by-block via `components/admin/CampaignEditor.tsx` and the editors under `components/newsletter/blocks/`.
- Email render path: `emails/NewsletterTemplate.tsx` (React Email) → rendered HTML → sent via `lib/mailer.ts`.
- Public flow: `/api/newsletter/{subscribe,confirm,unsubscribe}` plus tracking pixels at `/api/newsletter/{open,click}`.

### Email delivery (`lib/mailer.ts`)

Two providers, picked at runtime:

1. **Resend** when `RESEND_API_KEY` is set (preferred).
2. **Gmail SMTP** via nodemailer when `GMAIL_USER` + `GMAIL_APP_PASSWORD` are set.

If neither is set, the contact form returns 503 and newsletter sends fail loudly. The build itself does **not** require email env vars.

### Admin auth (dual-mode)

`lib/adminAuth.ts` + `lib/auth.ts`. A request is admin if **either**:

- `admin_session` cookie HMAC-matches `ADMIN_SECRET`, **or**
- A NextAuth Google session exists and the email is in `AUTH_ADMIN_EMAILS` (comma-separated).

Server components gate via `<AdminGate>` which calls `getServerSession` + cookie check and `redirect('/admin/login')` on failure. API routes must replicate the same check — there is no middleware enforcing it.

### Environment variables

Canonical list in `apps/web/.env.example`. Local dev reads `apps/web/.env.local`. Key ones:

- `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `DATABASE_URL` — newsletter + migrations.
- `ADMIN_SECRET` — cookie-based admin auth.
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_ADMIN_EMAILS`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — Google OAuth admin path.
- `RESEND_API_KEY` (+ `RESEND_FROM_*`) **or** `GMAIL_USER` + `GMAIL_APP_PASSWORD`.
- `NEXT_PUBLIC_SITE_URL` — used in email links and OAuth callbacks.

## Deployment

`render.yaml` defines two services (`ansa-web`, `ansa-api`). The API service is largely vestigial; the web service runs `npm install && npm run build` then `npm start` from `apps/web`. Custom domain and DNS are configured per Render docs. Cloudflare Tunnel scripts in `scripts/cloudflared-*.ps1` expose local 4545 to the internet for previewing without deploying.
