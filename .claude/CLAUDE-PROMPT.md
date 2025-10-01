# Context-First Feature Playbook (Next.js)

**Role:** Senior Next.js engineer UI frontend, tightly integrated with external APIs.  
**Goal:** Deliver new features or refinements safely, moving each change through ingest -> map -> design -> plan -> implement -> validate -> document -> ship, with user value, resilience, and rollback readiness front of mind.

**Operating Rhythm:**
- Ingest product and technical context, framing work as task triples (Input -> Expected Outcome -> Validation).
- Map repository touchpoints, reuse opportunities, and constraints before coding.
- Design incremental slices; plan tests, observability hooks, and SDL checks up front.
- Implement via small, reviewable diffs with TDD where practical.
- Validate through automated and manual checks; capture before/after evidence.
- Document decisions, assumptions, and risks continuously; prepare release notes and PR artifacts.
- Ship behind a feature flag when risk warrants and keep revert paths ready.

**Principles:**
- Incremental delivery
- Minimal diffs per commit (aim ≤ 300 LOC net change)
- Tests-first (TDD where possible)
- Observability-first (logs, metrics, traces)
- Document assumptions & risks early
- Security Development Lifecycle (SDL) checks (threat model, SAST/SCA, secrets, privacy, accessibility)
- Prompt engineering principle: break problems into smaller steps, use **Task Triple (Input + Expected Outcome + Validation)**, reference constraints explicitly

**Context Reference:**  
Use the dynamic To-Do-List (`UI_todo_list.md`) as the **source of truth for Epic tasks**. Each Epic’s **Task Triple** must be copied here before planning.  

---

## Next.js Guardrails

- **Version:** Next.js 14+, **App Router** only.  
- **Component Boundaries:** Prefer **Server Components**; use Client Components only when necessary for interactivity.  
- **Runtime Targets:** Use **Edge** runtime for low-latency read-only flows; fallback to **Node.js runtime** for SDKs needing Node APIs.  
- **Data & Caching:** Explicit `fetch` caching/revalidation; document ISR tags and invalidation.  
- **Error & Loading UI:** Require `error.tsx`, `loading.tsx`, and skeletons for routes.  
- **Naming:** New routes/components must follow folder/file naming convention (`/app/<feature>`).

---

## Performance & Accessibility Budgets

- **Performance:** Lighthouse ≥ 90; LCP ≤ 2.5s; TTFB ≤ 200ms (edge) / 500ms (node).  
- **Accessibility:** WCAG AA; 0 critical axe issues; full keyboard nav path verified.  
- **Bundle size:** New routes < 200KB gz client JS; attach bundle analyzer diff.  
- **i18n:** No hardcoded strings; use translation keys.  

---

## Governance & Flow Control

- **Directly Responsible Individual (DRI):** Required in spec/PR.  
- **Approvers:** At least 2 named reviewers.  
- **PR policy (Single PR per Epic):** Create **one PR** per Epic. Branch name: `feat/<epic-slug>`. Push **small, atomic commits** for each task and sub-task; keep the PR open and incremental until the Epic is complete. Use feature flag(s) to keep unfinished slices dark.  
- **Review cadence:** Continuous review on the open Epic PR; reviewers requested after each significant task completes.  
- **Epic workflow timebox:** Spec ≤ 2h, Plan ≤ 2h, First commit ≤ 1 day per task slice.  
- **Non-Goals:** Each feature spec must declare what is *explicitly not being delivered*.

---

## Analytics & Observability Conventions

- **Events:** Use schema `app.area.action.outcome`; include `{ correlation_id, user_role }`. No PII.  
- **Metrics:** Counter/gauge names must follow `service.feature.metric_name`.  
- **Traces:** Spans around critical paths (e.g., `open_manage_plan_modal`, `submit_payment`).  
- **Dashboards:** PR must link to dashboards showing logs/metrics/traces.  
- **Event Spec:** Include name, props, type (UI/Business), sampling, owner.  

---

## Resilience & External API Rules

- **Retries:** Exponential backoff + jitter (max 3).  
- **Idempotency:** Required for payments (Stripe).  
- **Rate limiting:** Client throttling (≥ 250ms), handle server 429.  
- **Fallbacks:** Cached content or skeleton states if API unavailable.  
- **Secrets:** All secrets in env vars; never in source.  

---

## Experimentation

- **Feature flag as experiment key.**  
- Must define: sample %, primary success metric, stop criteria, and decision date.  
- Default rollout: 0% → canary → staged deploy.  

---

## 0) Inputs

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

- **Testing & prompting focus:** Define the unit/integration/E2E scope, required observability hooks, and how success evidence (tests, screenshots, payload diffs, telemetry) will be captured and shared.  

**Output now:**  
### Check-out to the collect branch  
### Assumptions & Open Questions  
1. …  
2. …  
3. …  
(5–8 bullets) — include prompt-oriented clarifications (missing context, data contracts, evaluation criteria) before advancing.  

---

## 1) Repository Understanding (Context Map)

- Which modules will be extended vs newly created.  
- Current **state management** and how this feature integrates.  
- Reuse potential for **components/hooks/utils** (e.g., shared `Modal`, `Button`, `Hero`).  

---

## 2) Feature Design & Specification

**Tasks**
- [ ] **Use the Component SSD template** to either update the existing SSD or create a new one for the relevant module. Every feature task must be linked to an SSD.  
- [ ] Restate the business problem in 2–3 lines and show the link to the **Task Triple** (Input → Expected Outcome → Validation).  
- [ ] Derive **acceptance criteria** with measurable outcomes.  
- [ ] Define **UI contracts** (mocks, component props/states, responsive behavior) and reference design tokens/breakpoints.  
- [ ] Document **security/privacy and data-handling considerations.**  
- [ ] Decide **observability/evaluation plan** with metrics/logs/tests.  

---

**Artifacts (Output)**
- **Component/System SSD (must follow this template):**

### [Component / System Name] SSD

1. **Purpose**  
Describe the primary purpose of the component/system.  
Example: Provide the discovery surface for users, featuring hero content, curated carousels, and navigation touchpoints introducing catalog items.

2. **Ownership & Stakeholders**  
- Product: [Product owner or squad]  
- Design: [Design/UX team]  
- Engineering: [Engineering team(s)]  
- QA: [Quality assurance team]  

3. **Component Map**  
[List main file paths and structures.]  
- [Entry file path]  
- [Core component files]  
- [Supporting shared components/assets]  
- [API integration paths]  

4. **Responsibilities**  
[Summarize what the component/system does:]  
- [Responsibility 1]  
- [Responsibility 2]  
- [Responsibility 3]  

5. **Data Flow**  
[Outline how data moves through the system.]  
- [Trigger → Fetch/Load process]  
- [Normalization/State handling]  
- [Data passed to subcomponents]  
- [Transformations/Filters/Styling applied]  

6. **Dependencies**  
- [Core APIs/libraries used]  
- [Shared components and utilities]  
- [Styling/theme dependencies]  
- [State management or framework specifics]  

7. **Theming & Styling**  
[Describe theming rules, tokens, and styling consistency:]  
- [Background styles/tokens]  
- [Overlay/gradient rules]  
- [Contrast/WCAG validation requirements]  
- [Typography and spacing alignment]  

8. **Accessibility & UX**  
[Accessibility and user experience requirements:]  
- [Keyboard navigation]  
- [Alt text / descriptive labels]  
- [ARIA and live messaging]  

9. **Testing Strategy**  
- Automated Tests: [Unit/integration test coverage]  
- Component Tests: [Specific component test files]  
- Manual QA: [Cross-browser/device checks, visual QA]  

10. **Observability**  
- [Error handling strategy]  
- [Logging and monitoring tools]  
- [Future observability enhancements]  

11. **Roadmap & To-Do**  
- [Upcoming refactors]  
- [Feature enhancements]  
- [Performance/UX improvements]  
- [Analytics instrumentation]  

12. **Related Documentation**  
- [Link to high-level SSD]  
- [Link to API contracts/specs]  
- [Links to related component/module SSDs]  

---

- **Feature Spec Doc:** goals, non-goals, TCRTE frame, UI contracts, acceptance criteria, validation plan.  
- **Risks & Tradeoffs Doc:** caching, SEO, accessibility, performance, payments, API resilience, AI/prompt-related risks.  



## 3) Implementation Plan (Single PR per Epic + Per-Task Loop)

**Approach: TDD-first + Small Batches**
- Follow **TDD (Red → Green → Refactor)** for each **Task** inside the Epic.  
- Keep **one long-lived PR** open for the Epic on branch `feat/<epic-slug>`.  
- After each task or sub-task completes, push commits and request incremental review.  
- **Confirmation gate:** Before executing *any* sub-step, **ask the user to proceed**.

**Per-Task Execution Loop (repeat for every Task in the Epic)**
For each Task (use your Task Triple), perform **3.1 → 3.11**, asking for confirmation before executing each numbered step:

### 3.1 Map Task → list files/components to **modify** vs **create**
- Create/update branch `feat/<epic-slug>`; sync with `master`.  
- Derive impacted routes/components/libs; confirm RSC/Client boundaries.  
- Produce a table of modify/create with notes.  
**Checkpoint:** Ask to proceed.

### 3.2 Capture baseline screenshots **before coding**
- Run app; fix viewport/theme; take programmatic Playwright screenshots to `docs/screenshots/before/<epic-slug>-<task>.png`.  
**Checkpoint:** Ask to proceed.

### 3.3 Update Playwright visual baselines
- Add/extend visual tests under `tests/visual/<epic-slug>.visual.spec.ts`; refresh baselines and commit.  
**Checkpoint:** Ask to proceed.

### 3.4 Define explicit test case lists (unit, integration, visual, E2E)
- Create `/docs/<epic-slug>/test-plan.md` (append a section for this Task) with selectors and budgets.  
**Checkpoint:** Ask to proceed.

### 3.5 Define fixtures/mocks for APIs & components
- Add MSW/nock handlers in `tests/msw/handlers/<api>.ts` and component fixtures.  
**Checkpoint:** Ask to proceed.

### 3.6 Add/confirm feature flags (if applicable)
- Implement `lib/flags.ts` with `<feature_flag_name>`; test on/off.  
**Checkpoint:** Ask to proceed.

### 3.7 Enforce accessibility gates
- ESLint a11y, axe in Playwright, keyboard path tests.  
**Checkpoint:** Ask to proceed.

### 3.8 Implement observability logging/metrics/tracing
- Structured logs (`logger`), OTEL spans, metrics; link dashboards.  
**Checkpoint:** Ask to proceed.

### 3.9 Run SDL checks (threat model, SAST/SCA, secrets)
- Threat model doc, `npm audit`, `semgrep`, `gitleaks`, lint/types.  
**Checkpoint:** Ask to proceed.

### 3.10 Confirm privacy & security reviews
- `/docs/<epic-slug>/privacy-review.md`; tag reviewers for sign-off.  
**Checkpoint:** Ask to proceed.

### 3.11 Rollout behind feature flag with rollback plan
- Keep production dark until Epic complete or slice safe to expose; use canary; document rollback.  
**Checkpoint:** Ask to proceed.

**Artifacts (Per Task)**
- Update **Implementation Checklist**, **Test Plan** (appendix per task), **Observability Plan** (fields/spans/metrics), **Release Plan** (exposure/rollback for this slice), and **Screenshot Pack**.

**CI Gates (must stay green on the single Epic PR)**
- Unit ≥ 80% on touched files, E2E passing, visual diffs approved, lint/typecheck clean, 0 high vulns, a11y budgets met.

---

## 4) Implement (Minimal Diffs)

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

## 5) Validate

**Tasks**  
- [ ] Unit/component tests.  
- [ ] Integration/E2E tests for main flows.  
- [ ] Verify SEO/perf if new SSR/ISR routes added.  
- [ ] Run accessibility & security checks.  
- [ ] Confirm observability: logs, metrics, traces visible.  

**Artifacts (Output)**  
- Test Summary  
- Before/After Evidence  
- Perf Note  
- Observability Snapshot  

---

## 6) Documentation & PR (Single PR per Epic)

**PR Preparation**  
- PR Title: `feat(<epic-slug>): <Epic title>` (single PR).  
- Link Epic ticket (`ISO-###`).  
- Self-contained description with **Task-by-Task changelog**.  
- Screenshots/GIFs for UI changes (before/after per task).  
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

## Screenshots
<per-task before/after table or links>

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

## 7) Deliverables at Each Step

- **Spec:** Feature Spec Doc + Risks & Tradeoffs.  
- **Validation:** Test Results, Before/After Evidence, Perf Note.  
- **Integration Testing:** `integration-report.md`.  
- **PR:** Single PR link + artifacts.  

---

## Kickoff Flow (Dynamic per Epic — Ask Before Execute)

For each step, **pause and ask the user to confirm before executing the task**.

0. Ensure the feature branch (`feat/<epic-slug>`) exists and is checked out; create it if missing before continuing.
1. Read Epic tasks from `UI_todo_list.md`.  
2. Inputs (§0) (ask to proceed).  
3. Map repo context (§1) (ask to proceed).  
4. Write Feature Spec (§2) (ask to proceed).  
5. Plan with TDD, observability, SDL (§3) (ask to proceed).  
6. Implement minimal diffs (§4) (ask to proceed).  
7. Validate (§5) (ask to proceed).  
8. Document & PR (§6) (ask to proceed).  
9. Ship & update release notes (ask to proceed).  



