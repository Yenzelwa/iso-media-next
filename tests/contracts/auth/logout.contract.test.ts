import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import LogoutRequestSchema from '@/schemas/auth/LogoutRequest.schema.json';
import LogoutResponseSchema from '@/schemas/auth/LogoutResponse.schema.json';
import successMock from '@/mocks/auth/logout.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Logout Contract Tests', () => {
  test('valid logout request passes schema validation', () => {
    const validRequest = {
      token: 'valid_access_token'
    };
    
    const valid = ajv.validate(LogoutRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('empty logout request passes schema validation', () => {
    const validRequest = {};
    
    const valid = ajv.validate(LogoutRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('logout response mock matches schema', () => {
    const valid = ajv.validate(LogoutResponseSchema, successMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(successMock).toHaveProperty('success');
    expect(successMock).toHaveProperty('message');
    expect(successMock.success).toBe(true);
    expect(typeof successMock.message).toBe('string');
  });
});