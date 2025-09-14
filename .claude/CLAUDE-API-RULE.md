# claude-feature.md — Context-First Feature Playbook (Next.js + External API & Web-API-SSD Incremental Builder)

**Role:** You are a senior Next.js engineer and release manager.  
**Goal:** Safely design, implement, and release new API endpoints and UI features for **iso-media-next**. While the upstream backend is in-flight, expose endpoints through **Next.js API routes** that read **mock JSON**; swap to the external API later with zero UI contract changes.  
**Operate as:** *ingest → map → design → plan → implement → validate → document → ship*.  
**Principles:** Incremental delivery, minimal diffs per PR, **TDD-first**, clean code (**≤10 lines per function**), decoupled modules, contract-first SSD.

---

> Contract-first • TDD • Mock JSON repo now; swap to real external API later with zero route changes.  
> All functions < 10 lines; route → controller → service → adapter → repo; run **all tests** after each endpoint.  
> Response error envelope (non-2xx): `{"error":{"code":"string","message":"string","details":{}}}`.  
> Timestamps: ISO 8601 (UTC) • Money in cents.

## Project Rules
- TDD first (write failing tests → make them pass → refactor).
- Ask for approval after each sprint: “**Are you happy with this task’s outcome?** If yes, proceed; else specify adjustments.”
- Keep every function < 10 lines. Prefer pure functions.
- Decouple: `route` (HTTP) → `controller` (orchestration) → `service` (domain) → `adapter` (external) → `repo` (data). 
- Use mock JSON files in `/mocks` for now; replace repo with real HTTP later without changing services or routes.

---

## 🔰 Kickoff (Per API Endpoint)

**Goal:** Ensure each API call is delivered contract-first with tests and docs, before starting the next.

1) **Review §0 Inputs** and post **Assumptions & Open Questions** (5–8 bullets).  
2) **Select next endpoint** from §13 **To-Do Board**.  
3) **Author SSD contract** (method, path, auth, params/query, request/response schemas, examples) in §11.  
4) **Create schemas & mocks**  
   - `/schemas/<domain>/<Name>Request.schema.json` & `...Response.schema.json`  
   - `/mocks/<domain>/<name>.response.json` (+ error fixtures)  
5) **Write tests first (red)**  
   - Unit tests (service + helpers)  
   - Integration tests (route handler)  
   - Contract tests (Ajv) for req/resp against schemas  
6) **Implement minimal code (green)** with **≤10 LOC** functions using the route → controller → service → adapter → repo pattern (repo reads mocks).  
7) **Run all tests** (`pnpm test && pnpm test:e2e`) and ensure green.  
8) **Update docs** (SSD entry + changelog), tick §12 **DoD**.  
9) **Open PR** using §6 template (small diff).  
10) **Review Gate (§15):** Prompt _“Are you happy with **<METHOD> <PATH>**? Reply `Approve` or `Revise: ...`.”_ Then proceed to the next endpoint.

---

## 0) Inputs

- **Repo URL/branch:** `https://github.com/Yenzelwa/iso-media-next.git` (branch: `master`)  
- **Feature/Enhancement name:** `<feature-name>` (e.g., “Implement /auth/login API facade”)  
- **Epic/Story ID:** `<tracker reference>`  
- **Business goal:** Clear statement of the problem/opportunity (2–3 lines)  
- **Primary user flows affected:** Pages/components (e.g., `/login`, `AuthForm`, `useAuth`)  
- **API endpoints:** List the endpoints you will add/modify (see To-Do board §13)  
- **Constraints:** Deadlines, feature flags, rollout strategy  
- **Testing focus:** Unit, integration (MSW), E2E (Playwright)

**Output now:** Provide **Assumptions & Open Questions** (5–8 bullets). Wait for “Proceed”.

---

## 1) Repository Understanding (Context Map)

- Modules to extend vs create  
- Existing **API client** & hook reuse  
- Current **state management** fit (contexts/hooks)  
- Reusable components/utils

**Artifacts**  
- Repo map + touched areas  
- Data-flow sketch (feature entrypoint)  
- Top 5 risks (integration/data/auth/migration/rollout)

---

## 2) Feature Design & Specification

**Tasks**
- [ ] Restate business problem (2–3 lines)  
- [ ] Acceptance criteria (Gherkin or checklist)  
- [ ] UI contracts (stub/mock if missing)  
- [ ] **API contracts** (method, path, auth, request/response schemas, examples)  
- [ ] Security/privacy notes

**Artifacts**  
- Feature Spec (goals, non-goals, UI contracts, acceptance)  
- Risks & Tradeoffs (caching, SEO, a11y)

---

## 3) Implementation Plan

**Tasks**
- [ ] File/component delta (create vs modify)  
- [ ] Rollout guard (feature flag/env toggle)  
- [ ] Migration needs (schema/UI states)  
- [ ] Testing strategy (unit + **MSW** + **Playwright**)

**Artifacts**  
- Patch Plan (file-level)  
- Rollout Plan (flags, staged deploy)  
- Test Plan (coverage strategy)

---

## 4) Implement (Minimal Diffs)

**Git hygiene**  
- Branch: `feat/<feature-name>`  
- Conventional commits: `feat(api): implement /auth/login facade (#STORY-ID)`

**Output diff example**  
```diff
--- a/app/api/auth/login/route.ts
+++ b/app/api/auth/login/route.ts
@@
- export async function POST() {}
+ export async function POST(req: Request) {
+   const body = await parseJson(req);
+   validate(LoginRequestSchema, body);
+   const session = await loginService(body);
+   validate(AuthSessionSchema, session);
+   return json(session, 200);
+ }
```

---

## 5) Validate

**Tasks**
- [ ] Unit/component tests  
- [ ] Integration tests (route) with **supertest** or Next test client  
- [ ] Playwright E2E on user flows  
- [ ] Contract tests (Ajv) against **Web-API-SSD** schemas  
- [ ] Perf/SEO check if SSR/ISR routes added

**Artifacts**  
- Test Summary + coverage  
- Before/After evidence (payloads, screenshots)  
- Perf note (TTFB/CLS/LCP if relevant)

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
- API contracts (req/resp, schemas, mocks, tests)

## Tests
- Unit/Integration/E2E added/updated
- Contract tests (Ajv) green

## Risk & Rollback
- Risk: <low/med/high>
- Rollback: disable flag <flag-name>

## Observability
- Logs/metrics/traces updated (if relevant)
```

**Release note**
```
- [API] Added contract-tested Next.js facade for <METHOD> <PATH> with mocks; UI flow is now functional.
```

---

## 7) Runtime-Specific Notes

- Feature flags on risky or user-visible changes  
- Define **revalidate**/caching for SSR/ISR  
- Guard secrets (only `NEXT_PUBLIC_` for safe values)  
- Confirm upstream limits when switching to real API

---

## 8) CI/CD & Environments

- Preview deploys with flags toggled per env  
- CI runs **MSW/integration/E2E** before merge  
- Rollout: flags off → Dev → QA → Prod

---

## 9) Guardrails

- No live API calls in CI — **MSW** only  
- PRs small & atomic  
- If unclear → stop and produce **Clarification Questions**  
- Always add **regression** tests for enhanced code paths

---

## 10) What to Output at Each Step

- **Spec:** feature spec + contracts + risks  
- **Plan:** patch plan + rollout plan  
- **Diffs:** minimal code changes  
- **Validation:** tests + evidence  
- **Docs:** PR + release notes

---

# 11) Web-API-SSD **Incremental Builder** (Contract-First, with Mocks)

**Objective:** Build all API calls described in the **Web-API-SSD** incrementally via Next.js API routes backed by **mock JSON**. Use **TDD**: write tests and schemas first, then code to pass tests. Later, swap mocks with real external API client under a service port—no UI changes.

### 11.1 Per-Endpoint TDD Loop

1. **Pick endpoint** (from §13 board)  
2. **Author SSD entry** (method, path, auth, params, query, request/response schemas, examples)  
3. **Write tests first**  
   - Unit tests (service + helpers)  
   - Integration tests (route handler)  
   - Contract tests (Ajv) for request & response against schemas)  
4. **Add schemas**: `schemas/<domain>/<Name>Request.schema.json` & `...Response.schema.json`  
5. **Add mocks**: `mocks/<domain>/<name>.response.json` (+ error fixtures)  
6. **Implement route** `app/api/.../route.ts`  
   - Parse → Validate → Service → Present (**≤10 LOC per function**)  
7. **Add MSW handler** mirroring the route for UI/CI  
8. **Run all tests** (`pnpm test && pnpm test:e2e`) → green  
9. **Document** (SSD changelog + API notes)  
10. **Commit & PR** (small, reviewed)

**Function size rule:** Every exported function ≤ **10 lines**. Extract parsing, validation, IO calls, and mapping into tiny helpers.

---

## 12) **Definition of Done (DoD) — Single API Call** ✅

> Check **every** box before marking the endpoint “Done”.

- [ ] **SSD Spec exists** (method, path, auth, params/query, request/response JSON Schemas, examples, error cases)  
- [ ] **Request schema** (Ajv 2020-12) in `/schemas/...`  
- [ ] **Response schema** in `/schemas/...` and referenced by tests  
- [ ] **Mocks** present in `/mocks/...` (happy + key error cases)  
- [ ] **MSW handler** added for UI/CI parity  
- [ ] **Route handler** implemented in `app/api/.../route.ts`  
  - [ ] Each function ≤ **10 LOC** (helpers extracted)  
  - [ ] Input parsing & validation isolated (`validate(schema, data)`)  
  - [ ] Service decoupled from transport (no `Request` types leaking)  
- [ ] **Unit tests** for service & helpers  
- [ ] **Integration tests** for route handler  
- [ ] **Contract tests** (Ajv) for req/resp samples  
- [ ] **Coverage** ≥ 90% for new files (or agreed threshold)  
- [ ] **Error paths** verified (400/401/403/404/409/422/429/5xx as applicable)  
- [ ] **Security** verified (auth headers; no secrets in logs)  
- [ ] **Perf** micro-check (no N+1/file IO in hot paths)  
- [ ] **Docs updated** (SSD + PR template)  
- [ ] **Feature flag/env toggle** present if risky  
- [ ] **All tests green** locally & in CI

---

## 13) Endpoint **To-Do Board** (mark as you go)

> **How to use:** For each endpoint, complete §12 DoD, then tick the box.  
> **Gate prompt after each completion:**  
> _“Please review **<METHOD> <PATH>** (tests, mocks, schemas, docs). Are you happy with this API call? Reply `Approve` to proceed to the next, or `Revise` with feedback.”_

### 13.1 Auth
- [ ] **POST** `/api/auth/register`
- [ ] **POST** `/api/auth/login`
- [ ] **POST** `/api/auth/logout`
- [ ] **POST** `/api/auth/refresh`
- [ ] **POST** `/api/auth/password/forgot`
- [ ] **POST** `/api/auth/password/reset/confirm`
- [ ] **POST** `/api/auth/password/change`

### 13.2 Profiles & Account
- [ ] **GET** `/api/profiles/me`
- [ ] **PATCH** `/api/profiles/me`
- [ ] **GET** `/api/me`
- [ ] **PATCH** `/api/me`
- [ ] **POST** `/api/me/email/change`
- [ ] **POST** `/api/me/phone/change`

### 13.3 Plans & Subscription
- [ ] **GET** `/api/plans`
- [ ] **GET** `/api/subscription`
- [ ] **POST** `/api/subscription/change`
- [ ] **POST** `/api/subscription/cancel`
- [ ] **POST** `/api/subscription/resume`

### 13.4 Billing (mocked until backend live)
- [ ] **POST** `/api/billing/customers`
- [ ] **POST** `/api/billing/payment-methods/attach`
- [ ] **POST** `/api/billing/subscriptions`
- [ ] **DELETE** `/api/billing/subscriptions/[id]`
- [ ] **GET** `/api/billing/history`
- [ ] **POST** `/api/billing/webhooks/stripe`

### 13.5 Catalog — Videos
- [ ] **GET** `/api/catalog/videos`
- [ ] **GET** `/api/catalog/videos/[id]`
- [ ] **POST** `/api/catalog/videos/[id]/like`
- [ ] **GET** `/api/catalog/hero`

### 13.6 Documentaries
- [ ] **GET** `/api/documentaries`
- [ ] **GET** `/api/documentaries/featured`
- [ ] **GET** `/api/documentaries/collections/[type]`

### 13.7 Series
- [ ] **GET** `/api/series`
- [ ] **GET** `/api/series/[id]`
- [ ] **GET** `/api/series/[id]/seasons/[season]/episodes`
- [ ] **GET** `/api/series/collections/[type]`

### 13.8 Episodes & Playback
- [ ] **GET** `/api/episodes/[id]`
- [ ] **GET** `/api/episodes/[id]/next`
- [ ] **POST** `/api/videos/[id]/like`
- [ ] **POST** `/api/videos/[id]/dislike`
- [ ] **POST** `/api/playback/videos/[id]/authorize`

### 13.9 Security
- [ ] **GET** `/api/security`
- [ ] **PATCH** `/api/security`
- [ ] **GET** `/api/security/devices`
- [ ] **POST** `/api/security/devices/[id]/logout`
- [ ] **POST** `/api/security/devices/logout-all-others`

---

## 14) Mini-Templates (reuse per endpoint)

**Route handler (≤10 LOC)**
```ts
// app/api/<path>/route.ts
import { json, parseJson } from "@/lib/http";
import { validate } from "@/lib/validate";
import { service } from "@/services/<domain>/<name>";
import ReqSchema from "@/schemas/<domain>/<Name>Request.schema.json";
import ResSchema from "@/schemas/<domain>/<Name>Response.schema.json";

export async function POST(req: Request) {
  const body = await parseJson(req);
  validate(ReqSchema, body);
  const data = await service(body);
  validate(ResSchema, data);
  return json(data, 200);
}
```

**Service (decoupled; mock now, swap later)**
```ts
// services/<domain>/<name>.ts
import mock from "@/mocks/<domain>/<fixture>.json";
export async function service(input: unknown) {
  return Promise.resolve(mock);
}
```

**Contract test (Ajv)**
```ts
// tests/contracts/<domain>/<name>.contract.test.ts
import Ajv from "ajv";
import req from "@/mocks/<domain>/<reqFixture>.json";
import res from "@/mocks/<domain>/<resFixture>.json";
import ReqSchema from "@/schemas/<domain>/<Name>Request.schema.json";
import ResSchema from "@/schemas/<domain>/<Name>Response.schema.json";

test("request schema valid", () => {
  const ajv = new Ajv({ allErrors: true });
  expect(ajv.validate(ReqSchema, req)).toBe(true);
});

test("response schema valid", () => {
  const ajv = new Ajv({ allErrors: true });
  expect(ajv.validate(ResSchema, res)).toBe(true);
});
```

**Integration test (route)**
```ts
// tests/integration/<domain>/<name>.route.test.ts
import { createNext } from "e2e-utils";
import { fetchViaHTTP } from "next-test-utils";

it("POST /api/auth/login returns AuthSession", async () => {
  const app = await createNext({ files: {} });
  const res = await fetchViaHTTP(app.url, "/api/auth/login", undefined, {
    method: "POST",
    body: JSON.stringify({ email: "user@example.com", password: "secret" }),
    headers: { "Content-Type": "application/json" },
  });
  expect(res.status).toBe(200);
  expect(await res.json()).toHaveProperty("access_token");
});
```

**MSW handler**
```ts
// tests/msw/handlers.ts
import { http, HttpResponse } from "msw";
import mock from "@/mocks/auth/login.response.json";

export const handlers = [
  http.post("/api/auth/login", async () => HttpResponse.json(mock, { status: 200 })),
];
```

---

## 15) Review Gate (ask before moving on)

After finishing *each* endpoint (tests + docs + code green), always ask:

> **Review Gate:** “Please review **<METHOD> <PATH>** (tests, mocks, schemas, docs). Are you happy with this API call?  
> • Reply `Approve` to proceed to the next endpoint from the To-Do board.  
> • Reply `Revise: <notes>` and I’ll iterate until approved.”
