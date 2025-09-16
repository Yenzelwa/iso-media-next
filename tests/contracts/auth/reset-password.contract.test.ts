import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ResetPasswordRequestSchema from '@/schemas/auth/ResetPasswordRequest.schema.json';
import ResetPasswordResponseSchema from '@/schemas/auth/ResetPasswordResponse.schema.json';
import successMock from '@/mocks/auth/reset-password.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Reset Password Contract Tests', () => {
  test('valid reset password request passes schema validation', () => {
    const validRequest = {
      token: 'valid_reset_token',
      password: 'newPassword123'
    };
    
    const valid = ajv.validate(ResetPasswordRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid reset password request fails schema validation', () => {
    const invalidRequest = {
      token: '',
      password: ''
    };
    
    const valid = ajv.validate(ResetPasswordRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(2);
  });

  test('reset password response mock matches schema', () => {
    const valid = ajv.validate(ResetPasswordResponseSchema, successMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(successMock).toHaveProperty('message');
    expect(typeof successMock.message).toBe('string');
  });
});