import { refreshService } from '@/src/services/auth/refresh';

describe('Refresh Service', () => {
  test('returns new access token for valid refresh token', async () => {
    const request = {
      refresh_token: 'valid_refresh_token'
    };

    const result = await refreshService(request);

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('expires_in');
    expect(typeof result.access_token).toBe('string');
    expect(typeof result.expires_in).toBe('number');
  });

  test('throws error for invalid refresh token', async () => {
    const request = {
      refresh_token: 'invalid_token'
    };

    await expect(refreshService(request)).rejects.toThrow('Invalid or expired refresh token');
  });

  test('returns mock data structure', async () => {
    const request = {
      refresh_token: 'test_refresh_token'
    };

    const result = await refreshService(request);

    expect(typeof result.access_token).toBe('string');
    expect(typeof result.expires_in).toBe('number');
    expect(result.expires_in).toBeGreaterThan(0);
  });
});