# Release Plan — Profile > Settings & Privacy

Exposure
- UI-only improvements; low risk. Can ship without a flag.
- If preferred, guard via env `NEXT_PUBLIC_FF_PROFILE_ACCOUNT_DETAILS=1` and local window override during QA.

Rollout
- Standard PR merge to `master` with CI gates
- Validate on preview/staging; verify E2E and a11y checks

Rollback
- Revert PR; minimal surface area
- Disable feature flag if enabled

Owner/DRI
- UI team (Profile area)

Risks
- Low: UI modal behavior and idle logout timer

