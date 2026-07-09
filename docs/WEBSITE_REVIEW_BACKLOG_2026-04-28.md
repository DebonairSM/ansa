# ANSA Website Review and Backlog

Date: 2026-04-28

This review is based on the current repository state in `D:\prod\ansa` plus a local live-site pass against `http://localhost:4545`.

## Executive Summary

The site has a solid foundation: a bilingual Next.js public site, file-based project content, a working donation path, contact form support, and a custom newsletter/admin subsystem. The main limitations are now less about basic functionality and more about operational maturity: content is still developer-managed, SEO metadata is incomplete, production image updates require a process restart, newsletter/contact surfaces need stronger abuse protection and observability, and dependencies need a security refresh.

The recommended next phase is to stabilize the platform, improve content publishing, and make the donation/newsletter funnel measurable.

## Current Limitations

### 1. Content Management Is Developer-Dependent

Most public content lives in Markdown files under `apps/web/src/content`, while team bios are still hardcoded in `about/page.tsx` for each locale. Updating people, projects, images, or translations requires a code change, rebuild, and deployment. This slows down routine editorial work and increases the chance of inconsistent English/Portuguese content.

### 2. Internationalization Is Functional But Manual

The site has `/pt` and `/en` routes, but the root document language is fixed to Portuguese in `apps/web/src/app/layout.tsx`. There is no middleware-driven locale handling, no automated fallback, and no translation completeness check. Project slug mapping is hand-maintained, which is workable now but fragile as content grows.

### 3. SEO Coverage Is Incomplete

Several pages have page-level metadata, but there is no app-level `metadataBase`, no `sitemap.ts`, no `robots.ts`, and no clear canonical/hreflang strategy. Build logs warn that social image resolution falls back to `http://localhost:3000`. This limits search quality and social sharing reliability.

### 4. Production Asset Refresh Is Brittle

A newly added image in `public/uploads/2024` returned 404 from the running production Next process until restart. This suggests the current hosting/runtime setup does not reliably serve newly added public files without recycling the app. That is a practical deployment limitation for routine image updates.

### 5. Contact and Newsletter Need Abuse Protection

The contact API validates required fields and email delivery configuration, but it does not currently show rate limiting, CAPTCHA, honeypot, or HTML escaping of submitted content before email rendering. Newsletter signup has basic email validation and double opt-in, but also needs rate limiting and spam controls.

### 6. Admin/Newsletter Is Useful But Still Early-Stage

The newsletter editor supports blocks and previews, and admin auth supports cookie secret or Google session. Limitations remain: no role levels, no audit log, no scheduled sending, no resend/retry dashboard, no bounce handling automation, no segmentation beyond subscriber locale, and no guardrail preview checklist before sending.

### 7. Dependency Security Needs Attention

`npm audit --omit=dev` currently reports 12 production vulnerabilities: 2 high and 10 moderate. The most important items are Next.js advisories, plus email/auth-related dependency advisories. Some fixes may require major-version upgrades and should be tested carefully.

### 8. Public Assets Need Cleanup and Governance

`apps/web/public/uploads` contains 2,661 files and about 261 MB of assets. The root `public` folder also includes utility/demo files such as `gallery.html`, `hero-mockup.html`, `image-gallery.html`, `simple-gallery.html`, and `test.txt`. These should be reviewed before production hardening.

### 9. Testing and Quality Gates Are Thin

There is no wired lint or test script. `next build` catches TypeScript/build errors, but there are no automated checks for broken links, missing images, form behavior, accessibility, or translation completeness.

### 10. Donation Funnel Is Simple But Not Measured

Donation CTAs point to PayPal, but there is no visible event tracking, conversion tracking, donation landing page experimentation, or post-donation follow-up content. For a nonprofit site, this is one of the highest-value improvement areas.

### 11. Live-Site QA Findings

The local live pass found one broken internal link: `/pt/projects/distribuicao-alimentos-sao-joao` returns 404. `/sitemap.xml` and `/robots.txt` also return 404. Contact pages render but do not currently expose useful page titles in the HTML response. The mobile layout is readable, but the header/logo consumes significant first-screen height, CTA sections are repeated heavily before users reach project proof, and the Portuguese mobile language switcher only shows the alternate English option, which may be confusing without a current-language state.

The live site also confirmed the earlier production-asset limitation: Maristela's new profile exists in source, but the running site had not picked up the new image path, reinforcing the need for a reliable restart/deploy image workflow.

## Recommended Backlog

### P0 - Security and Production Stability

1. Upgrade Next.js and security-sensitive dependencies
   - Goal: clear high-severity production advisories where feasible.
   - Acceptance criteria: `npm audit --omit=dev` has no high vulnerabilities; `npm run web:build` passes; critical public/admin flows are smoke-tested.

2. Add abuse protection to contact and newsletter signup
   - Goal: reduce spam and protect email/database costs.
   - Acceptance criteria: add server-side rate limiting, honeypot field, email normalization, message length limits, and safe escaping/sanitization in email HTML.

3. Fix production image deployment workflow
   - Goal: new images should appear predictably after deployment.
   - Acceptance criteria: document or automate the required build/restart; verify a newly added `public/uploads` image is served after deploy; add a lightweight post-deploy smoke check.

4. Remove or protect public utility files
   - Goal: avoid exposing internal gallery/test pages.
   - Acceptance criteria: review root `public/*.html` and `test.txt`; remove, relocate, or intentionally document anything that should remain public.

5. Fix broken internal project link
   - Goal: remove 404s from the user journey.
   - Acceptance criteria: `/pt/projects/distribuicao-alimentos-sao-joao` either resolves to a real project or is removed/replaced from all linking surfaces; local crawl reports no broken internal links.

### P1 - SEO, Sharing, and Discoverability

6. Add canonical metadata, `metadataBase`, sitemap, and robots
   - Goal: improve search engine indexing and remove localhost metadata warnings.
   - Acceptance criteria: `metadataBase` uses `NEXT_PUBLIC_SITE_URL`; `/sitemap.xml` and `/robots.txt` exist; build warnings are resolved.

7. Add bilingual hreflang support
   - Goal: help search engines understand Portuguese/English page pairs.
   - Acceptance criteria: key public pages expose alternates for `pt`, `en`, and default language; project slug mapping drives alternates.

8. Improve Open Graph/Twitter sharing
   - Goal: donation/project links look polished when shared.
   - Acceptance criteria: default OG image exists; project pages use valid absolute image URLs; social preview checks pass for home, about, donate, and project pages.

9. Add missing metadata to contact and other static pages
   - Goal: avoid generic browser titles and improve share/search snippets.
   - Acceptance criteria: `/pt/contact`, `/en/contact`, and other static routes have localized titles/descriptions and verified rendered `<title>` values.

### P1 - Content Operations

10. Move team profiles into structured content
   - Goal: stop hardcoding biographies in two page components.
   - Acceptance criteria: team data lives in locale-specific Markdown/JSON/YAML; images and bios render from shared loader; adding a volunteer does not require editing React page markup.

11. Add content validation script
   - Goal: catch missing images, duplicate slugs, missing translations, and bad frontmatter before deploy.
   - Acceptance criteria: `npm run content:check` reports broken image paths, missing required fields, and locale mismatches.

12. Create an image intake workflow
   - Goal: standardize volunteer/project images.
   - Acceptance criteria: documented image naming, crop sizes, compression target, alt text requirements; optional script for resizing/compression.

### P1 - Donation and Engagement Funnel

13. Add donation tracking and CTA analytics
   - Goal: understand which pages drive donor intent.
   - Acceptance criteria: donation button clicks are tracked by source page/language; outbound PayPal clicks are measurable without collecting sensitive donor data.

14. Improve the donation page/funnel
   - Goal: make giving clearer and more persuasive.
   - Acceptance criteria: donation page presents impact examples, trust signals, recurring giving language if supported, and a clear PayPal path.

15. Add newsletter conversion reporting
   - Goal: understand signup, confirmation, open, and click performance.
   - Acceptance criteria: admin dashboard shows pending/active counts, confirmation rate, campaign opens/clicks, and recent send status.

### P2 - Admin and Newsletter Maturity

16. Add newsletter send safeguards
   - Goal: reduce risk of accidental sends.
   - Acceptance criteria: require confirmation modal, show recipient count, show subject/from address, and support test send to admin before full send.

17. Add scheduled sending or send queue
   - Goal: make newsletters less manual and safer at scale.
   - Acceptance criteria: campaigns can be scheduled or queued; failed sends are recorded; sent status includes counts and timestamps.

18. Add admin audit trail
   - Goal: track sensitive admin actions.
   - Acceptance criteria: create/update/send/unsubscribe actions record actor, timestamp, target, and summary.

### P2 - UX and Accessibility

19. Run accessibility pass on core pages
   - Goal: improve usability and meet basic WCAG expectations.
   - Acceptance criteria: keyboard nav, focus states, form labels, color contrast, alt text, and heading hierarchy verified for home, about, projects, contact, donate, and admin login.

20. Improve mobile navigation and language switching
   - Goal: reduce friction on mobile.
   - Acceptance criteria: mobile menu closes reliably on navigation; language switcher has proper labels; active states are correct for hash links and nested pages.

21. Add broken-link and image smoke tests
   - Goal: catch regressions before the client sees them.
   - Acceptance criteria: automated crawl verifies public routes, status codes, and image responses for both locales.

### P3 - Architecture Cleanup

22. Reassess vestigial Express API service
   - Goal: simplify deployment if the service is no longer needed.
   - Acceptance criteria: confirm Render/API dependency status; remove or document legacy service; update deployment docs.

23. Reduce duplication between English and Portuguese page components
   - Goal: make future changes easier.
   - Acceptance criteria: shared components/data drive similar page layouts; locale-specific copy remains separated cleanly.

24. Add CI checks
   - Goal: make quality repeatable.
   - Acceptance criteria: CI runs install, build, audit threshold, content validation, and selected smoke tests.

## Suggested First Sprint

1. Upgrade Next.js and resolve high-severity audit findings.
2. Add `metadataBase`, sitemap, robots, canonical, and hreflang support.
3. Add contact/newsletter rate limiting and safe email rendering.
4. Move team profiles into structured content and add image validation.
5. Document and test production image publishing/restart workflow.

## Client Update Draft

Hi,

We completed an initial technical review of the ANSA website and identified a practical backlog for the next phase of improvements. The site is in a good place functionally: it supports Portuguese and English pages, project content, donations through PayPal, contact form delivery, and a custom newsletter/admin workflow.

The main opportunities now are operational and growth-focused. We recommend prioritizing security/dependency updates, stronger spam protection for forms, improved SEO and social sharing setup, a more reliable image/content publishing workflow, and better reporting around donations and newsletter engagement. We also found that some content updates still require developer involvement, so moving team profiles and similar content into a structured content workflow would make ongoing maintenance easier.

Our proposed first sprint is to stabilize the platform, improve discoverability, and reduce maintenance friction: upgrade key dependencies, add sitemap/robots/canonical language metadata, harden the contact and newsletter forms, standardize image publishing, and make team/profile updates easier to manage.

The local live-site review added a few visible QA items: one broken internal project link, missing sitemap/robots routes, missing metadata on contact pages, and mobile polish opportunities around header height, repeated CTAs, and language switching. These have been folded into the backlog so the next sprint can address both technical stability and user-facing quality.
