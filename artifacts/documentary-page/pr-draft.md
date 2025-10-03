## What

- Style the featured documentary category chip with theme-aligned pill treatment and accessible focus-visible outline.

- Stub `/api/documentaries` fetches in RTL to keep tests deterministic and assert badge styling contracts.

- Wire Documentary watch CTAs to `/watch/${id}` and cover navigation behaviour in tests.

- Guard carousel rendering so empty documentary collections stay hidden and memoize derived datasets.



## Why

- Raw text styling for `[documentary.type.category.name]` looked unfinished and failed accessibility hover/focus guidance.

- Documented fetch behaviour ensures unit tests validate the new UI contract without real network calls.

- Watch buttons previously rendered inert, blocking users from starting playback from the Documentary page.



## How (Task-by-Task)

- Task 1 – Style category span: applied red pill styling, added keyboard focus support, and validated via updated documentary RTL suite.

- Task 2 – Fix Watch button: introduced a shared `handleWatch` helper that pushes to `/watch/${id}` and asserted featured/list CTAs trigger router navigation.

- Task 3 - Remove empty EnhancedCarousel: memoized filtered collections, short-circuited rendering when arrays are empty, and expanded RTL coverage for zero-state scenarios.



## Visual Validation

- Playwright visual baselines will be updated as needed; manual screenshots are no longer required.
## Tests

- `npm test -- --runTestsByPath __tests__/app/root/documentary.test.tsx`



## Observability

- No new telemetry required for visual-only change.



## Security/Compliance

- UI-only; no data contracts or secrets impacted.

