# Series Experience – UI Refresh Notes (2025-10-01)

## Overview
The `/series` route now inherits the navigation/footer palette by layering a slate-to-black gradient with a subtle radial red glow. Hover badges were simplified to reduce noise and improve artwork focus.

## Layout Updates
- Main container uses `relative isolate pt-24 md:pt-28 lg:pt-32` to align with fixed navigation spacing.
- Background layers:
  - `div.absolute.inset-0.bg-gradient-to-b.from-slate-950.via-gray-950.to-black` for vertical blend.
  - `div.absolute.inset-x-0.top-0.h-px.bg-gradient-to-r.from-red-500/40` accent seam under navigation.
  - Radial glow `bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.15),transparent_60%)]` to keep hero warm.
- Loading/error states drop `min-h-screen`; use `flex` with `py-32` to center content without stretching past footer.

## Card Treatments
- Grid tiles remove the hard-coded `SERIES` badge; episodic and category metadata remain via footer row.
- Filter toolbar glass effect tightened with `bg-gray-900/60` and border/blur parity to Browse updates.

## Carousel Variant Contract (`variant="series"`)
- Category badge is suppressed when `variant === 'series'`; other variants (`home`, `documentary`) continue to render type labels.
- Episode chip persists in bottom-right corner. No API changes.

## Testing & Validation
- RTL tests assert absence of the uppercase `SERIES` badge and verify gradient layers render.
- `__tests__/components/enhanced-carousel.test.tsx` now checks that `series` variant hides the type label while others keep it.
- Manual QA checklist: desktop + mobile blend against nav/footer, hover overlays legible, filters accessible.

## Follow-ups
- Consider Storybook screenshot capture for `/series` hero state in future iterations.
- If nav palette changes, update gradient tokens here to avoid drift.

