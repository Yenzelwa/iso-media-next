# claude-feature-template.md — Context-First Feature Playbook (Next.js)  

**Role:** You are a senior Next.js engineer.  
**Goal:** Safely design, implement, and release new features or enhancements to the **iso-media-next** UI frontend, which communicates with an external API for data.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:**  
- Incremental delivery  
- Minimal diffs per PR  
- Tests-first (TDD where possible)  
- Observability-first (logs, metrics, traces)  
- Document assumptions & risks early  
- Security Development Lifecycle (SDL) checks (threat model, SAST/SCA, secrets, privacy, accessibility)  
- Prompt engineering principle: break problems into smaller steps, use **task triples (Input → Expected Outcome → Validation)**, reference constraints explicitly  

**Context Reference:**  
Use the dynamic To-Do-List (`UI_todo_list.md`) as the **source of truth for Epic tasks**. Each Epic’s **Task Triple** must be copied here before planning.  

---

## 0) Inputs  

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
  - **Working branch:** `feat/<epic-slug>`  

- **Feature/Enhancement name:** `<Epic/Feature name>`  
- **Business goal:** `<Business problem or opportunity this feature addresses>`  
- **Primary user flows affected:** `<routes/pages/components impacted>`  

- **Constraints (explicit & enforced):**  
  - **Technical:** framework (Next.js, React), API boundaries, payment provider (Stripe), auth flows.  
  - **Design:** theme tokens, responsive breakpoints, accessibility (WCAG AA).  
  - **Operational:** release must be behind feature flag, rollback ready.  
  - **Security/Privacy:** no PII/PCI in logs, secrets in env vars only.  
  - **Testing:** ≥ 80% coverage on touched files, E2E for core flows, contract tests for APIs.  

- **Testing focus:** define scope (unit, integration, E2E) and critical paths.  

**Output now:**  
### Assumptions & Open Questions  
1. …  
2. …  
3. …  
(5–8 bullets)  

---

## 1) Repository Understanding (Context Map)  

- Which modules will be extended vs newly created.  
- Current **state management** and how this feature integrates.  
- Reuse potential for **components/hooks/utils** (e.g., shared `Modal`, `Button`, `Hero`).  

---

## 2) Feature Design & Specification

**Tasks**
- [ ] Restate the business problem in 2–3 lines.  
- [ ] Derive **acceptance criteria** from the Task triples (aggregate the “Expected Outcome” items).  
- [ ] UI contracts (mocks or placeholder components if missing).  
- [ ] Security/privacy considerations (e.g., payments, 2FA).

**Artifacts (Output)**
- **Feature Spec Doc:** goals, non-goals, UI contracts, acceptance criteria.  
- **Risks & Tradeoffs:** caching, SEO, accessibility, performance, payments.

---

## 3) Implementation Plan

**Approach: TDD-first + Small Batches**
- Follow **TDD (Red → Green → Refactor)** for each task:
  1) **Red:** write failing unit test that encodes the acceptance criterion.  
  2) **Green:** implement the minimal code to pass.  
  3) **Refactor:** remove duplication, improve naming, keep coverage.  
- Ship in **small, atomic PRs** (per component/feature flag) to ease review & rollback.

**Tasks**
- [ ] Map Epic tasks → list files/components to **modify** vs **create**.  
- [ ] Define **testing strategy** with explicit test cases per task (unit, integration, E2E).  
- [ ] Define **fixtures/mocks**:
  - API clients (stub external calls, e.g., Stripe, content service).  
  - Component fixtures (props variants, empty/edge data).  
  - Network errors/timeouts for resilience tests.  
- [ ] Define **contracts**:
  - Component contracts (props & events).  
  - API contracts (request/response schemas; add contract tests if possible).  
- [ ] Add **feature flags** for risky changes (e.g., `stripe_modal_enabled`).  
- [ ] Accessibility gates: keyboard nav, focus trap, ARIA roles for modals.  
- [ ] i18n readiness: no hardcoded strings; use translation keys.

**Observability (Logging/Tracing/Metrics)**
- [ ] Add **structured logging** with levels (`debug`, `info`, `warn`, `error`).  
- [ ] Include **correlation/request IDs** in logs for cross-service tracing.  
- [ ] Emit **metrics** (e.g., modal open rate, payment submit attempts/success).  
- [ ] Add **trace spans** around critical flows (e.g., “open_manage_plan_modal”, “submit_payment”).  
- [ ] Log PII-safely (no card data, tokens, or secrets).

**Security + SDL Activities**
- [ ] **Threat model** changes (data entry points, authN/Z, payments).  
- [ ] **Dependency scan** (SCA) + **SAST** run; fix high severity before merge.  
- [ ] Lint & type checks enforced in CI.  
- [ ] Secrets management review (env vars, API keys).  
- [ ] Privacy review if new data fields are collected.  
- [ ] Accessibility check (WCAG AA).

**Release Plan**
- [ ] Rollout strategy: behind **feature flag**, canary %, or staged deploy.  
- [ ] **Rollback plan:** clear toggle or revert path.  
- [ ] Migration steps (if any), idempotent & reversible.  
- [ ] Update **runbooks** and on-call alerts for new errors/metrics.

**CI/CD & Quality Gates**
- [ ] CI matrix: node versions, browsers for UI tests.  
- [ ] Gates: unit ≥ **80%** coverage on touched files; lint/typecheck pass; no high vulns.  
- [ ] Artifacts uploaded: coverage report, integration report, Lighthouse/perf note.

**Artifacts (Output)**
- **Implementation Checklist** (per file/component).  
- **Test Plan:** coverage strategy & tooling, explicit test cases per task.  
- **Observability Plan:** log/metric/trace fields & sampling rules.  
- **Release Plan:** flags, canary, rollback steps, runbook updates.


## 4) Implement (Minimal Diffs)

**Git hygiene**
- Branch: `feat/<epic-slug>`  
- Conventional commits: `feat(area): summary (#STORY-ID)` / `fix(area): summary (#STORY-ID)`

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
- [ ] Run accessibility & security checks.  
- [ ] Confirm observability: logs, metrics, traces appear in dashboards.  

**Artifacts (Output)**  
- **Test Summary:** results + coverage.  
- **Before/After Evidence:** screenshots, payload examples.  
- **Perf Note:** (TTFB/CLS/LCP if relevant).  
- **Observability Snapshot.**  

---


## 6) Documentation & PR

**PR Preparation**  
- Ensure **linked ticket/Epic** (`ISO-###`) is referenced in PR title/description.  
- PR should be **self-contained**: reviewer doesn’t need external context.  
- Add **screenshots/GIFs** for UI changes (before/after).  
- Attach **coverage report** (unit/integration).  
- Attach **E2E run summary** if flows affected.  
- Confirm **observability hooks** (logs/metrics/traces) are tested and visible in dashboards.  
- Add **security notes** if threat model changed (auth, payments, sensitive data).  
- Ensure **docs updated** (SSD.md, README, runbooks, API reference if affected).  

**PR Template (Expanded)**  
```markdown
## What
Implements <FEATURE>: <title>

## Why
Business problem: <summary>  
Epic: <link to Jira/epic>  

## How
- <key changes to components/files>
- <new/modified APIs or N/A if UI-only>
- Feature flag(s): <list> (default: off)

## Screenshots
| Before | After |
|--------|-------|
| <img src="before.png" width="300"/> | <img src="after.png" width="300"/> |

## Tests
- Unit: <list added/updated tests>
- Integration: <list flows tested>
- E2E: <list of end-to-end flows covered>
- Coverage: <link/report>

## Risk & Rollback
- Risk: <low/med/high> — <reason>
- Rollback: <disable feature flag / revert PR / rollback plan>

## Observability
- Logs: <new log fields, levels>
- Metrics: <new/modified counters/gauges>
- Traces: <new spans or attributes>
- Dashboards/alerts updated: <Y/N + link>

## Security/Compliance
- Threat model update: <summary>
- Secrets mgmt impact: <Y/N>
- PII/PCI handling: <Y/N + details>
- Accessibility check: <axe/Lighthouse score>

## Notes for Reviewers
- <assumptions, open questions, special considerations>
```

**Release Notes Snippet (Expanded)**  
```
- [FEATURE] <short user-facing description>
- [FIX] <bugfix description>
- [SECURITY] <security improvement>
```

**Artifacts (Output)**  
- **PR Link** (GitHub).  
- **Updated Documentation**:  
  - `Componemnt-SSD.md` (System Spec Doc) with component changes.  
  - `README.md` if setup/build changes.  
  - `Runbooks` updated for new monitoring/alerts.  
- **Reviewer Checklist** (a11y, i18n, security, logging).  
- **Release Notes Contribution** ready for changelog.


## 7) What to Output at Each Step

- **Spec (Feature Documentation)**  
    - Deliverable: - **Feature Spec Doc:** goals, non-goals, UI contracts, acceptance criteria.  
                    - **Risks & Tradeoffs:** caching, SEO, accessibility, performance, payments.
  - 📄 **Documentation artifact:** `Compenet-SSD.md` (System/Software Spec Doc) — update **Components Section**.

- **Validation (Unit + Evidence)**  
  - Deliverable: **Test Results & Evidence**  
  - Includes: unit & component test results, before/after screenshots, payload samples.  
  - 📊 **Test coverage report:** run with coverage target ≥ 80%.

- **Integration Testing (End-to-End Flows)**  
  - Deliverable: **Integration/E2E Test Results**  
  - Includes: full flows (e.g., Register → Plan Selection → Payment).  
  - 📂 **Artifact:** `integration-report.md` + screenshots or recordings.

- **PR (Pull Request for Review & Ship)**  
  - Deliverable: **Created PR Request**  
  - Must include: PR template fields (What, Why, How, Tests, Risks, Observability).  
  - 📎 **Output:** PR link (e.g., GitHub URL).

## Kickoff Flow (Dynamic per Epic)  

1. Import Epic tasks from `UI_todo_list.md`.  
2. Confirm **Assumptions & Questions** (§0).  
<!-- 3. Map repo context (§1).  
4. Write Feature Spec (§2).  
5. Plan with TDD, observability, SDL (§3).  
6. Implement minimal diffs (§4).  
7. Validate (§5).  
8. Document & PR (§6).  
9. Ship & update release notes.   -->

<!-- Using the claude-feature-template-constraints.md provided  , start at Step 1 by importing a Task  from UI_todo_list.md, then produce §0 Assumptions & Open Questions . -->