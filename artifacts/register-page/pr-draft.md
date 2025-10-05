Title: feat(register-page): a11y label hiding + styling parity with Login

Summary
- Register page refinements delivered in three slices with tests and gates:
  - Hide labels on text/password inputs while preserving a11y.
  - Match background and card styling to Login.
  - Align Create button styling with Login.

Scope
- Input a11y: add optional `hideLabel` prop and apply to specific fields.
  - `src/components/Input.tsx`
  - `src/app/(account)/register/page.tsx`
- Styling parity: dynamic background + card wrapper to mirror Login.
  - `src/app/(account)/register/page.tsx`
- Button styling: gradient/hover/scale/shadow aligned with Login; keep disabled state intact.
  - `src/app/(account)/register/page.tsx`

Non-Goals
- No auth flow changes, no data model changes, no navigation changes.
- No global theming changes beyond this page.

Risks
- Low. `hideLabel` is optional with preserved defaults; visual-only other changes.

Rollback
- Revert this PR; no migrations or data implications.

Testing
- Unit: `__tests__/app/account/create.test.tsx` (9 tests) passing.
- A11y: `__tests__/a11y/register.a11y.test.tsx` (jest-axe) passing.

Accessibility
- Labels remain in DOM using `sr-only`; inputs receive `aria-label` when hidden.
- Keyboard path unchanged; no critical axe violations.

Security/Privacy
- No secrets, no PII introduced. No logging of sensitive fields.

Observability
- Client event/error logs for submit lifecycle.
  - `src/lib/obs.ts` and wiring in `src/app/(account)/register/page.tsx`
  - Events: `register.submit.start|success|failure|exception`

API Mocks (2.2)
- MSW handler for register endpoint: `tests/msw/handlers/auth.ts`
- Server wiring: `tests/msw/server.ts`

Release Plan
- Ship on `feat/register-page` → `master` after CI (lint, types, unit) green.
- Optional runtime flag to toggle label hiding if needed.
