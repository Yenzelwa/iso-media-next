# Series Page Epic – Feature Spec

## Problem Statement
The Series listing page currently uses a background gradient that clashes with the fixed navigation/footer glass panels, producing a harsh seam at the fold. In addition, every tile displays a loud "SERIES" badge, which duplicates existing context and visually competes with artwork.

## Goals
- Blend the Series route background with the global navigation/footer palette for a seamless experience across breakpoints.
- Remove redundant "SERIES" badges from grid and carousel tiles while keeping critical metadata (episodes, rating, category) intact.

## Non-Goals
- Altering Series data fetching, filtering, or sorting behaviour.
- Reworking EnhancedCarousel navigation logic or adding new tiles.
- Introducing new translations or API fields.

## Acceptance Criteria
1. **Background blend** – When a user loads `/series`, the page background uses shared theme tokens that visually merge with the nav/footer glass gradient; no abrupt color shift is visible on desktop (=1024px) or mobile (=640px).
2. **Badge removal** – Series artwork cards in both the main grid and `EnhancedCarousel` no longer display the hard-coded `SERIES` badge string, while other overlays remain unaffected.

## UI Contracts & References
- Reuse gradient tokens from Browse background alignment (`bg-surface`, `bg-gradient-to-b from-gray-950 via-gray-900 to-black`) documented in `src/docs/SSD/Browse/BrowseBackgroundAlignment.md`.
- Maintain card padding/radius defined in current Series grid; ensure hover overlays keep `group-hover` transitions.

## Accessibility & UX
- Contrast for text/overlays must remain =4.5:1. Validate that filters, copy, and hover metadata remain legible over the updated gradient.
- Removing the badge should not change focus styles or interactive target sizes.

## Security & Privacy
- No new data interactions. Ensure no additional logging of PII.

## Observability
- No new telemetry planned; confirm existing console error handling untouched.

## Risks & Mitigations
- **Visual regression** – Introduce Storybook screenshot or manual QA notes; fallback by toggling CSS classes only (no structural change).
- **Cross-component impact** – EnhancedCarousel variant change must be gated so documentaries/home continue showing category badges correctly.
- **Guardrail compliance** – Remove `min-h-screen` usage in loading/error states to align with CLAUDE prompt guidelines, verifying layout still covers viewport using padding + flex utilities.

