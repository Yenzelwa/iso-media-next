# Documentary Page Test Plan

## Task 3 – Remove empty EnhancedCarousel

- Unit: Extend `__tests__/components/enhanced-carousel.test.tsx` to assert documentary variant theming hooks and keep `__tests__/app/root/documentary.test.tsx` covering empty dataset short-circuit.

- Integration: Rely on existing fetch mocks ensuring UI count updates; add scenario with empty payload.

- Visual: Exercise the documentary route in Playwright; rely on automated visual assertions (no manual screenshots required).

- Accessibility: Re-run axe checks in Jest to ensure no regressions in conditional rendering.

- Observability: No new signals; confirm existing fetch error logging remains untouched.

