Title: Observability Plan — Profile – Plan Details

Logs
- Event: `profile.plan.manage.open` { correlation_id, user_role }
- Event: `profile.plan.manage.close` { correlation_id, reason }
- Event: `profile.plan.cancel.open` / `.confirm` / `.keep`
- Event: `profile.plan.change.open` / `.select` { target_plan }

Metrics
- `profile.plan.modal_open.count`
- `profile.plan.modal_close.count`

Traces
- Span around plan change flow: `profile.plan.change`

Dashboards
- Modal open/close counts and errors over time.

