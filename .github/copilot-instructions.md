# Copilot Instructions for ANSA Brasil Monorepo

## Overview
This monorepo powers a bilingual site migrated from WordPress to a modern stack:
- **Frontend**: Next.js 14+ (TypeScript, Tailwind CSS, App Router, i18n)
- **CMS**: Strapi 5 (TypeScript, i18n, PostgreSQL)
- **API**: Express (TypeScript)
- **Database**: Supabase Postgres
- **Deployment**: Render.com (3 services + persistent disk)

## Key Project Structure
- `apps/web/` — Next.js frontend (PT/EN routes, i18n, Tailwind)
- `apps/cms/` — Strapi CMS (content types: page, project, category)
- `apps/api/` — Express API (form handling, integrations)
- `scripts/wp-import.ts` — Migrates WordPress XML to Strapi
- `render.yaml` — Render.com deployment blueprint

## Developer Workflows
- **Install dependencies**: Run `npm install` in each app directory
- **Run locally**:
  - Strapi: `npm run develop` in `apps/cms` (http://localhost:1337)
  - Next.js: `npm run dev` in `apps/web` (http://localhost:3000)
  - API: `npm run dev` in `apps/api` (http://localhost:3001)
- **Build all**:
  - `cd apps/web && npm run build`
  - `cd ../api && npm run build`
  - `cd ../cms && npm run build`
- **Type check**: `npm run type-check` in `apps/web`
- **Lint**: `npm run lint` in `apps/web`

## Environment Variables
- Root `.env`: Supabase credentials
- `apps/web/.env.local`: Next.js public keys, CMS URL
- `apps/cms/.env`: DB config (SQLite for local, Postgres for prod)

## Strapi Permissions
- After first run, set public role permissions for `find`/`findOne` on `page`, `project`, `category`

## Migration & Integration
- Use `scripts/wp-import.ts` to import WordPress XML into Strapi (requires API token)
- API endpoints in `apps/api` handle forms and integrations
- Frontend fetches content from Strapi and API using environment URLs

## Deployment
- Render.com uses `render.yaml` to set up three services
- Attach persistent disk for Strapi media uploads
- Set environment variables per service as described in the main `README.md`

## Patterns & Conventions
- **i18n**: All content types and routes support PT/EN locales
- **Content Types**: Defined in `apps/cms/src/api/*/content-types/`
- **Frontend Routing**: Dynamic routes `/[lang]/[slug]` in Next.js
- **Media**: Strapi stores uploads in `/public/uploads`; can be migrated from WordPress or use Cloudinary
- **API Integration**: Contact forms use Express API, can integrate with Resend/SendGrid

## References
- See `README.md` in root and each app for more details
- Strapi docs: https://docs.strapi.io
- Next.js docs: https://nextjs.org/docs
- Render docs: https://render.com/docs
- Supabase docs: https://supabase.com/docs

---
**Update this file if major architecture or workflow changes occur.**
