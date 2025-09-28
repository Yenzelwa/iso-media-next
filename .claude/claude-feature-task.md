# claude-feature-template.md — Context-First Feature Playbook (Next.js)

**Role:** You are a senior Next.js engineer.  
**Goal:** Safely design, implement, and release new features or enhancements to the **iso-media-next** UI frontend, which communicates with an external API for data.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:** Incremental delivery, minimal diffs per PR, tests-first, call out assumptions & risks.

---

## 0) Inputs

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (target: `master`)  
  - **Working branch:** `feat/<epic-slug>` (create via `git checkout -b feat/<epic-slug>`)

- **Epic summary**
  - **Epic name:** `<Epic/Feature name>`  
  - **Epic key / link (optional):** `<ISO-###>`  
  - **Business goal (1–2 lines):** `<Extract from Epic>`  
  - **Primary user flows affected:** `<routes/pages/components>`

- **Epic Tasks (Jira-style)** — copy from your Epic To-Do list and normalize. For each task, fill the triple: **Input → Expected Outcome → Validation**.
  - **Task [1]:** `<short imperative title>` *(Jira ID: optional)*  
    - **Input:** `<what triggers or is present>`  
    - **Expected outcome:** `<the desired behavior/UI state>`  
    - **Validation:** `<how we prove it works>`  
  - **Task [2]:** …  
  - **Task [N]:** …

- **Constraints:** `<path/to/constraints.md or list constraints here>`  
  *(e.g., UI theme tokens, API rate limits, Stripe/Payments rules, accessibility targets)*

- **Testing focus:** `<coverage goals & scope>`  
  *(e.g., unit: components; integration: modals + payments; E2E: register → plan → payment; coverage ≥ 80% for touched files)*

### Assumptions & Open Questions (5–8 bullets)
1. …  
2. …  
3. …  
4. …  
5. …

---

## How to Fill §0 Inputs

1. **Import the Epic:** Paste the Epic title and all tasks.  
2. **Normalize each task:** Rewrite titles as **imperative, one-line** statements (≤ 12 words).  
3. **Complete the triple:** For every task add **Input / Expected Outcome / Validation** (≤ 1 line each).  
4. **Map constraints:** Link or list any **design tokens, API contracts, payments rules**.  
5. **Define testing focus:** Note **unit/integration/E2E** and target coverage.  
6. **Record assumptions/questions:** List unknowns that could change scope or risk.

---

## 1) Repository Understanding (Context Map)

- Modules to **extend** vs **create new**.  
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
- [ ] Unit/component tests pass.  
- [ ] Integration/E2E for the **critical flows**.  
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

- **Spec (Feature Documentation)**  
  - Deliverable: - **Feature Spec Doc:** goals, non-goals, UI contracts, acceptance criteria.  
                 - **Risks & Tradeoffs:** caching, SEO, accessibility, performance, payments.
  
  - Includes: problem statement, goals, non-goals, UI contracts, acceptance criteria, risks.  
  - 📄 **Documentation artifact:** `<component-name> - SSD.md` (System/Software Spec Doc) — update **Components Section**.

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
  - 📎 **Output:** PR link (e.g., GitHub/GitLab URL).


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
