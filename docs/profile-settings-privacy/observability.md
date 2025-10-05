# Observability - Profile > Settings & Privacy

## Events
- `profile.security.2fa.modal.open`
- `profile.security.2fa.modal.close`
- `auth.session.auto_logout`

Props: `{ correlation_id?, user_role, provider?: "api" }`

## Metrics
- `service.profile.2fa.modal_open.rate`
- `service.auth.auto_logout.count`

## Traces
- Spans wrap 2FA API interactions and session validation checks

## Dashboards
- Link: <ADD_TRACES_DASHBOARD_URL>
- Link: <ADD_BUSINESS_EVENTS_DASHBOARD_URL>

