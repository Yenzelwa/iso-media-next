# Test Plan — Profile > Settings & Privacy

Scope
- 2FA modal visibility and accessibility
- Auto logout idle handling respecting `auto_logout_minutes`
- Device logout single and bulk actions

Unit/Component
- `__tests__/app/root/profile/security-privacy.test.tsx`
  - Renders headings and counts sessions
  - 2FA toggle opens modal; completes setup toggles state
  - Auto logout select changes values
  - Per-device logout removes non-current device
  - Bulk logout removes all non-current; second click no-ops

E2E (Playwright)
- `tests/e2e/profile-security-privacy.spec.ts`
  - Keyboard path to 2FA toggle, open with Enter
  - Modal visible as `role=dialog` with label; Escape closes
  - Axe critical violations gate via shared fixture

Mocks
- MSW node server initialized in `jest.setup.ts`
- Handlers in `tests/msw/handlers/profile.ts` for `/api/security*`

Success Criteria
- All unit tests pass
- E2E spec passes; no axe critical issues
- CI green (lint, typecheck, tests)

