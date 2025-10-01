# Step 2 – Inputs (Series Page Epic)

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (target: `master`)
  - **Working branch:** `feat/series-page`

- **Epic summary**
  - **Epic name:** Series Page UI polish
  - **Epic key / link:** _TBD (no Jira link provided)_
  - **Business goal:** Align the Series listing experience with the refreshed media theme so it visually matches the nav/footer palette and removes redundant badges that distract from artwork.
  - **Primary user flows affected:** `/series` route, `SeriesPage` grid/filters, `EnhancedCarousel` variant `series`.

- **Epic tasks (Task Triple)**
  - **Task [1]: Smooth Series background blend**
    - **Input:** Visitor loads `/series` with default theme applied.
    - **Expected outcome:** Background gradient matches the shared layout palette and blends seamlessly with the navigation/footer region.
    - **Validation:** Visual QA across desktop breakpoints; no hard seam between header/footer and page body.
  - **Task [2]: Remove SERIES label badge**
    - **Input:** Hover cards render within `/series` grid or carousel tiles.
    - **Expected outcome:** The red "SERIES" badge is no longer rendered on artwork tiles while retaining episodic metadata and hover overlay.
    - **Validation:** Hover over series tiles and confirm the label is absent in both grid and carousel cards.

- **Constraints:** Next.js App Router (v14) guardrails, Tailwind without `min-h-screen`, reuse shared token palette (`bg-background`, `bg-surface`), maintain accessibility (WCAG AA) and do not hardcode strings outside i18n helpers, preserve `EnhancedCarousel` contract.

- **Testing focus:** Strengthen Series page coverage via React Testing Library to assert badge removal and theme token usage; smoke `EnhancedCarousel` variant logic; ensure existing Series route tests updated; visual regression optional (document if skipped).

### Assumptions & Open Questions
1. Series theme tokens mirror Browse page adjustments (reuse gradient helper or theme config).
2. Existing Series Jest test file can be extended without significant refactor.
3. Badge removal should not require API changes or translation updates.
4. Navigation/footer components already use the desired palette to blend against.
5. No feature flag requested—changes ship directly once validated.

