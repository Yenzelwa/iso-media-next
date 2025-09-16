import { registerService } from '@/src/services/auth/register';

describe('Register Service', () => {
  test('returns auth session for valid registration', async () => {
    const request = {
      first_name: 'John',
      email: 'newuser@example.com',
      password: 'password123'
    };

    const result = await registerService(request);

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('refresh_token');
    expect(result).toHaveProperty('expires_in');
    expect(result).toHaveProperty('user');
    expect(result.user.email).toBe('newuser@example.com');
  });

  test('throws error for existing email', async () => {
    const request = {
      first_name: 'John',
      email: 'existing@test.com',
      password: 'password123'
    };

    await expect(registerService(request)).rejects.toThrow('Email already exists');
  });

  test('returns mock data structure', async () => {
    const request = {
      first_name: 'Jane',
      email: 'jane@example.com',
      password: 'password123'
    };

    const result = await registerService(request);

    expect(typeof result.access_token).toBe('string');
    expect(typeof result.refresh_token).toBe('string');
    expect(typeof result.expires_in).toBe('number');
    expect(typeof result.user.id).toBeDefined();
    expect(typeof result.user.email).toBe('string');
  });
});