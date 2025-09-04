/* eslint-disable @typescript-eslint/ban-ts-comment */
// jest.setup.ts
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Node < 18
import { TextEncoder, TextDecoder } from 'util';

if (!global.TextEncoder) {
  // @ts-expect-error
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-expect-error
  global.TextDecoder = TextDecoder;
}
