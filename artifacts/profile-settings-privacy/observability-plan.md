# Observability Plan — Profile > Settings & Privacy

Events
- `profile.security.2fa.modal.open` — fired on open
- `profile.security.2fa.modal.close` — fired on close
- `auth.session.auto_logout` — fired when idle timer logs the user out

Props (PII-free)
- `{ user_role, correlation_id?, provider? }`

Metrics (future)
- `service.profile.2fa.modal_open.rate`
- `service.auth.auto_logout.count`

Traces (future)
- Wrap security settings API calls with `withSpan('profile.api.*')` if/when added

Dashboards
- Add traces/events panels once sinks are connected

