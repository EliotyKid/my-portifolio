# Portfolio Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Present Elias Rodrigues's five web demos in an animated, bilingual, mobile-friendly portfolio that attracts clients.
**Architecture:** Reuse the list/preview interaction, magnetic controls and existing motion libraries. Server pages select language from searchParams and share a typed project catalog. Contact uses a server-only HTTP email integration.
**Tech Stack:** Installed Next.js 16, React 19, TypeScript, Sass, GSAP, Framer Motion, native Node tests.
**Spec:** docs/superpowers/specs/2026-10-29-portfolio-design.md

## Global Constraints
- Preserve current uncommitted work and original demo directories.
- No database, CMS, authentication or new runtime dependencies.
- Portuguese default; English selected with ?lang=en and preserved in links.
- CONTACT_TO_EMAIL defaults to eliotfonse99@gmail.com; document easy changes.
- No invented client work, results, games, links or successful email deliveries.

## Review Focus
- Touch and keyboard users can open every project without hover.
- English survives internal navigation and direct entry.
- Reduced motion disables loops, parallax and transition movement.
- Invalid, oversized and repeated contact requests do not send mail.
- Provider failures and absent credentials never show success.

### Task 1: Shared catalog and runnable demos
Files: src/Data/Projects.ts, src/lib/i18n.ts, scripts/build-demos.mjs, tests/catalog.test.mjs, public/projects/, public/demos/.
- [x] Write and run failing catalog tests: five unique web slugs, translated content, valid images and demo paths.
- [x] Create catalog, language/link helpers and isolated demo exports. Build demos from temporary copies using their installed dependencies; preserve originals. Serve static exports under /demos/{slug}/ if possible, avoiding separate hosting requirements.
- [x] Capture real demo screenshots and rerun catalog checks.

### Task 2: Portfolio interface
Files: src/app/{layout.tsx,globals.css,page.tsx}, src/app/work/**/page.tsx, src/app/{about,contact}/page.tsx, src/components/{Header,Landing,Description,Projects,Contact}/, src/components/PageTransition/.
- [x] Implement header/menu, responsive hero, description, reused project-list concept with accessible links and pointer previews, project details, categories and footer.
- [x] Add language-specific metadata and language selection; reuse Magnetic after adding motion preference and cleanup handling.
- [x] Implement route transitions using pathname-keyed animation without unsupported router internals.
- [x] Verify direct routes, English navigation, 320px layout, keyboard menu and reduced motion in Chromium.

### Task 3: Contact delivery
Files: src/app/api/contact/route.ts, src/components/ContactForm/index.tsx, tests/contact.test.mjs, .env.example, README.md.
- [x] Write failing tests for malformed input, field limits, honeypot, rate limiting, absent configuration and provider failure/success.
- [x] Implement bounded request parsing, origin validation, in-process rate limiting, validated fields and server-only Resend fetch with timeout.
- [x] Add bilingual form with pending/error/success states and preserved values on failure.
- [x] Run native tests; explain multi-instance rate limit limitation and required email setup.

### Task 4: Final checks
- [x] Run build, TypeScript, targeted lint and native tests.
- [x] Exercise all pages/demos in desktop/mobile browser; save screenshots and fix failures.
- [x] Review final diff and document remaining external email configuration. Do not commit or publish without request.

## Execution decisions
Work in the user's current checkout to retain existing uncommitted UI work. No worktree or automatic commit. Ruling: npm audit identified critical Next.js vulnerabilities; upgrade Next.js to 16.4.3 and apply compatible audit fixes, then rebuild and retest. Add Playwright as a development dependency for reproducible browser checks. Ruling: a small Next.js proxy passes the selected language to the root layout so direct English responses have correct HTML language even without JavaScript. Implement inline; the user already authorized the work. Static demo exports improve the design by making all five visualizations available from the portfolio without requiring five external deploys.


## Verification results
- Production build: passed on Next.js 16.4.3.
- TypeScript: no errors.
- Native tests: 9 passed.
- Chromium browser tests: 13 passed, including both languages, every portfolio route at 320/390/768px, all demos at 320/390/1440px, and touch tablet at 1024px.
- Changed-file Biome check: 33 files passed.
- Production npm audit: zero known vulnerabilities.
- Full repository lint: 35 errors and 10 warnings in legacy components outside the active interface; preserved rather than rewriting unrelated user work.
- Fresh static review: two accessibility issues found, regression-tested and corrected; follow-up review reported no important remaining issue in those changes.
- Real email delivery: not run; requires RESEND_API_KEY and authorized CONTACT_FROM_EMAIL. Recipient defaults to eliotfonse99@gmail.com and is configurable via CONTACT_TO_EMAIL.
- No publishing or commits performed. Original demo directories untouched.
