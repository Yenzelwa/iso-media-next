import { logoutService } from '@/src/services/auth/logout';

describe('Logout Service', () => {
  test('returns success for valid logout request', async () => {
    const request = {
      token: 'valid_access_token'
    };

    const result = await logoutService(request);

    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully logged out');
  });

  test('returns success for logout without token', async () => {
    const result = await logoutService();

    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result.success).toBe(true);
  });

  test('returns mock data structure', async () => {
    const request = {
      token: 'test_token'
    };

    const result = await logoutService(request);

    expect(typeof result.success).toBe('boolean');
    expect(typeof result.message).toBe('string');
  });
});