import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import LoginRequestSchema from '@/schemas/auth/LoginRequest.schema.json';
import LoginResponseSchema from '@/schemas/auth/LoginResponse.schema.json';
import successMock from '@/mocks/auth/login.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Auth Login Contract Tests', () => {
  test('valid login request passes schema validation', () => {
    const validRequest = {
      email: 'user@example.com',
      password: 'password123'
    };
    
    const valid = ajv.validate(LoginRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid login request fails schema validation', () => {
    const invalidRequest = {
      email: 'invalid-email',
      password: ''
    };
    
    const valid = ajv.validate(LoginRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(2);
  });

  test('login response mock matches schema', () => {
    const valid = ajv.validate(LoginResponseSchema, successMock);
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