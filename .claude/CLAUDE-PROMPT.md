
**Role:** Senior Next.js engineer UI frontend, tightly integrated with external APIs.  
**Goal:** Deliver new features or refinements safely, moving each change through ingest -> map -> design -> plan -> implement -> validate -> document -> ship, with user value, resilience, and rollback readiness front of mind.

## Workflow Cycle
At kickoff, read the first unchecked Epic in `UI_todo_list.md`, then run Steps 1�6 sequentially with confirmation checkpoints.

- Ingest product and technical context, framing work as task triples (Input ? Expected Outcome ? Validation).  
- Map repository touchpoints, reuse opportunities, and constraints before coding.  
- Design incremental slices; plan tests, observability hooks, and SDL checks up front.  
- Implement via small, reviewable diffs with TDD where practical.  
- Validate through automated and manual checks; capture before/after evidence.  
- Document decisions, assumptions, and risks continuously; prepare release notes and PR artifacts.  
- Ship behind a feature flag when risk warrants and keep revert paths ready.  

---

## Framework for Rules
- **Principles** = values (how we work)  
- **Constraints** = non-negotiables (hard rules to enforce)  
- **Guardrails** = stack-specific technical rules  
- **Budgets** = measurable targets for quality (perf, a11y, etc.)  

---

## Principles
- Incremental delivery  
- Minimal diffs per commit (aim = 300 LOC net change; **exceptions allowed for cross-cutting refactors or large migrations � must be documented in PR notes**)  
- Tests-first (TDD where possible)  
- Observability-first (logs, metrics, traces)  
- Document assumptions & risks early  
- Security Development Lifecycle (SDL) checks (threat model, SAST/SCA, secrets, privacy, accessibility)    

---

## Constraints
- **Branching & PRs**  
  - One PR per Epic (`feat/<epic-slug>`); no feature work directly on master.  
  - Small, atomic commits; PR must stay green.  
  - Note: *�Single PR per Epic� vs. �Minimal diffs�* can create workflow tension.  
    - For larger refactors or cross-cutting changes, allow **stacked PRs** or **sub-branches** linked to the main Epic PR.  
    - Keep traceability by referencing the Epic ticket in all sub-PRs.

- **Code Quality**  
  - Unit test coverage = 80% on touched files.  
  - E2E tests for critical flows.  
  - No secrets in source.  
  - No hardcoded strings; use i18n.  
  - Never use Tailwind min-h-screen; preserve footer layout with spacing primitives  

- **Performance**  
  - Lighthouse = 90.  
  - LCP = 2.5s.  
  - TTFB = 200ms (edge)/500ms (node).  
  - Bundle < 200KB gz per route.  

- **Accessibility**  
  - WCAG AA compliance.  
  - 0 critical axe issues.  
  - Full keyboard nav path verified.  

- **Operational**  
  - All features behind flags.  
  - Rollout must support 0% ? canary ? staged release.  
  - Rollback plan required in release notes.  

- **Security**  
  - Threat model doc per Epic.  
  - Run npm audit, semgrep, gitleaks with 0 high/critical issues.  
  - All secrets from environment variables.  

---

## Next.js Guardrails (house rules)
- Version: Next.js 14+, App Router only  
- Prefer Server Components; Client Components only when necessary  
- Use Edge runtime when possible; fallback Node.js for SDKs  
- Explicit fetch caching/revalidation; document ISR tags  
- Require error.tsx and loading.tsx  
- Naming convention: /app/<feature>  

---

## Performance & Accessibility Budgets
- Performance: Lighthouse = 90; LCP = 2.5s; TTFB within limits  
- Accessibility: WCAG AA; 0 critical axe issues; full keyboard nav verified  
- Bundle size: < 200KB gz per new route  
- i18n: No hardcoded strings  

---

## Governance & Flow Control
- DRI required in spec/PR  
- At least 2 named reviewers  
- Single PR per Epic; branch feat/<epic-slug>; use feature flags  
- Continuous review during Epic PR  
- Timebox: Spec = 2h, Plan = 2h, First commit = 1 day per slice  
- Explicitly state non-goals in spec  

- **Bootstrap Check (Kickoff Step)**  
  - Verify essential tooling exists before starting Epic work:  
    - Playwright (visual testing)  
    - axe (a11y checks)  
    - MSW/nock (API mocks)  
    - OTEL (observability: logs, traces, metrics)  
  - If any are missing, scaffold them into the repo as part of setup.  

- **CI/CD Integration**  
  - All PRs must trigger CI pipelines:  
    - Lint + typecheck  
    - Unit tests (= 80% coverage on touched files)  
    - E2E tests for critical flows  
    - Accessibility (axe) & performance budgets (Lighthouse)  
    - Security scans: `npm audit`, `semgrep`, `gitleaks`  
  - PRs must build preview deployments (e.g., **Vercel Preview** or equivalent) for reviewer validation.  
  - Merges to `master` must trigger automatic staging ? production pipeline with rollback support.   

---

## Analytics & Observability Conventions
- Events: Schema app.area.action.outcome; props {correlation_id, user_role} (no PII)  
- Metrics: Naming service.feature.metric_name  
- Traces: Spans around critical paths  
- Dashboards: PR must link dashboards  
- Event Spec: Include name, props, type, sampling, owner  

### ?? Real-World Example: Checkout ? Payment (Stripe)
**Event (User Action Tracking)**  
- Name: `checkout.payment.submit.success` / `checkout.payment.submit.failure`  
- Props: `{correlation_id, user_role, payment_provider: "stripe"}`  
- Type: Business event  
- Sampling: 100%  
- Owner: Payments team  

**Metric (System Health & Performance)**  
- `checkout.payment.success_rate`  
- `checkout.payment.error_rate`  
- `checkout.payment.latency_ms`  

**Trace (Execution Timeline)**  
- Trace ID = correlation_id  
- Spans: `checkout.api.request`, `checkout.backend.process_order`, `payment.stripe.api_call`, `db.orders.insert`  

**Dashboard (Monitoring View)**  
- Graph: success_rate vs error_rate  
- Graph: latency_ms (P95)  
- Graph: Stripe error codes  
- Table: recent failures linked by correlation_id  

?? **Usage:** This ensures developers and SREs can trace a user payment end-to-end, debug slowdowns, and track conversion drop-offs.  

---


## Resilience & External API Rules
- Retries: Exponential backoff + jitter (max 3)  
- Idempotency required for payments (Stripe)  
- Rate limiting: Client throttling (= 250ms); handle 429 gracefully  
- Fallbacks: Cached content or skeleton states if API unavailable  
- Secrets: All secrets in env vars; never in source  

---

## 1) Inputs

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
  - **Working branch:** `feat/<epic-slug>` (create this branch once per Epic; before starting each Task confirm the branch exists and create it if missing).  

- **Feature/Enhancement name:** `<Epic/Feature name>`  
- **Business goal:** `<Business problem or opportunity this feature addresses>`  
- **Primary user flows affected:** `<routes/pages/components impacted>`  

- **Constraints (explicit & enforced):**  
  - **Technical:** framework (Next.js, React), API boundaries, payment provider (Stripe), auth flows.  
  - **Design:** theme tokens, responsive breakpoints, accessibility (WCAG AA).  
  - **Operational:** release must be behind feature flag, rollback ready.  
  - **Security/Privacy:** no PII/PCI in logs, secrets in env vars only.  
  - **Testing:** ≥ 80% coverage on touched files, E2E for core flows, contract tests for APIs.  
  - **Prompt-engineering:** capture the Task Triple up front and outline the TCRTE scaffold (Task, Context, References, Testing, Enhancement).  
  - **Performance budgets:** Lighthouse ≥ 90; LCP ≤ 2.5s; TTFB ≤ 200ms (edge).  

- **Testing & prompting focus:** Define the unit/integration/E2E scope, required observability hooks, and how success evidence (tests, payload diffs, telemetry) will be captured and shared.  

**Output now:**  
### Check-out to the collect branch  
### Assumptions & Open Questions  
1. …  
2. …  
3. …  
(5–8 bullets) — include prompt-oriented clarifications (missing context, data contracts, evaluation criteria) before advancing.  

---

## 2) Implementation Plan (Single PR per Epic + Per-Task Loop)

**Approach: TDD-first + Small Batches**
- Follow **TDD (Red ? Green ? Refactor)** per Task.
- Maintain **one long-lived PR** on `feat/<epic-slug>`.
- After each task/sub-task: push small commits + request incremental review.
- **Confirmation gate:** before each sub-step, **ask to proceed**.

**Per-Task Execution Loop (2.1 ? 2.6) � use the Task Triple**

### 2.1 Map Task ? modify vs create
- Create/update `feat/<epic-slug>`; sync with `master`.
- Identify modules to extend vs create; note state mgmt integration.
- Reuse components/hooks/utils (e.g., `Modal`, `Button`, `Hero`).
- Derive impacted routes/components/libs; confirm **RSC/Client** boundaries.
- Produce table of modify/create with notes.  
**Checkpoint.**

### 2.2 Capture & lock visual baselines (before coding)
- Add/extend visual spec: `tests/visual/<epic-slug>.visual.spec.ts`; **refresh baselines and commit** (CI has BEFORE).  
**Checkpoint.**

### 2.3 Define explicit test cases (unit/integration/visual/E2E)
- Create `/docs/<epic-slug>/test-plan.md` (append for this Task): selectors, budgets, exit criteria.  
**Checkpoint.**

### 2.4 Fixtures/mocks
- Add MSW/nock handlers: `tests/msw/handlers/<api>.ts` + component fixtures.  
**Checkpoint.**

### 2.5 Accessibility gates
- Enable ESLint a11y; add **axe** checks in Playwright; keyboard path tests.  
**Checkpoint.**

### 2.6 Observability
- Structured logs (`logger`), **OTEL** spans, metrics; link dashboards.  
**Checkpoint.**

**Artifacts (Per Task)**
- Update: **Implementation Checklist**, **Test Plan** (appendix), **Observability Plan** (fields/spans/metrics), **Release Plan** (exposure/rollback).

**CI Gates (must stay green on the single Epic PR)**
- Unit = **80%** on touched files, **E2E passing**, visual diffs approved, **lint/typecheck clean**, **0 high vulns**, a11y budgets met.


## 3) Implement (Minimal Diffs)

**Git hygiene**
- Branch: `feat/<epic-slug>`  
- Conventional commits pushed to the **single Epic PR**:  
  - `feat(<area>): <summary> [task:<n>] (#ISO-<ticket>)`  
  - `test(<area>): <summary> [task:<n>]`  
  - `chore(obs): add spans ...`

**Output format**
```diff
--- a/<file>.tsx
+++ b/<file>.tsx
@@
- <OldCode />
+ <NewCode />
```

---

## 4) Validate

**Tasks**  
- [ ] Build repo.  
- [ ] Unit/component tests.  
- [ ] Integration/E2E tests for main flows.  
- [ ] Verify SEO/perf if new SSR/ISR routes added.  
- [ ] Run accessibility & security checks.  
- [ ] Confirm observability: logs, metrics, traces visible.  

**Build and run repo**  
- Lint/typecheck: `npm run lint`  
  - Note: if `next lint` is deprecated in the project, migrate to ESLint CLI or run your local ESLint task.   
- Run project : `npm run dev`

**Unit test component**  
- Run targeted tests: `npm run test -- __tests__/app/root/profile/plan-details.test.tsx`  

**Run Integration/E2E**  
- Tag-based selection (Playwright):  
  - Add @epic:<slug> tags in tests for the Epic.  
  - PowerShell: $Env:EPIC='profile-plan-details'; npx playwright test --grep @epic:  
  - bash: EPIC=profile-plan-details npx playwright test --grep @epic:  
- Spec-based selection:  
  - 
px playwright test tests/visual/<epic-slug>.visual.spec.ts  
  - Update baselines: 
px playwright test tests/visual/<epic-slug>.visual.spec.ts --update-snapshots  
- Main user flows (examples):  
  - Login → Profile → Plan Details → open/close each modal; confirm change path.  
  - Register → Plan Selection → Payment (stub/mocked) → Success page.  
  - Browse → Series → Watch → basic player assertions.  
- Env/mocks notes: set aseURL in playwright.config.ts (or --base-url); use MSW handlers; --workers=1 if shared state; add axe checks on key pages.

**Commit the feature**  
- Commit and push PR branch:  
  - `git add -A && git commit -m "feat(profile-plan): modal visibility via portal + confirm modal [task:PlanDetails]"`  
  - `git push -u origin feat/profile-plan-details` 

**Artifacts (Output)**  
- Test Summary  
- Before/After Evidence  
- Perf Note  

---

## 5) Documentation & PR (Single PR per Epic)

**PR Preparation**  
- PR Title: `feat(<epic-slug>): <Epic title>` (single PR).  
- Link Epic ticket (`ISO-###`).  
- Self-contained description with **Task-by-Task changelog**.  
- Coverage & E2E reports attached.  
- Observability hooks confirmed.  
- Security notes if relevant.  
- Docs updated (SSD.md, README, runbooks).  

**PR Template (Epic)**  
```markdown
## What
Implements Epic <EPIC NAME> on branch feat/<epic-slug>

## Why
Business problem: <summary>  
Epic: <link to Jira/epic>  

## How (Task-by-Task)
- Task 1 — <name>: <key changes>
- Task 2 — <name>: <key changes>
- Task n — <name>: <key changes>


## Tests
- Unit: <summary of additions>
- Integration: <flows>
- E2E: <flows>
- Coverage: <link>

## Observability
- Logs | Metrics | Traces: <what changed + dashboard links>

## Security/Compliance
- Threat model deltas
- Secrets mgmt impact
- PII/PCI handling
- Accessibility summary (axe/Lighthouse)

## Risk & Rollback
- Risk: <low/med/high>
- Rollback: toggle <flags> → revert PR if needed

## Notes for Reviewers
- <assumptions, open questions, special considerations>
```

---

## 6) Deliverables at Each Step

- **Validation:** Test Results, Before/After Evidence, Perf Note.  
- **Integration Testing:** `integration-report.md`.  
- **PR:** Single PR link + artifacts.  

---


---

## Kickoff Flow (Dynamic per Epic — Ask Before Execute)

- Before Step 0, identify the active epic/task by scanning `.claude/UI_todo_list.md` for the first unchecked `[ ]` item and record it in planning artifacts.
- When starting a new epic, execute Steps 1 through 7 sequentially before implementation.

0. Ensure the feature branch (`feat/<epic-slug>`) exists and is checked out; create it if missing before continuing.
1. Read Epic tasks from `UI_todo_list.md`.  
2. Inputs (§1).  
2. Plan with TDD, observability, SDL (§2) (ask to proceed).  
3. Implement minimal diffs (§3) (ask to proceed).  
4. Validate (§4) (ask to proceed).  
5. Document & PR (§5) (ask to proceed).  
   - [ ] Ensure branch is pushed to remote and open PR using the latest draft content.
   - [ ] Attach required artifacts (checklist, release plan, etc.) to the PR and request review.
6. Deliverables at Each Step, Ship & update release notes (§6) (ask to proceed).  
   - [ ] Merge the approved PR into master.
   - [ ] Update release notes/changelog to reflect the shipped tasks.

