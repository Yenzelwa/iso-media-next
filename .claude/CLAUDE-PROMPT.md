# Next.js UI Feature Workflow (MD)

**Role:** Senior Next.js engineer UI frontend, tightly integrated with external APIs.  
**Goal:** Deliver new features or refinements safely, moving each change through ingest → map → design → plan → implement → validate → document → ship, with user value, resilience, and rollback readiness front of mind.

## Workflow Cycle
At kickoff, read the first unchecked Epic in `UI_todo_list.md`, then run Steps 1–6 sequentially with confirmation checkpoints.

- Ingest product and technical context, framing work as task triples (Input → Expected Outcome → Validation).  
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
- Minimal diffs per commit (aim = 300 LOC net change; **exceptions allowed for cross-cutting refactors or large migrations — must be documented in PR notes**)  
- Tests-first (TDD where possible)  
- Observability-first (logs, metrics, traces)  
- Document assumptions & risks early  
- Security Development Lifecycle (SDL) checks (threat model, SAST/SCA, secrets, privacy, accessibility)    

---

## Constraints
- **Branching & PRs**  
  - Always create a new branch for every new Epic/feature before making any changes.  
  - One PR per Epic (`feat/<epic-slug>`); no feature work directly on master.  
  - Small, atomic commits; PR must stay green.  
  - Note: *"Single PR per Epic" vs. "Minimal diffs"* can create workflow tension.  
    - For larger refactors or cross-cutting changes, allow **stacked PRs** or **sub-branches** linked to the main Epic PR.  
    - Keep traceability by referencing the Epic ticket in all sub-PRs.

- **Code Quality**  
  - Unit test coverage = 80% on touched files.  
  - E2E tests for critical flows.  
  - No secrets in source.  
  - No hardcoded strings; use i18n.  
  - Never use Tailwind `min-h-screen`; preserve footer layout with spacing primitives  

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
  - Rollout must support 0% → canary → staged release.  
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
- Require `error.tsx` and `loading.tsx`  
- Naming convention: `/app/<feature>`  

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
- Single PR per Epic; branch `feat/<epic-slug>`; use feature flags  
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
  - Next.js monorepo/multi-lockfile tip: if you see workspace root warnings, set `outputFileTracingRoot: path.join(__dirname)` in `next.config.js` to silence false positives.

- **CI/CD Integration**  
  - All PRs must trigger CI pipelines:  
    - Lint + typecheck  
    - Unit tests (= 80% coverage on touched files)  
    - E2E tests for critical flows  
    - Accessibility (axe) & performance budgets (Lighthouse)  
    - Security scans: `npm audit`, `semgrep`, `gitleaks`  
  - PRs must build preview deployments (e.g., **Vercel Preview** or equivalent) for reviewer validation.  
  - Merges to `master` must trigger automatic staging → production pipeline with rollback support.   

---

## Analytics & Observability Conventions
- Events: Schema `app.area.action.outcome`; props `{correlation_id, user_role}` (no PII)  
- Metrics: Naming `service.feature.metric_name`  
- Traces: Spans around critical paths  
- Dashboards: PR must link dashboards  
- Event Spec: Include name, props, type, sampling, owner  

### 📌 Real-World Example: Checkout → Payment (Stripe)
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
- Trace ID = `correlation_id`  
- Spans: `checkout.api.request`, `checkout.backend.process_order`, `payment.stripe.api_call`, `db.orders.insert`  

**Dashboard (Monitoring View)**  
- Graph: success_rate vs error_rate  
- Graph: latency_ms (P95)  
- Graph: Stripe error codes  
- Table: recent failures linked by correlation_id  

**Usage:** This ensures developers and SREs can trace a user payment end-to-end, debug slowdowns, and track conversion drop-offs.  

---

## Resilience & External API Rules
- Retries: Exponential backoff + jitter (max 3)  
- Idempotency required for payments (Stripe)  
- Rate limiting: Client throttling (≥ 250ms); handle 429 gracefully  
- Fallbacks: Cached content or skeleton states if API unavailable  
- Secrets: All secrets in env vars; never in source  

---

## 1) Inputs

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
  - **Working branch:** `feat/<epic-slug>` (always create this branch at the start of a new Epic/feature—before any changes; for large epics you may also use `feat/<epic-slug>/<task-slug>` sub-branches).  

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
- Follow **TDD (Red → Green → Refactor)** per Task.
- Maintain **one long-lived PR** on `feat/<epic-slug>`.
- After each task/sub-task: push small commits + request incremental review.
- **Confirmation gate:** before each sub-step, **ask to proceed**.

**Per-Task Execution Loop (2.1 → 2.6) — use the Task Triple**

### 2.1 Map Task → modify vs create
- Create/update `feat/<epic-slug>`; sync with `master`.
- Identify modules to extend vs create; note state mgmt integration.
- Reuse components/hooks/utils (e.g., `Modal`, `Button`, `Hero`).
- Derive impacted routes/components/libs; confirm **RSC/Client** boundaries.
- Produce table of modify/create with notes.  
**Checkpoint**: **ask to proceed**

### 2.2 Fixtures / Mocks (MSW or Nock)
Add API mocks and component/data fixtures so features can be implemented and validated without live backends.

- **Add MSW/nock handlers:** `tests/msw/handlers/<api>.ts` + component fixtures.  

**Step-by-step**

#### 0) Install (dev)
```bash
npm i -D msw @types/node
# Choose your test stack:
# Jest:
npm i -D jest ts-jest @testing-library/react @testing-library/jest-dom whatwg-fetch
# Vitest:
npm i -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

#### 1) File layout
```
tests/
  msw/
    handlers/
      <feature>.ts       # e.g., profile.ts
    server.ts            # Node test server
  setupTests.ts          # global test hooks
  fixtures/
    <feature>.ts         # component/data fixtures
src/
  lib/
    api/<feature>.ts     # API client (fetch)
```

#### 2) Create handlers
**`tests/msw/handlers/<feature>.ts`**
```ts
import { http, HttpResponse, delay } from 'msw';

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.test';

export const <feature>Handlers = [
  // Example: PATCH /v1/profile/phone
  http.patch(`${BASE}/v1/profile/phone`, async ({ request }) => {
    const body = (await request.json()) as { phone: string };
    if (!/^\+?[1-9]\d{6,14}$/.test(body.phone)) {
      return HttpResponse.json(
        { error: { code: 'INVALID_PHONE', field: 'phone' } },
        { status: 400 }
      );
    }
    await delay(150);
    return HttpResponse.json({ phone: body.phone }, { status: 200 });
  }),
];
```

#### 3) Start the MSW server (Node tests)
**`tests/msw/server.ts`**
```ts
import { setupServer } from 'msw/node';
import { <feature>Handlers } from './handlers/<feature>';

export const server = setupServer(...<feature>Handlers);
```

#### 4) Global test hooks
**`tests/setupTests.ts`**
```ts
import { server } from './msw/server';
import '@testing-library/jest-dom';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// If your code uses fetch in Node + Jest, ensure a polyfill:
// import 'whatwg-fetch';
```
Note: During early adoption across a large suite, consider `server.listen({ onUnhandledRequest: 'bypass' })` to reduce noise; tighten back to `'error'` once handlers cover the calls.

#### 5) Wire the test runner

**Jest — `jest.config.ts`**
```ts
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
};

export default config;
```

**Vitest — `vitest.config.ts`**
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setupTests.ts'],
  },
});
```
Test environment guidance
- Component/DOM tests: use `jsdom`; avoid a global fetch polyfill if components offer offline fallbacks, or add `whatwg-fetch` where real fetch semantics are required.
- Node integration tests (MSW node): use Jest `testEnvironment: 'node'` and a Node HTTP client (e.g., axios). Target URLs like `http://localhost/api/...` so MSW node intercepts them.
- For in-app Next.js routes (`/api/...`), prefer regex matchers with MSW (e.g., `/\\/api\\/security$/`) or wildcard origins (`'*/api/security'`) to work across envs.

#### 6) Minimal API client (so handlers intercept real calls)
**`src/lib/api/<feature>.ts`**
```ts
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.example.test';

export async function patchPhone(payload: { phone: string }, token: string) {
  const res = await fetch(`${BASE}/v1/profile/phone`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error('Request failed'), { status: res.status, data: err });
  }
  return (await res.json()) as { phone: string };
}
```

#### 7) Component/data fixtures
**`tests/fixtures/<feature>.ts`**
```ts
export const validPhone = '+27123456789';
export const invalidPhone = '07-abc-123';
export const authToken = 'test-token';
```

#### 8) Example test usage (override handlers per test if needed)
```ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../msw/server';
import { validPhone, invalidPhone } from '../fixtures/<feature>';

test('shows server-side validation error for bad phone', async () => {
  render(<YourComponent />);
  fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: invalidPhone } });
  fireEvent.click(screen.getByRole('button', { name: /save/i }));

  server.use(
    http.patch(/\/v1\/profile\/phone$/, () =>
      HttpResponse.json({ error: { code: 'INVALID_PHONE', field: 'phone' } }, { status: 400 })
    )
  );

  expect(await screen.findByText(/invalid phone/i)).toBeInTheDocument();
});

test('calls API and shows success', async () => {
  render(<YourComponent />);
  fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: validPhone } });
  fireEvent.click(screen.getByRole('button', { name: /save/i }));
  await waitFor(() => expect(screen.getByText(validPhone)).toBeInTheDocument());
});
```

#### 9) (Optional) Browser MSW (Storybook / manual QA)
```
public/mockServiceWorker.js   # generated by MSW init
src/mocks/handlers.ts         # re-export feature handlers
src/mocks/browser.ts
```
**`src/mocks/browser.ts`**
```ts
import { setupWorker } from 'msw';
import { <feature>Handlers } from './handlers';
export const worker = setupWorker(...<feature>Handlers);
```

#### 10) Alternative: Nock (pure Node HTTP stubbing)
**`tests/nock/<feature>.ts`**
```ts
import nock from 'nock';
const BASE = 'https://api.example.test';

export function mockPatchPhoneSuccess() {
  return nock(BASE).patch('/v1/profile/phone').reply(200, { phone: '+27123456789' });
}
```

**✅ Checkpoint 2.2 — Fixtures / Mocks**  
Scaffold complete: handlers, server wiring, fixtures, and example tests in place. **Proceed?**

### 2.3 Accessibility gates
Enable ESLint a11y rules, add **axe** checks into Playwright, and write keyboard-path E2E tests so accessibility is enforced in CI.

**Step-by-step**

#### 0) Install (dev)
```bash
# Playwright + axe:
npm i -D @playwright/test @axe-core/playwright

# ESLint a11y/test plugins:
npm i -D eslint-plugin-jsx-a11y eslint-plugin-testing-library eslint-plugin-jest-dom
```

#### 1) ESLint config (a11y rules on)
**`.eslintrc.cjs` (or `.eslintrc.json`)**
```js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  plugins: ['jsx-a11y', 'testing-library', 'jest-dom'],
  rules: {
    // Project-specific a11y nudges
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/no-noninteractive-tabindex': 'error',
    // Keep aria-live usage intentional
    'jsx-a11y/aria-proptypes': 'error',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
      rules: {
        'testing-library/no-node-access': 'off',
      },
    },
  ],
};
```

#### 2) Axe test helper (Playwright)
Create a reusable test fixture that runs axe and fails on **critical** issues.

**`tests/e2e/axe.ts`**
```ts
import { test as base } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export const test = base.extend<{ checkA11y: () => Promise<void> }>({
  checkA11y: async ({ page }, use) => {
    await use(async () => {
      const results = await new AxeBuilder({ page })
        // .disableRules(['color-contrast']) // example override
        .analyze();

      const critical = results.violations.filter(v => v.impact === 'critical');
      if (critical.length) {
        console.error('axe critical violations:', JSON.stringify(critical, null, 2));
        throw new Error(`axe: critical violations found (${critical.length})`);
      }
    });
  },
});
export const expect = test.expect;
```

#### 3) Keyboard path + a11y example spec
**`tests/e2e/profile-account-details.spec.ts`**
```ts
import { expect } from '@playwright/test';
import { test } from './axe';

test.describe('Profile › Account Details', () => {
  test('phone update happy path + a11y + keyboard', async ({ page, checkA11y }) => {
    await page.goto('/profile/account');
    await page.addInitScript(() => (window as any).__FF_PROFILE_ACCOUNT_DETAILS__ = true);

    // Keyboard-first
    await page.getByTestId('phone-edit').focus();
    await expect(page.getByTestId('phone-edit')).toBeFocused();
    await page.keyboard.press('Enter');

    await page.getByTestId('phone-input').fill('+15551234567');
    await page.keyboard.press('Enter');

    await page.getByRole('status').waitFor();
    await expect(page.getByTestId('phone-edit')).toBeFocused();

    await checkA11y();
  });
});
```

**✅ Checkpoint 2.3 — Accessibility gates**  
ESLint a11y rules active, Playwright axe helper wired, keyboard-path spec added, and CI command ready. **Proceed?**

### 2.4 Observability
Add structured logs, OTEL spans, and a minimal events/metrics doc so changes are traceable in dev and prod. Link to dashboards in the PR.

**Step-by-step**

#### 0) Install (dev) — if not already
```bash
npm i @opentelemetry/api
# For browser export (optional, choose your exporter impl in the app shell)
# npm i @opentelemetry/sdk-trace-web @opentelemetry/exporter-trace-otlp-http
```

#### 1) Minimal OTEL tracer + span helper
**`src/lib/obs/otel.ts`**
```ts
// Minimal OTEL web tracer setup (isomorphic-friendly)
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

export const tracer = trace.getTracer('web.profile');

export async function withSpan<T>(name: string, fn: () => Promise<T>) {
  const span = tracer.startSpan(name);
  try {
    const result = await context.with(trace.setSpan(context.active(), span), fn);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (e: any) {
    span.setStatus({ code: SpanStatusCode.ERROR, message: e?.message });
    throw e;
  } finally {
    span.end();
  }
}
```

#### 2) Events tracker (PII-free)
**`src/lib/obs/events.ts`**
```ts
type Props = Record<string, string | number | boolean | null | undefined>;
type EventName =
  | 'profile.account.update_phone.submit.success'
  | 'profile.account.update_phone.submit.failure';

export function track(event: EventName, props: Props = {}) {
  const payload = {
    name: event,
    props: { user_role: 'member', ...props }, // no PII
    ts: Date.now(),
  };
  // Replace with real sink (eg. Segment/GA/OTEL log exporter)
  console.debug('[event]', payload);
}
```

#### 3) Wire into a feature (example)
**`src/lib/api/profile.ts` (excerpt)**
```ts
import { withSpan } from '@/src/lib/obs/otel';
import { track } from '@/src/lib/obs/events';

export async function updatePhone(payload: { phone: string }, token: string) {
  return withSpan('profile.api.update_phone', async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/profile/phone`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      track('profile.account.update_phone.submit.failure', { status: res.status });
      throw Object.assign(new Error('Update phone failed'), { status: res.status, data: err });
    }

    const data = await res.json();
    track('profile.account.update_phone.submit.success', { validation_ms: 0, provider: 'api' });
    return data as { phone: string };
  });
}
```

#### 4) Docs for this feature’s observability
**`docs/profile-account-details/observability.md`**
```markdown
# Observability — Profile › Account Details

## Events
- `profile.account.update_phone.submit.success`
- `profile.account.update_phone.submit.failure`

Props: `{ correlation_id?, user_role, validation_ms?, provider: "api" }`

## Metrics
- `service.profile.update_phone.latency_ms`
- `service.profile.update_phone.error_rate`

## Traces
- Span: `profile.api.update_phone` wraps the PATCH call

## Dashboards
- Link: <ADD_TRACES_DASHBOARD_URL>
- Link: <ADD_BUSINESS_EVENTS_DASHBOARD_URL>
```

#### 5) (Bonus) Feature flag helper + minimal UI wiring
**`src/lib/flags.ts`**
```ts
export function isEnabled(key: string) {
  if (typeof window !== 'undefined' && (window as any).__FF_PROFILE_ACCOUNT_DETAILS__ === true) return true;
  return process.env.NEXT_PUBLIC_FF_PROFILE_ACCOUNT_DETAILS === '1';
}
```

**`app/profile/account/page.tsx` (RSC scaffold)**
```tsx
import { isEnabled } from '@/src/lib/flags';
import { Suspense } from 'react';

export default async function AccountPage() {
  const enabled = isEnabled('ff.profile.update_phone_v2');
  return (
    <div className="container mx-auto p-4">
      <h1 className="sr-only">Account details</h1>
      <Suspense fallback={null}>
        {enabled ? <PhoneSection /> : <LegacyAccountView />}
      </Suspense>
    </div>
  );
}

async function PhoneSection() {
  return (
    <section aria-labelledby="phone-section">
      <h2 id="phone-section" className="text-lg font-medium">Phone</h2>
      {/* <PhoneEditor /> */}
    </section>
  );
}

function LegacyAccountView() {
  return <p>Account overview</p>;
}
```

**`app/profile/account/loading.tsx`**
```tsx
export default function Loading() {
  return <div role="status" aria-live="polite">Loading account…</div>;
}
```

**`app/profile/account/error.tsx`**
```tsx
'use client';
export default function Error({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-3">
      Something went wrong loading Account. {error.message}
    </div>
  );
}
```

#### 6) CI hooks (excerpt, if missing)
**`.github/workflows/ci.yml`**
```yaml
jobs:
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm run test -- --coverage
      - run: npx playwright install --with-deps && npx playwright test
      - run: npx @lhci/cli autorun
      - run: npm audit --audit-level=high || true
      - run: npx semgrep ci --config p/ci
      - run: npx gitleaks detect --no-git -v
```

**✅ Checkpoint 2.4 — Observability**  
OTEL span helper, event tracker, feature docs, optional flag scaffold, and CI excerpt are ready. Add dashboard links in the doc. **Proceed?**

**Artifacts (Per Task)**
- Update: **Implementation Checklist**, **Release Plan** (exposure/rollback).

**CI Gates (must stay green on the single Epic PR)**
- Unit = **80%** on touched files, **E2E passing**, visual diffs approved, **lint/typecheck clean**, **0 high vulns**, a11y budgets met.

---

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
  - Add `@epic:<slug>` tags in tests for the Epic.  
  - PowerShell: `$Env:EPIC='profile-plan-details'; npx playwright test --grep @epic:`  
  - bash: `EPIC=profile-plan-details npx playwright test --grep @epic:`  
- Spec-based selection:  
  - `npx playwright test tests/visual/<epic-slug>.visual.spec.ts`  
  - Update baselines: `npx playwright test tests/visual/<epic-slug>.visual.spec.ts --update-snapshots`  
- Main user flows (examples):  
  - Login → Profile → Plan Details → open/close each modal; confirm change path.  
  - Register → Plan Selection → Payment (stub/mocked) → Success page.  
  - Browse → Series → Watch → basic player assertions.  
- Env/mocks notes: set `baseURL` in `playwright.config.ts` (or `--base-url`); use MSW handlers; `--workers=1` if shared state; add axe checks on key pages.

**Commit the feature**  
- Commit and push PR branch:  
  - `git add -A && git commit -m "feat(profile): add OTEL spans + event tracker [task:obs]"`  
  - `git push -u origin feat/profile-observability` 

**Artifacts (Output)**  
- Test Summary  
- Before/After Evidence  
- Perf Note  
- **Observability doc links**  

---

## 5) Documentation & PR (Single PR per Epic)

**PR Preparation**  
- PR Title: `feat(<epic-slug>): <Epic title>` (single PR).  
- Link Epic ticket (`ISO-###`).  
- Self-contained description with **Task-by-Task changelog**.  
- Coverage & E2E reports attached.  
- Observability hooks confirmed.  
- Security notes if relevant.  
- Docs updated (`SSD.md`, `README`, runbooks).  

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

## Kickoff Flow (Dynamic per Epic — Ask Before Execute)

- Before Step 0, identify the active epic/task by scanning `.claude/UI_todo_list.md` for the first unchecked `[ ]` item and record it in planning artifacts.
- When starting a new epic, execute Steps 1 through 7 sequentially before implementation.

0. Always create a new feature branch (`feat/<epic-slug>`) for a new Epic/feature and check it out before any changes; do not proceed until on the correct branch.
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
