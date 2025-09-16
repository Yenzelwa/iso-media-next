import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import RefreshRequestSchema from '@/schemas/auth/RefreshRequest.schema.json';
import RefreshResponseSchema from '@/schemas/auth/RefreshResponse.schema.json';
import successMock from '@/mocks/auth/refresh.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Refresh Contract Tests', () => {
  test('valid refresh request passes schema validation', () => {
    const validRequest = {
      refresh_token: 'valid_refresh_token'
    };
    
    const valid = ajv.validate(RefreshRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid refresh request fails schema validation', () => {
    const invalidRequest = {
      refresh_token: ''
    };
    
    const valid = ajv.validate(RefreshRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(1);
  });

  test('refresh response mock matches schema', () => {
    const valid = ajv.validate(RefreshResponseSchema, successMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(successMock).toHaveProperty('access_token');
    expect(successMock).toHaveProperty('expires_in');
    expect(typeof successMock.access_token).toBe('string');
    expect(typeof successMock.expires_in).toBe('number');
    expect(successMock.expires_in).toBeGreaterThan(0);
  });
});