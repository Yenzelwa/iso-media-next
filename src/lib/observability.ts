// Minimal structured event helpers (placeholder for real OTEL wiring)
export type EventProps = Record<string, unknown> & { correlation_id?: string };

export const correlationId = (): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cryptoObj: any = (globalThis as any).crypto;
    if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

export const trackEvent = (name: string, props: EventProps = {}): void => {
  const cid = props.correlation_id ?? correlationId();
  // In production, wire to your analytics/OTEL backend
  // eslint-disable-next-line no-console
  console.debug("event", { name, ...props, correlation_id: cid, ts: new Date().toISOString() });
};

export const trackError = (name: string, error: unknown, props: EventProps = {}): void => {
  const cid = props.correlation_id ?? correlationId();
  // eslint-disable-next-line no-console
  console.error("error", { name, error, ...props, correlation_id: cid, ts: new Date().toISOString() });
};

