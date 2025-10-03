# Release Plan – Documentary Page Epic

## Task 3 – Remove empty EnhancedCarousel
- **Exposure strategy**: No feature flag required; guard strictly affects empty datasets. Rollout piggybacks on existing Documentary page deployment.
- **Canary/monitoring**: Validate Documentary page renders correctly in staging with seeded datasets producing zero category matches.
- **Rollback**: Revert commit on `feat/documentary-page` or hotfix by re-enabling unconditional carousel rendering if unexpected regressions appear.
- **Dependencies**: Relies on existing `/api/documentaries` endpoints only; no contract changes.
