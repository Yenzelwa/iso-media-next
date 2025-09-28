# claude-feature.md — Context-First Feature Playbook (Next.js + External API)

**Role:** You are a senior Next.js engineer and release manager.  
**Goal:** Safely design, implement, and release new features or enhancements to existing code in the **iso-media-next** UI frontend, which communicates with an external API for data.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:** Incremental delivery, minimal diffs per PR, tests-first, feature flags for risky changes, consistent API contracts, call out assumptions & risks.

---

## 0) Inputs

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
- **Feature/Enhancement name:** `<feature-name>` (short and descriptive, e.g. "UI spacing fixes" or "Plan selection redesign")  
- **Business goal:** Clearly describe the **problem or opportunity** this feature addresses (e.g. "Improve readability of ad images on Browse page").  
- **Primary user flows affected:** List the **routes/pages/components** impacted (e.g. `/browse`, `EnhancedCarousel`, `Footer`).  
- **Constraints:**  
- **Testing focus:** Define coverage expectations (e.g. **unit tests** for components).  

**Output now:** A concise **Assumptions & Open Questions** list (5–8 bullets). Then wait for “Proceed”.

---

## 1) Repository Understanding (Context Map)

- Which modules will be extended vs newly created.  
- Current **state management** and whether the feature fits into it.  
- Reuse potential for components, hooks, or utils.
---

## 2) Feature Design & Specification

**Tasks**
- [ ] Restate business problem in 2–3 lines.  
- [ ] Define acceptance criteria (Gherkin-style or checklist).  
- [ ] UI contracts (mockups or placeholder components if missing).  
- [ ] Security/privacy considerations.  

**Artifacts (Output)**  
- **Feature Spec Doc:** goals, non-goals, UI contracts, acceptance criteria.  
- **Risks & Tradeoffs:** e.g., caching impact, SEO, accessibility.  

---

## 3) Implementation Plan

**Tasks**
- [ ] Identify files/components to create vs modify.  
- [ ] Testing strategy (unit ).  

**Artifacts (Output)**  
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
- [ ] Verify SEO/perf if new SSR/ISR routes added.   

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


## 7) What to Output at Each Step

- **Spec:** feature spec doc, contracts, risks. 
- **Validation:** tests + before/after evidence.  
- **PR:** created PR request.  

---

### Kickoff

1) Read §0 inputs and confirm **Assumptions & Questions**.  
2) Produce §1 **Repo Understanding** (feature-focused).  
3) On “Proceed,” run §2 **Feature Design & Specification**.  
4) Then follow §3 → §4 → §5 → §6 until feature is ready for release.  
