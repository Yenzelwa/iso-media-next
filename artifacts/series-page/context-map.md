# Step 3 – Context Map (Series Page Epic)

## Existing Modules & Responsibilities
- `src/app/(root)/series/page.tsx` – Client component that fetches `/api/series`, applies category/sort filters, and renders the grid plus four `EnhancedCarousel` instances (variant `series`).
- `src/components/EnhancedCarousel.tsx` – Shared client carousel with variant-specific styling. The `series` variant currently renders a red badge via `styles.badge` using `movie.type.name` and includes hover overlays + nav arrows.
- `__tests__/app/root/series/page.test.tsx` – RTL suite mocking `EnhancedCarousel` to assert filtering, sorting, and carousel props; no direct assertions on background theme or badge visibility yet.
- Tailwind theme tokens live in `tailwind.config.ts` / `globals.css`; recent Browse work introduced gradient helpers for `bg-background` + overlay blends.
- Navigation/Footer components provide glassmorphism gradients anchored at `bg-gradient-to-r from-black/95` etc., so Series page body should complement these tones.

## Reuse Opportunities
- Borrow gradient class combinations from browse hero (`src/components/Hero.tsx`) or documented tokens in `src/docs/SSD/Browse/BrowseBackgroundAlignment.md` to maintain palette consistency.
- Use existing utility `yearFrom` and grid card layout; only tweak wrappers/styles, avoiding data or router logic changes.
- Extend current Jest test file instead of creating new suite; mock adjustments may be minimal (assert absence of badge text).

## Constraints & Considerations
- Guardrail forbids `min-h-screen`; loading/error states currently violate this and likely need refactor to maintain layout while respecting constraint.
- Background refactor must preserve readability for overlays and text (WCAG AA contrast).
- Removing "SERIES" badge must not regress layout spacing; ensure hover overlays & metadata remain balanced.
- Keep data fetch untouched (no API contract changes). If adding theme helpers, ensure they reside in shared utility or CSS to avoid duplication.
- EnhancedCarousel is used across browse/documentary; adjust badge logic conditionally so other variants retain their category label where needed.

## Testing Baseline
- Series page tests rely on static mock data from `__tests__` setup; background assertions may need `container.firstChild` class check.
- No existing visual regression pipeline—document if screenshots skipped.
- Need to run targeted Jest suite for Series and carousel when changes are complete (`npm test -- --runTestsByPath __tests__/app/root/series/page.test.tsx __tests__/components/enhanced-carousel.test.tsx`).

