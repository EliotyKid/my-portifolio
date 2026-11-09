# Project Gallery Implementation Plan

> **For agentic workers:** Use inline execution. Steps use checkbox syntax for tracking.

**Goal:** Animate desktop hover previews vertically, show project cards in a mobile grid, and add a desktop list/grid switch to `/work`.

**Architecture:** Keep the shared `Projects` component and existing project data. Add an opt-in view switch for the `/work` listing, CSS grid layouts for desktop selection and mobile touch layouts, and keyed Framer Motion transitions for hover previews.

**Tech Stack:** Next.js 16 App Router, React, existing Framer Motion and GSAP, CSS, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-04-project-gallery-design.md`

## Global Constraints

- Reuse `Projects` and existing project data/covers.
- Keep home desktop in list mode.
- `/work` desktop starts in list mode and exposes an accessible list/grid switch.
- Mobile project cards use a grid without hover.
- Respect reduced motion and existing routes/content.

## Review Focus

- Mobile widths 320 and 390: cards remain readable and page has no horizontal overflow.
- Desktop `/work`: toggle updates layout and reports selected state to assistive technology.
- Desktop home: no view switch appears; list remains default.
- Reduced-motion setting: preview transition is suppressed or minimized by existing global rules.
- Pointer leaves or blurs a row: preview closes without leaving stale animation layers.

---

### Task 1: Shared project presentation

**Files:**
- Modify: `src/components/Projects/index.tsx`
- Modify: `src/components/WorkListing/index.tsx`
- Modify: `src/app/globals.css`
- Modify: `tests/browser/portfolio.spec.ts`

**Interfaces:**
- `Projects` gains optional `showViewToggle?: boolean`, default `false`.
- `WorkListing` enables it only for the `all` category.

- [ ] Add a browser test for the desktop `/work` list/grid switch, default list, and mobile grid with no toggle; run it and confirm failure.
- [ ] Add the minimal toggle, keyed upward-exit/downward-entry preview transition, and desktop/mobile CSS layouts.
- [ ] Run the focused browser test, then `npm run build`, `npm test`, and the full browser suite.
- [ ] Inspect the final diff; preserve unrelated existing workspace changes.
