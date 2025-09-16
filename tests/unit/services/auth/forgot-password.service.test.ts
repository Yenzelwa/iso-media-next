import { forgotPasswordService } from '@/src/services/auth/forgot-password';

describe('Forgot Password Service', () => {
  test('returns message for valid email', async () => {
    const request = {
      email: 'user@example.com'
    };

    const result = await forgotPasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });

  test('returns message for different valid email', async () => {
    const request = {
      email: 'test@domain.com'
    };

    const result = await forgotPasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });

  test('returns mock data structure', async () => {
    const request = {
      email: 'check@structure.com'
    };

    const result = await forgotPasswordService(request);

    expect(typeof result.message).toBe('string');
    expect(result.message.length).toBeGreaterThan(0);
  });
});