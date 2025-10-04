Title: Test Plan — Profile – Plan Details

Scope
- Unit/integration tests for modal visibility, focus, ESC close, and background scroll locking.
- Visual checks optional (Playwright baseline) for centered modal.

Test Cases
- Manage Plan modal opens on click: heading visible, modal in DOM, role=dialog present, aria-modal=true.
- Cancel Subscription modal opens on click; Confirm closes and triggers alert path; Keep closes without alert.
- Change Plan (Upgrade/Downgrade) modal opens on click; selecting an option opens a styled confirmation modal; confirming triggers intent and closes both.
- ESC key closes any open modal.
- While modal open: document.body overflow is hidden to prevent scroll.
- Focus is moved to modal heading on open; returned to trigger button on close.

Selectors
- Trigger buttons: `[data-testid="manage-plan"]`, `[data-testid="cancel-subscription"]`, `[data-testid="upgrade-popup"]`.
- Confirm modal: `[data-testid="confirm-change-modal"]`, confirm `[data-testid="confirm-plan-change"]`, cancel `[data-testid="cancel-plan-change"]`.
- Modal heading roles: `getByRole('heading', { name: /manage plan/i })`, etc.

Exit Criteria
- All new tests pass locally and in CI.
- No regressions in existing profile tests.
