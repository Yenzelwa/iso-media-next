import { trace, context, SpanStatusCode } from '@opentelemetry/api';

export const tracer = trace.getTracer('web.profile');

export async function withSpan<T>(name: string, fn: () => Promise<T>) {
  const span = tracer.startSpan(name);
  try {
    const result = await context.with(trace.setSpan(context.active(), span), fn);
    span.setStatus({ code: SpanStatusCode.OK });
    return result;
  } catch (e: any) {
    span.setStatus({ code: SpanStatusCode.ERROR, message: e?.message });
    throw e;
  } finally {
    span.end();
  }
}

