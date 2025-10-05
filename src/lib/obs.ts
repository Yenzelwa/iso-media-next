type EventProps = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: string, props: EventProps = {}): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[event]', name, props);
  }
}

export function trackError(name: string, props: EventProps = {}): void {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[error]', name, props);
  }
}

