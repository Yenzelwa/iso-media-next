## What
Implements Epic Payment Page on branch feat/payment-page

## Why
Business problem: Ensure Payment page provides a focused, consistent checkout experience aligned with Login styling and without redundant navigation.
Epic: UI Todo List – Epic: Payment Page

## How (Task-by-Task)
- Task 1 - Background + styling match Login: Verified Payment view uses the same dynamic background and card styling pattern as Login via `StripeCheckOutForm`; replaced `min-h-screen` with `min-h-[100dvh]` per guardrails.
- Task 2 - Adjust Plan Summary display: Replaced inline pricing summary with an accessible link to `/plan-selection` from the plan summary area.
- Task 4 - Hide Navigation component: Updated `src/app/(account)/layout.tsx` to hide global `Navigation` on `/payment` to avoid duplicate nav and match Login’s standalone layout.

## Tests
- Unit: Ran `__tests__/app/account/payment.test.tsx` – all tests passing (redirect, render, plan-summary link present, disabled submit when empty, happy path submission).
- Integration: N/A for this slice.
- E2E: Deferred to later slice.
- Coverage: Local Jest summary OK for touched files.

## Observability
- No changes required for this slice; console errors surfaced on failure cases remain.

## Security/Compliance
- No secrets added. Payment interactions remain client-side with Stripe Elements; backend endpoints unchanged.
- Accessibility: No new components; continue to meet keyboard/labels patterns.

## Risk & Rollback
- Risk: Low
- Rollback: revert PR or remove `/payment` from `hideNavRoutes` in `(account)/layout.tsx`.

## Notes for Reviewers
- Next slices will address:
  - Task 2: Move plan summary “today’s charges/first month price” into a link to `/plan-selection`.
  - Task 3: Disable Complete Payment until all Stripe Elements are complete (requires element state tracking and test updates).
