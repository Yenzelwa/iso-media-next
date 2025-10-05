feat(profile-settings-privacy): 2FA modal visibility + auto logout

## What
Implements Epic Profile — Settings & Privacy

## Why
Improve 2FA modal visibility/accessibility and add idle auto logout.

## How (Task-by-Task)
- Task 1 — 2FA modal visibility fix: labelled dialog, focus on open, Escape, scroll lock; added telemetry events
- Task 2 — Auto logout functionality: idle detector in AuthProvider honoring `auto_logout_minutes`

## Tests
- Unit: `__tests__/app/root/profile/security-privacy.test.tsx` (modal flows, selects, device actions)
- E2E: `tests/e2e/profile-security-privacy.spec.ts` (keyboard + axe critical gate)
- Integration (MSW): `tests/integration/security/security.msw.test.ts` (scaffolded; currently skipped)

## Observability
- Events: `profile.security.2fa.modal.open|close`, `auth.session.auto_logout`
- Docs: artifacts/profile-settings-privacy/observability-plan.md

## Security/Compliance
- No secrets added; no PII in events
- A11y enforced via ESLint + axe fixture

## Risk & Rollback
- Risk: Low (UI-only behavior)
- Rollback: revert PR; if flagged, toggle env to disable

## Notes for Reviewers
- MSW handlers for `/api/security*` added to support tests
- CI runs lint, typecheck, unit, Playwright, and light security scans

