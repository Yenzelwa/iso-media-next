import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ChangePasswordRequestSchema from '@/schemas/auth/ChangePasswordRequest.schema.json';
import ChangePasswordResponseSchema from '@/schemas/auth/ChangePasswordResponse.schema.json';
import successMock from '@/mocks/auth/change-password.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Change Password Contract Tests', () => {
  test('valid change password request passes schema validation', () => {
    const validRequest = {
      current_password: 'current123',
      new_password: 'newPassword456'
    };
    
    const valid = ajv.validate(ChangePasswordRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid change password request fails schema validation', () => {
    const invalidRequest = {
      current_password: '',
      new_password: ''
    };
    
    const valid = ajv.validate(ChangePasswordRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(2);
  });

  test('change password response mock matches schema', () => {
    const valid = ajv.validate(ChangePasswordResponseSchema, successMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(successMock).toHaveProperty('message');
    expect(typeof successMock.message).toBe('string');
  });
});