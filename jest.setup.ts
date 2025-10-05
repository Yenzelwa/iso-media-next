/* eslint-disable @typescript-eslint/ban-ts-comment */
// jest.setup.ts
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Node < 18
import { TextEncoder, TextDecoder } from 'util';

if (!global.TextEncoder) {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// MSW server for API mocking in Jest (node)
try {
  // Dynamically import to avoid bundling in environments that don't need it
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require('./tests/msw/server');
  // Use 'bypass' to avoid failing tests that don't mock every endpoint
  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
} catch {
  // MSW not available; continue without network mocking
}
