## What
Implements Epic Profile — Account Details (Task 1) on branch feat/profile-account-details

## Why
Fix phone update flow to match full name inline update UX

## How (Task-by-Task)
- Task 1 — Update phone number flow: fix sanitize regex, remove stray debug; enable Save only for valid changed number; add observability event

## Tests
- Unit: Updated existing test passes — `membership-billing.test.tsx` (4 tests)
- Coverage: Included in run output

## Observability
- Logs: `profile.phone.update` info log with correlation id + metadata

## Security/Compliance
- No secrets; no PII emitted; client-side only change

## Risk & Rollback
- Risk: low
- Rollback: revert PR

## Notes for Reviewers
- Follow-up tasks: Task 2/3 in this Epic
