# Step 5 – Implementation Plan (Series Page Epic)

## Task 1 – Smooth Series background blend
- **Files to touch:**
  - `src/app/(root)/series/page.tsx`
  - `src/globals.css` (only if shared gradient token is missing; prefer inline Tailwind first)
  - `__tests__/app/root/series/page.test.tsx`
- **Implementation outline:**
  1. Replace the `bg-gradient-to-b from-gray-900 via-black to-gray-900` wrapper with a shared palette (`bg-surface` or composed gradient) that mirrors Browse.
  2. Introduce outer section with `relative pt-28 pb-24` and gradient overlays that bleed into nav/footer. Consider using `after` pseudo element via utility classes if necessary.
  3. Remove `min-h-screen` usage from loading/error states; swap for `flex flex-col min-h-full` pattern with padding.
- **Tests:**
  - Extend Series page RTL test to assert root container has the new gradient class combination.
  - Snapshot-not needed; rely on class checking.
- **Observability & SDL:** No new logging. Confirm no blocked guardrails (Tailwind lint). Ensure CSS change keeps bundle lean.

## Task 2 – Remove SERIES badge from tiles
- **Files to touch:**
  - `src/app/(root)/series/page.tsx`
  - `src/components/EnhancedCarousel.tsx`
  - `__tests__/app/root/series/page.test.tsx`
  - `__tests__/components/enhanced-carousel.test.tsx` (update expectations if badge text asserted)
- **Implementation outline:**
  1. Strip the hard-coded `<span>SERIES</span>` badge from the grid card.
  2. In `EnhancedCarousel`, gate `styles.badge` usage so variant `series` returns `null` (maintain for other variants). Ensure layout still balances (maybe adjust padding since badge removed).
  3. Verify episode badge/rating overlays still render.
- **Tests:**
  - Update Series page RTL test to confirm `SERIES` label no longer present.
  - Adjust EnhancedCarousel tests (if they assert type badge) to expect absence for `series` variant but presence for others.

## Shared Activities
- Run targeted Jest suites post-implementation (`npm test -- --runTestsByPath __tests__/app/root/series/page.test.tsx __tests__/components/enhanced-carousel.test.tsx`).
- Manual QA notes: desktop + mobile view to confirm gradient blend, overlays unaffected.
- Documentation: add Series SSD doc capturing new gradient tokens + badge rules.

## Risk Mitigation
- Work behind feature branch `feat/series-page`; keep diffs small per task commit.
- If gradient causes readability issues, fallback to simpler `bg-slate-950` with subtle overlay.
- No feature flag; fallback is quick revert of CSS patch.

