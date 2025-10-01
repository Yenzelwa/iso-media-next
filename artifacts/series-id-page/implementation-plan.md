# Step 5 - Implementation Plan (Series/[id] Page Epic)

## Task 1 - Episode image sizing
- **Target files**
  - `src/app/(root)/series/[id]/page.tsx`
  - `__tests__/app/root/series/[id]/page.test.tsx`
  - (Optional) shared CSS utilities if we extract sizing token.
- **Implementation outline**
  1. Review existing thumbnail markup; move hard-coded `h-48` height toward responsive aspect-ratio styling (Tailwind `aspect-video` or explicit width class + auto height).
  2. Ensure container uses consistent width across breakpoints (e.g., `w-full` with `aspect-video` ensures natural scaling, or set `md:h-48` etc.).
  3. Validate images use `object-cover` and consider `max-h` guard to avoid stretching.
  4. Adjust surrounding card layout to preserve hover/focus transitions after sizing update.
- **Testing**
  - Update Jest DOM assertions to confirm new classnames/structure for episode image wrapper.
  - Consider adding regression to ensure no inline styles set unexpected dimensions.
- **Observability/SDL**
  - No new logging. Ensure no layout shifts for CLS (check Lighthouse manually after change).

## Task 2 - Remove hover play icon
- **Target files**
  - `src/app/(root)/series/[id]/page.tsx`
  - `__tests__/app/root/series/[id]/page.test.tsx`
- **Implementation outline**
  1. Remove the `absolute` overlay div containing the play icon.
  2. Adjust hover states so `group-hover:scale-110` on the image remains but overlay opacity transitions are removed.
  3. Verify focus-visible styling remains adequate (maybe add border or ring for accessibility if necessary).
- **Testing**
  - Update RTL tests to assert the play icon SVG is absent.
  - If necessary, assert focusable area still responds to click by verifying `push` call.

## Task 3 - Simplify Hero section
- **Target files**
  - `src/app/(root)/series/[id]/page.tsx`
  - `__tests__/app/root/series/[id]/page.test.tsx`
  - Snapshot fixture (update after DOM adjustments).
- **Implementation outline**
  1. Remove SERIES badge, likes, average time, and potentially star rating nodes per requirement.
  2. Reflow remaining metadata (title, seasons/episodes counts) to avoid empty gaps; adjust flex layout/gap utilities.
  3. Confirm there are no leftover references to removed data in state or mocks.
- **Testing**
  - Update hero assertions to look for removed elements (use `queryByText` to assert absence) while keeping necessary ones (title, seasons count).
  - Refresh snapshot intentionally after verifying DOM expectation.

## Task 4 - Remove engagement actions
- **Target files**
  - `src/app/(root)/series/[id]/page.tsx`
  - `__tests__/app/root/series/[id]/page.test.tsx`
- **Implementation outline**
  1. Delete `Heart`, `Share2`, and `Download` buttons; trim surrounding flex container spacing.
  2. Remove `isLiked` state and handlers if no longer needed.
  3. Ensure Play button alignment remains centered; adjust responsive spacing.
- **Testing**
  - Update like button test (likely remove altogether) since toggle no longer exists.
  - Ensure clicking Play still routes correctly.

## Shared activities
- Update mocks in test file if they no longer need certain icons.
- Validate TypeScript (run `npm run lint` or `tsc --noEmit` if time permits) to catch unused imports/state removal.
- Run targeted Jest suite: `npm test -- --runTestsByPath __tests__/app/root/series/[id]/page.test.tsx`.
- Capture before/after screenshots of `/series/[id]` (desktop + mobile) for PR.
- Document adjustments in SSD notes if required (new doc path TBD).

## Risk mitigation
- Changes restricted to Series detail component; keep commits task-scoped for easy rollback.
- Ensure removal of icons/states does not break TypeScript compilation.
- Confirm there are no regressions in other routes since component is isolated.