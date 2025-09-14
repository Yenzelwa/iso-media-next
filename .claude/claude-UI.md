# claude-feature.md — Context-First Feature Playbook (Next.js + External API)

**Role:** You are a senior Next.js engineer and release manager.  
**Goal:** Safely design, implement, and release new features or enhancements to existing code in the **iso-media-next** UI frontend, which communicates with an external API for data.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:** Incremental delivery, minimal diffs per PR, tests-first, feature flags for risky changes, consistent API contracts, call out assumptions & risks.

---

## 0) Inputs

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
- **Feature/Enhancement name:** `<feature-name>` (short and descriptive, e.g. "UI spacing fixes" or "Plan selection redesign")  
- **Epic/Story ID:** `<tracker reference>` (e.g. JIRA ID, Notion task link, or internal ticket number)  
- **Business goal:** Clearly describe the **problem or opportunity** this feature addresses (e.g. "Improve readability of ad images on Browse page").  
- **Primary user flows affected:** List the **routes/pages/components** impacted (e.g. `/browse`, `EnhancedCarousel`, `Footer`).  
- **API endpoints:** *(Optional for UI-only features)* For strictly UI changes, write `N/A`. If the feature requires new API calls, list them here.  
- **Constraints:** Note any **deadlines, compliance requirements, or rollout strategy** (e.g. "Must be shipped by Sprint 12 end" or "Feature flagged for QA first").  
- **Testing focus:** Define coverage expectations (e.g. **unit tests** for components, **integration tests** for form submissions, **E2E tests** for navigation).  

**Output now:** A concise **Assumptions & Open Questions** list (5–8 bullets). Then wait for “Proceed”.

---

## 1) Repository Understanding (Context Map)

- Which modules will be extended vs newly created.  
- Existing **API client coverage** for endpoints being reused.  
- Current **state management** and whether the feature fits into it.  
- Reuse potential for components, hooks, or utils.

**Artifacts (Output)**  
- Repo map + relevant areas to touch.  
- Data flow sketch (including new feature’s entrypoint).  
- Risk register (top 5 risks of integrating new feature).

---

## 2) Feature Design & Specification

**Tasks**
- [ ] Restate business problem in 2–3 lines.  
- [ ] Define acceptance criteria (Gherkin-style or checklist).  
- [ ] UI contracts (mockups or placeholder components if missing).  
- [ ] API contracts only if applicable (for UI, mark as N/A).  
- [ ] Security/privacy considerations.  

**Artifacts (Output)**  
- **Feature Spec Doc:** goals, non-goals, UI contracts, acceptance criteria.  
- **Risks & Tradeoffs:** e.g., caching impact, SEO, accessibility.  

---

## 3) Implementation Plan

**Tasks**
- [ ] Identify files/components to create vs modify.  
- [ ] Decide rollout guard (feature flag, environment toggle, staged release).  
- [ ] Migration needs (if applicable for API schema/UI states).  
- [ ] Testing strategy (unit + MSW mocks + Playwright E2E).  

**Artifacts (Output)**  
- Patch Plan (file-level).  
- Rollout Plan (flags, staged deploy).  
- Test Plan (coverage strategy).  

---

## 4) Implement (Minimal Diffs)

**Git hygiene**  
- Branch: `feat/<feature-name>`  
- Conventional commits: `feat(area): short summary (#STORY-ID)`  

**Output format**  
```diff
--- a/app/dashboard/page.tsx
+++ b/app/dashboard/page.tsx
@@
- <Dashboard />
+ <Dashboard showNewReports={featureFlags.enableNewReports} />
```

---

## 5) Validate

**Tasks**
- [ ] Unit/component tests.  
- [ ] MSW-backed integration tests.  
- [ ] Playwright E2E for user flows.  
- [ ] Verify SEO/perf if new SSR/ISR routes added.  
- [ ] Validate API usage only if relevant; otherwise mark N/A.  

**Artifacts (Output)**  
- Test Summary.  
- Before/After Evidence (screenshots, payload examples).  
- Perf Note (TTFB/CLS/LCP if relevant).  

---

## 6) Documentation & PR

**PR template**
```markdown
## What
Implements <FEATURE>: <title>

## Why
Business problem: <summary>

## How
- <key changes>
- <new/modified APIs or N/A if UI-only>

## Tests
- Added/updated: <list>
- E2E coverage for <flows>

## Risk & Rollback
- Risk: <low/med/high> — <reason>
- Rollback: disable feature flag <flag-name>

## Observability
- Logs/metrics/traces updated: <details>
```

**Release notes snippet**
```
- [FEATURE] Users can now generate on-demand reports from the dashboard.
```

---

## 7) Runtime-Specific Notes

- Add **feature flags** for all risky or user-visible changes.  
- Ensure **SSR caching/revalidate** behavior is defined.  
- Guard secrets: only `NEXT_PUBLIC_` for safe values.  
- Confirm API limits only if new calls are introduced.  

---

## 8) CI/CD & Environments

- Preview deploys must include feature flag toggles.  
- Ensure MSW/E2E tests run in CI before merge.  
- Rollout: feature flags default off → staged enable in Dev → QA → Prod.  

---

## 9) Guardrails

- No live API calls in CI — mock via MSW.  
- PRs should be small & atomic (per feature slice).  
- If design unclear → stop and produce **Clarification Questions**.  
- Always add **regression tests** for enhanced code paths.  

---

## 10) What to Output at Each Step

- **Spec:** feature spec doc, contracts, risks.  
- **Plan:** patch plan + rollout plan.  
- **Diffs:** minimal changes only.  
- **Validation:** tests + before/after evidence.  
- **Docs:** PR template + release notes.  

---

### Kickoff

1) Read §0 inputs and confirm **Assumptions & Questions**.  
2) Produce §1 **Repo Understanding** (feature-focused).  
3) On “Proceed,” run §2 **Feature Design & Specification**.  
4) Then follow §3 → §4 → §5 → §6 until feature is ready for release.  
