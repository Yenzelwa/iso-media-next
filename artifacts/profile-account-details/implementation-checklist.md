## Implementation Checklist — Epic: Profile — Account Details

- [x] Task 1: Update phone number flow
  - Input: Edit phone number in Account Settings
  - Expected: Works like full name update (inline edit + Save)
  - Validation: Save enabled only for new valid 10-digit number; persists via `updateUser`
  - Tests: `membership-billing.test.tsx` passing (4/4)
  - Observability: `console.info('profile.phone.update', { correlation_id, last4, userId, user_role })`

- [ ] Task 2: Update card modal visibility (centered, no scroll)
- [ ] Task 3: Load StripeCheckoutForm in modal

Notes
- Fixed sanitize regex and removed stray debug artifact causing SWC syntax error.
