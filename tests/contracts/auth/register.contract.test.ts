import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import RegisterRequestSchema from '@/schemas/auth/RegisterRequest.schema.json';
import RegisterResponseSchema from '@/schemas/auth/RegisterResponse.schema.json';
import successMock from '@/mocks/auth/register.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Register Contract Tests', () => {
  test('valid register request passes schema validation', () => {
    const validRequest = {
      first_name: 'John',
      email: 'user@example.com',
      password: 'password123'
    };
    
    const valid = ajv.validate(RegisterRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid register request fails schema validation', () => {
    const invalidRequest = {
      first_name: '',
      email: 'invalid-email',
      password: ''
    };
    
    const valid = ajv.validate(RegisterRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(3);
  });

  test('register response mock matches schema', () => {
    const valid = ajv.validate(RegisterResponseSchema, successMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(successMock).toHaveProperty('access_token');
    expect(successMock).toHaveProperty('refresh_token');
    expect(successMock).toHaveProperty('expires_in');
    expect(successMock).toHaveProperty('user');
    expect(successMock.user).toHaveProperty('id');
    expect(successMock.user).toHaveProperty('email');
  });
});