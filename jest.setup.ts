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