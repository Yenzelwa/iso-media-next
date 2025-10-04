## Observability Plan — Epic: Profile — Account Details

Events
- `profile.phone.update`
  - Props: `correlation_id`, `userId` (non-PII), `user_role`, `last4`
  - Outcome: submitted (client)

Logs
- `console.info` emitted on phone save submit

Metrics (future)
- Counter: `web.profile.phone_update.submitted`

Traces (future)
- Span: `profile.phone.update` around API call to `/api/profiles/me` if wired
