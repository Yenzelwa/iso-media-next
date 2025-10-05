# Implementation Checklist — Profile > Settings & Privacy

- [x] 2FA modal visible without scroll; centered; labelled dialog
- [x] Focus management on open; Escape closes; background scroll lock
- [x] Open/close tracked via `profile.security.2fa.modal.*`
- [x] Auto logout implemented via idle detector in `AuthProvider`
- [x] Auto logout preference persisted to `localStorage`
- [x] MSW handlers for `/api/security` + devices endpoints
- [x] Unit tests for UI flows in `security-privacy.test.tsx`
- [x] E2E a11y + keyboard spec added (`tests/e2e/profile-security-privacy.spec.ts`)
- [x] ESLint a11y plugins enabled; axe fixture wired
- [x] CI pipeline runs lint, typecheck, tests, Playwright, security scans

