Release Plan

- Target: `feat/register-page` PR → merge to `master`.
- Scope delivered:
  - Task 1: Visually hide labels with a11y preserved (`sr-only` + `aria-label`).
  - Task 2: Background/styling parity with Login (shared dynamic background + card wrapper).
  - Task 3: Create button styling aligned with Login (gradient, hover, scale, shadows; disabled state unchanged).
- Risk: Low (UI-only, defaults preserved; shared `Input` prop is optional).
- Flag: Optional runtime guard to toggle `hideLabel` usage if needed.
- Rollback: Revert this PR; no migrations or data changes.

Quality gates (mandatory)
- 2.2 Fixtures/Mocks: MSW handlers in place; added `tests/msw/handlers/auth.ts` for register endpoint.
- 2.3 Accessibility: `jest-axe` test added for Register; keyboard path implicitly preserved; no violations.
- 2.4 Observability: Added client event/error logs for submit flow; no PII.

Validation
- Unit tests: Register flow + a11y tests passing.
- Visual parity: Register background and button now match Login.

Release steps
1) Merge `feat/register-page` once checks pass (CI: lint, typecheck, unit).
2) Verify preview deploy renders Register with Login parity and no a11y regressions.
3) Optional: enable/disable label hiding via runtime flag if needed.

