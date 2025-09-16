import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ForgotPasswordRequestSchema from '@/schemas/auth/ForgotPasswordRequest.schema.json';
import ForgotPasswordResponseSchema from '@/schemas/auth/ForgotPasswordResponse.schema.json';
import successMock from '@/mocks/auth/forgot-password.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Forgot Password Contract Tests', () => {
  test('valid forgot password request passes schema validation', () => {
    const validRequest = {
      email: 'user@example.com'
    };
    
    const valid = ajv.validate(ForgotPasswordRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid forgot password request fails schema validation', () => {
    const invalidRequest = {
      email: 'invalid-email'
    };
    
    const valid = ajv.validate(ForgotPasswordRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(1);
  });

  test('forgot password response mock matches schema', () => {
    const valid = ajv.validate(ForgotPasswordResponseSchema, successMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(successMock).toHaveProperty('message');
    expect(typeof successMock.message).toBe('string');
  });
});