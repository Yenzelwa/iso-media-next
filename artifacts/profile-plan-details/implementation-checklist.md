Title: Profile – Plan Details Epic

Status: In Progress

Step 1 — Inputs

- Epic: Profile – Plan Details
- Tasks in scope (from .claude/UI_todo_list.md):
  - Task 1: Manage Plan modal visible immediately (no scroll)
  - Task 2: Cancel Plan modal visible immediately (no scroll)
  - Task 3: Change Plan modal visible immediately (no scroll)
  - Task 4: Confirmation modal styling for upgrade/downgrade

Assumptions & Open Questions
- Assumption: Target modals are implemented within `src/app/(root)/profile/PlanDetails.tsx`.
- Assumption: “Visible immediately” means centered overlay in viewport with backdrop and focus moved into modal.
- Assumption: No design changes beyond visibility and basic confirmation styling unless specified.
- Question: Should body scrolling be disabled while any modal is open to prevent background scroll?
- Question: Should we render modals via a portal (`document.body`) to avoid stacking context issues?
- Question: Are there a11y specifics (focus trap, aria-modal) required now, or incremental improvement acceptable?

Exit Criteria (per task)
- Opening each modal displays it centered in viewport without additional scrolling.
- Focus is sent to modal heading on open; ESC closes.
- Backdrop covers content; background scrolling is prevented while open.
- Confirmation modal uses consistent styling tokens and matches existing theme.

Next Steps
- Map touchpoints, add tests for visibility and focus behavior, then implement small diffs.

