# Step 2 - Inputs (Series/[id] Page Epic)

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (target: `master`)
  - **Working branch:** `feat/series-id-page`

- **Epic summary**
  - **Epic name:** Series Detail Page refinements
  - **Epic key / link:** _TBD (no tracking ticket provided)_
  - **Business goal:** Tighten the episode browsing experience on the series detail page so artwork, metadata, and controls align with the refreshed visual system while removing distracting or broken UI affordances.
  - **Primary user flows affected:** `/series/[id]` route including Hero, episode list tiles, and interactive engagement controls.

- **Epic tasks (Task Triple)**
  - **Task [1]: Episode image sizing**
    - **Input:** Visitor loads `/series/[id]` showing the episode list.
    - **Expected outcome:** Episode thumbnail images render at the intended width without stretching or excessive cropping, matching supplied design ratios across breakpoints.
    - **Validation:** Compare rendered episode tiles against design specs on desktop/mobile; confirm RTL test asserts expected sizing classnames.
  - **Task [2]: Remove hover play icon**
    - **Input:** User hovers or focuses an episode thumbnail.
    - **Expected outcome:** Hover state no longer displays the overlay play icon while preserving any remaining hover styles.
    - **Validation:** Hover/focus test confirms icon absence; unit test ensures markup no longer includes play icon element.
  - **Task [3]: Simplify Hero section**
    - **Input:** Hero panel renders for the chosen series.
    - **Expected outcome:** Auxiliary badges (SERIES label, likes, average watch time) are removed so only the essential title and description remain.
    - **Validation:** UI check plus RTL assertions verifying removed text nodes.
  - **Task [4]: Remove engagement actions**
    - **Input:** Series detail action row loads beneath the Hero.
    - **Expected outcome:** Love/like, share, and download buttons are not rendered; layout closes any resulting gaps cleanly.
    - **Validation:** Manual UI verification and tests asserting those action components are absent.

- **Constraints & considerations:** Follow App Router guardrails (Next.js 14), prefer server components unless interactivity is required, maintain Tailwind conventions without `min-h-screen`, ensure accessibility (focus handling post-hover icon removal), keep i18n approach (no new hardcoded strings). Reuse existing shared episode card component styles where possible.

- **Testing focus:** Expand `__tests__/app/root/series/[id]/page.test.tsx` to cover removed elements and sizing classnames; add/adjust component tests if episode card component changes. Manual responsive QA on `/series/[id]` after changes.

- **Assumptions & open questions:**
  1. Episode tiles share a reusable component (`Videos`, `VideoCard`, or similar) that can be adjusted globally if needed.
  2. Removing engagement actions has no downstream API dependencies (pure UI toggle).
  3. Play icon removal does not impact keyboard accessibility since the card still routes on click.
  4. Design ratio for episode thumbnails is 16:9; adjust if design team specifies otherwise.