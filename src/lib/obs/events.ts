type Props = Record<string, string | number | boolean | null | undefined>;
type EventName =
  | 'profile.account.update_phone.submit.success'
  | 'profile.account.update_phone.submit.failure'
  | 'profile.security.2fa.modal.open'
  | 'profile.security.2fa.modal.close'
  | 'auth.session.auto_logout';

export function track(event: EventName, props: Props = {}) {
  const payload = {
    name: event,
    props: { user_role: 'member', ...props },
    ts: Date.now(),
  };
  // Replace with real sink (eg. Segment/GA/OTEL log exporter)
  // eslint-disable-next-line no-console
  console.debug('[event]', payload);
}

