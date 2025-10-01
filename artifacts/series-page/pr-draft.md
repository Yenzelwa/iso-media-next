## What
- Blend `/series` background with global theme overlays and remove deprecated `min-h-screen` usage in loading/error states.
- Strip redundant SERIES badges from grid cards and carousel variant while keeping episodic + rating metadata intact.
- Fortify Series page and EnhancedCarousel test suites with fetch stubs and badge assertions.
- Add Series SSD notes documenting gradient layers and badge contract.

## Why
- Series page background clashed with fixed nav/footer palette, leaving a visible seam and violating guardrails.
- Duplicate SERIES badges added visual noise without new information.
- Existing tests lacked coverage for the new styling constraints.

## How (Task-by-Task)
- Background blending issue: introduce layered gradients under `<main>`, reuse theme tokens, and swap loading/error layouts to flex centering.
- Remove SERIES label on carousel/grid: drop hard-coded grid badge and gate carousel badge rendering when `variant === 'series'`.
- Testing uplift: mock fetch with deterministic dataset, assert gradient/badge absence, and verify carousel badge visibility across variants.
- Documentation: new `SeriesExperience.md` capturing palette, badge policy, and validation steps.

## Screenshots
| Before | After |
| --- | --- |
| ![Series page before](artifacts/series-page/screenshoot/before.png) | ![Series page after](artifacts/series-page/screenshoot/after.png) |

## Tests
- `npm test -- --runTestsByPath __tests__/app/root/series/page.test.tsx __tests__/components/enhanced-carousel.test.tsx`

## Observability
- No new telemetry introduced; existing browser console guards untouched.

## Security/Compliance
- UI-only adjustments; no secrets or data contracts changed.
