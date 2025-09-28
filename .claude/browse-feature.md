# claude-feature.md — Context-First Feature Playbook (Next.js)  

**Role:** You are a senior Next.js engineer.  
**Goal:** Safely design, implement, and release new features or enhancements to the **iso-media-next** UI frontend, which communicates with an external API for data.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:** Incremental delivery, minimal diffs per PR, tests-first, call out assumptions & risks.  

---

## 0) Inputs  

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
- **Feature/Enhancement name:** Browse Page UI Fixes  
- **Business goal:** Align Browse page visuals and behavior with site theme, remove broken or empty carousels, and unify Hero layout.  
- **Primary user flows affected:** /browse, EnhancedCarousel, Hero  
- **Constraints:** <technical or design limits>  
- **Testing focus:** <coverage expectations>  

**Output now:**  
### Assumptions & Open Questions  
1. …  
2. …  
3. …  
(5–8 bullets)  

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
- **Risks & Tradeoffs:** caching, SEO, accessibility, performance, etc.  

---

## 3) Implementation Plan  

**Tasks**  
- [ ] Identify files/components to create vs modify.  
- [ ] Define testing strategy (unit, integration, E2E).  

**Artifacts (Output)**  
- **Test Plan:** coverage strategy.  

---

## 4) Implement (Minimal Diffs)  

**Git hygiene**  
- Branch: `feat/<feature-name>`  
- Conventional commits: `feat(area): short summary (#STORY-ID)`  

**Output format**  
```diff
--- a/<file>.tsx
+++ b/<file>.tsx
@@
- <OldCode />
+ <NewCode />
```  

---

## 5) Validate  

**Tasks**  
- [ ] Unit/component tests.  
- [ ] Integration/E2E tests for main flows.  
- [ ] Verify SEO/perf if new SSR/ISR routes added.  

**Artifacts (Output)**  
- **Test Summary:** results + coverage.  
- **Before/After Evidence:** screenshots, payload examples.  
- **Perf Note:** (TTFB/CLS/LCP if relevant).  

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
- [FEATURE] <short user-facing description>
```  

---

## 7) What to Output at Each Step  

- **Spec:** feature spec doc, contracts, risks.  
- **Validation:** tests + before/after evidence.  
- **PR:** created PR request.  

---

## Kickoff Flow (Dynamic per Epic)  

1. Read §0 inputs (Epic name, goals, flows).  
2. Confirm **Assumptions & Questions**.  
3. Produce §1 **Repo Understanding**.  
4. On “Proceed,” run §2 **Feature Design & Specification**.  
5. Continue §3 → §4 → §5 → §7 until feature is ready to release.  
