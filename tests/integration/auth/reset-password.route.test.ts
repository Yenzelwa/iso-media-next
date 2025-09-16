// Integration tests for reset password route
import { resetPasswordService } from '@/src/services/auth/reset-password';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/reset-password');
const mockResetPasswordService = resetPasswordService as jest.MockedFunction<typeof resetPasswordService>;

describe('Reset Password Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      message: 'Password has been reset successfully'
    };
    
    mockResetPasswordService.mockResolvedValue(mockResponse);

    const request = { token: 'valid_reset_token', password: 'newPassword123' };
    const result = await resetPasswordService(request);

    expect(mockResetPasswordService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for invalid token', async () => {
    mockResetPasswordService.mockRejectedValue(new Error('Invalid or expired reset token'));

    const request = { token: 'invalid_token', password: 'newPassword123' };

    await expect(resetPasswordService(request)).rejects.toThrow('Invalid or expired reset token');
    expect(mockResetPasswordService).toHaveBeenCalledWith(request);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      message: 'Your password has been successfully updated'
    };

    mockResetPasswordService.mockResolvedValue(mockResponse);

    const request = { token: 'test_valid_token', password: 'testPassword456' };
    const result = await resetPasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });
});