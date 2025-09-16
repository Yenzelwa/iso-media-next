import { changePasswordService } from '@/src/services/auth/change-password';

describe('Change Password Service', () => {
  test('returns message for valid current and new password', async () => {
    const request = {
      current_password: 'current123',
      new_password: 'newPassword456'
    };

    const result = await changePasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });

  test('throws error for incorrect current password', async () => {
    const request = {
      current_password: 'wrong_password',
      new_password: 'newPassword456'
    };

    await expect(changePasswordService(request)).rejects.toThrow('Current password is incorrect');
  });

  test('returns mock data structure for valid request', async () => {
    const request = {
      current_password: 'validCurrent',
      new_password: 'validNew789'
    };

    const result = await changePasswordService(request);

    expect(typeof result.message).toBe('string');
    expect(result.message.length).toBeGreaterThan(0);
  });
});