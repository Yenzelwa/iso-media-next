## What
- Align browse background/layout with theme tokens and remove `min-h-screen` usage that was breaking footer flow.
- Refresh shared `Hero` component to mirror Series hero styling/behavior (overlay, CTA logic, rating clamp, accessibility tweaks).
- Prevent `EnhancedCarousel` from rendering empty sections and clean up debug noise.
- Expand Jest coverage for browse/hero/carousel flows including empty dataset guards.
- Update CLAUDE prompt to require assistant-captured before/after visuals.

## Why
- Background mismatch and layout bugs on `/browse` were reported in Epic Browse Page task list (UI polish + footer overlap).
- Hero needed parity with `/series` hero for consistent UX and CTA behavior.
- Empty carousels were rendering blank containers, hurting perceived quality.
- Prompt governance now explicitly requires assistant-driven screenshot capture.

## How (Task-by-Task)
- Background color alignment: reuse theme tokens, drop `min-h-screen`, add responsive padding and gradient container.
- EnhancedCarousel not loading: guard on `movies?.length`, remove `console.log`, ensure Promise.all fetch flow.
- Hero component layout update: share overlay gradients, add memoized active video, clamp rating, update CTAs.
- Remove empty EnhancedCarousel: filter section config, early-return in component, expand tests to assert absence.

## Screenshots\n- Skipped per user request (no before/after captures collected).

## Tests
- `npm test -- --runTestsByPath __tests__/app/root/browse.test.tsx __tests__/components/hero.test.tsx __tests__/components/enhanced-carousel.test.tsx`

## Observability
- No new telemetry; console error handling retained.

## Security/Compliance
- No new data flows; CTA/login paths unchanged.
- Prompt update clarifies screenshot handling expectation (no PII captured).

