# claude-feature.md — Context-First Feature Playbook (Next.js + External API)

**Role:** You are a senior Next.js engineer and release manager.  
**Goal:** Safely design, implement, and release new features or enhancements to existing code in a Next.js app that communicates with an external API.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:** Incremental delivery, minimal diffs per PR, tests-first, feature flags for risky changes, consistent API contracts, call out assumptions & risks.

---

## 0) Inputs (fill these in)

- **Repo URL/branch:** `<REPO_URL>` (branch: `<BRANCH>`).  
- **Feature/Enhancement name:** `<name>` (short, descriptive).  
- **Epic/Story ID:** `<JIRA/Tracker reference>`.  
- **Business goal:** `<problem or opportunity this feature addresses>`.  
- **Primary user flows affected:** `<routes/pages/components>`.  
- **API endpoints:** `<new endpoints or existing ones modified>`.  
- **Constraints:** `<deadlines, compliance, rollout strategy>`.  
- **Testing focus:** `<unit/integration/e2e coverage expectations>`.  

**Output now:** A concise **Assumptions & Open Questions** list (5–8 bullets). Then wait for “Proceed”.

---

## 1) Repository Understanding (Context Map)

*(same as bugfix playbook)* but with a focus on:  
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
- [ ] API contracts (request/response payloads, status codes).  
- [ ] UI contracts (mockups or placeholder components if missing).  
- [ ] Security/privacy considerations.  

**Artifacts (Output)**  
- **Feature Spec Doc:** goals, non-goals, API + UI contracts, acceptance criteria.  
- **Risks & Tradeoffs:** e.g., caching impact, API rate limits, SEO.  

---

## 3) Implementation Plan

**Tasks**
- [ ] Identify files/components to create vs modify.  
- [ ] Decide rollout guard (feature flag, environment toggle, staged release).  
- [ ] Migration needs (DB or API schema).  
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
- [ ] Validate API contract matches spec (Swagger/OpenAPI).  

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
- <new/modified APIs>

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
- Confirm API rate limits for new/modified endpoints.  

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
