import { loginService } from '@/src/services/auth/login';

describe('Login Service', () => {
  test('returns auth session for valid credentials', async () => {
    const request = {
      email: 'user@example.com',
      password: 'password123'
    };

    const result = await loginService(request);

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('refresh_token');
    expect(result).toHaveProperty('expires_in');
    expect(result).toHaveProperty('user');
    expect(result.user.email).toBe('user@example.com');
  });

  test('throws error for invalid credentials', async () => {
    const request = {
      email: 'invalid@test.com',
      password: 'wrong'
    };

    await expect(loginService(request)).rejects.toThrow('Invalid credentials');
  });

  test('returns mock data structure', async () => {
    const request = {
      email: 'test@example.com',
      password: 'password'
    };

    const result = await loginService(request);

    expect(typeof result.access_token).toBe('string');
    expect(typeof result.refresh_token).toBe('string');
    expect(typeof result.expires_in).toBe('number');
    expect(typeof result.user.id).toBeDefined();
    expect(typeof result.user.email).toBe('string');
  });
});