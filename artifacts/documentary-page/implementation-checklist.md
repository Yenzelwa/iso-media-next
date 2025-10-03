# Implementation Checklist - Documentary Page Epic



- [x] Confirm feature branch `feat/documentary-page` active.

- [x] Capture Task Triple for Task 1 (category span styling) from `.claude/UI_todo_list.md`.

- [x] Record baseline UI evidence (`artifacts/documentary-page/screenshots/before/task-1.png`).

- [x] Restyle featured category badge with accessible hover/focus states and theme-consistent colors.

- [x] Add deterministic fetch stubs + badge assertions to `__tests__/app/root/documentary.test.tsx`.

- [x] Run `npm test -- --runTestsByPath __tests__/app/root/documentary.test.tsx` to verify coverage.

- [x] Capture after UI evidence (`artifacts/documentary-page/screenshots/after/task-1.png`).

- [x] Update PR draft with Task 1 changelog entry.



- [x] Capture Task Triple for Task 2 (Watch button fix) from `.claude/UI_todo_list.md`.

- [x] Record baseline UI evidence (`artifacts/documentary-page/screenshots/before/task-2.png`).

- [x] Wire featured `Watch Now` and list `Watch` actions to `/watch/${id}` using Next router navigation.

- [x] Extend `__tests__/app/root/documentary.test.tsx` with router mocks and watch-action assertions.

- [x] Run `npm test -- --runTestsByPath __tests__/app/root/documentary.test.tsx` after changes.

- [x] Capture after UI evidence (`artifacts/documentary-page/screenshots/after/task-2.png`).

- [x] Update PR draft with Task 2 changelog entry.



- [x] Capture Task Triple for Task 3 (remove empty EnhancedCarousel) from `.claude/UI_todo_list.md`.

- [x] Documented that screenshot baselines are no longer required for Task 3 (policy update).

- [x] Restrict carousel rendering to non-empty collections and memoize dataset filters.

- [x] Extend `__tests__/app/root/documentary.test.tsx` with empty dataset coverage and carousel assertions.

- [x] Run `npm test -- --runTestsByPath __tests__/app/root/documentary.test.tsx` to verify coverage.

- [x] Noted no post-change screenshots needed for Task 3 (policy update).

- [x] Update PR draft with Task 3 changelog entry.

- [x] Capture Task Triple for Task 4 (style EnhancedCarousel) from `.claude/UI_todo_list.md`.

- [ ] Define documentary carousel styling improvements and document acceptance notes.

- [ ] Implement styling updates across carousel variants with theme-consistent tokens.

- [ ] Extend `__tests__/app/root/documentary.test.tsx` or visual assertions to cover new styling hooks as feasible.

- [ ] Run `npm test -- --runTestsByPath __tests__/app/root/documentary.test.tsx` to verify coverage.

- [ ] Update PR draft with Task 4 changelog entry.
