import { resetPasswordService } from '@/src/services/auth/reset-password';

describe('Reset Password Service', () => {
  test('returns message for valid token and password', async () => {
    const request = {
      token: 'valid_reset_token',
      password: 'newPassword123'
    };

    const result = await resetPasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });

  test('throws error for invalid token', async () => {
    const request = {
      token: 'invalid_token',
      password: 'newPassword123'
    };

    await expect(resetPasswordService(request)).rejects.toThrow('Invalid or expired reset token');
  });

  test('returns mock data structure for valid request', async () => {
    const request = {
      token: 'test_valid_token',
      password: 'testPassword456'
    };

    const result = await resetPasswordService(request);

    expect(typeof result.message).toBe('string');
    expect(result.message.length).toBeGreaterThan(0);
  });
});