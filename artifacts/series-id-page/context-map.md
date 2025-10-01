# Step 3 - Context Map (Series/[id] Page Epic)

## Core route & components
- `src/app/(root)/series/[id]/page.tsx`
  - Client component handling data fetch for series + episodes, hero rendering, action buttons, and episode cards grid.
  - Relies on `useParams` + `useRouter` from Next navigation and manually fetches REST endpoints.
  - Episode cards are rendered inline (no shared component), so styling tweaks happen here.
- Hero/action layout includes icons from `lucide-react` and local state for liked toggle + current episode.
- Loading/error states use full-screen `min-h-screen` containers that may need adjusting if guardrails require `min-h-full` (take note during implementation).

## Data dependencies
- API calls made directly to:
  - `/api/series/[id]` ? Next route backed by `src/app/api/series/[id]/route.ts` calling `getSeriesByIdService`.
  - `/api/series/[id]/seasons/{season}/episodes` ? No dedicated handler in repo (likely proxied elsewhere); mock test data is stubbed via jest.
- Episode objects expected shape includes `image_path`, `duration`, `release_date`, etc.; ensure UI changes respect existing typings in `Episode` interface defined within the page component.

## Tests & fixtures
- `__tests__/app/root/series/[id]/page.test.tsx` covers:
  - Hero metadata assertions (title, badges, rating, likes, duration, etc.).
  - Action buttons behavior (Play Series, Like toggle) and episode navigation behaviors.
  - Snapshot of entire page output.
  - Mocks lucide icons + Next router hooks.
  - NOTE: After removing badges/actions, adjust expectations + snapshot.
- No visual regression snapshots for this route yet; consider capturing manual before/after for artifacts (`artifacts/series-page/screenshoot` folder currently holds prior epic assets).

## Styling & layout
- Episode tiles currently `h-48` (~12rem) thumbnails with `group-hover` overlay showing Play icon.
- Hero area displays badges (e.g., `3 seasons`, `24 episodes`, rating, likes). Simplification will remove portions of this DOM so ensure spacing collapses gracefully.
- Engagement bar contains: Play button, Like toggle, Share, Download. We will likely delete the latter three and adjust flex gap.
- Hover play overlay is an absolutely positioned div with `opacity-0` ? `opacity-100` on hover; removal may require re-centering leftover overlay elements.

## Observability & analytics
- No explicit analytics events or logging. Removing UI elements should not impact instrumentation.

## Accessibility considerations
- Play icon removal must keep episode cards focusable/clickable; ensure there remains visible hover/focus indicator (maybe rely on border/scale states already present).
- Removing action buttons reduces interactive elements; confirm keyboard navigation still functions for remaining buttons.
- Release date currently uses `episode.release_date.toLocaleDateString()` which could break if data is string; tests likely use Date objects; check for potential runtime issues when manipulating layout.

## Dependencies & risks
- Page uses client-side fetching; changes limited to UI but watch for TypeScript strictness (component typed as `SeriesData extends Video`).
- Snapshot test will need update; ensure we capture new baseline intentionally.
- If we adjust image sizing classes, confirm they don't conflict with other pages using similar CSS (no shared component so likely isolated).

## Open questions to validate later
1. Do we need to preserve any spacing placeholders after removing badges/actions? Might need to reorganize flex layout.
2. Should hero stats (likes/time) be conditionally hidden or fully removed? Requirements specify removal ? confirm with design.
3. Are episodes always 16:9? If not, make sizing flexible but consistent.