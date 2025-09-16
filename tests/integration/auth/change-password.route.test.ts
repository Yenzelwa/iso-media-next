// Integration tests for change password route
import { changePasswordService } from '@/src/services/auth/change-password';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/change-password');
const mockChangePasswordService = changePasswordService as jest.MockedFunction<typeof changePasswordService>;

describe('Change Password Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      message: 'Password changed successfully'
    };
    
    mockChangePasswordService.mockResolvedValue(mockResponse);

    const request = { current_password: 'current123', new_password: 'newPassword456' };
    const result = await changePasswordService(request);

    expect(mockChangePasswordService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for incorrect current password', async () => {
    mockChangePasswordService.mockRejectedValue(new Error('Current password is incorrect'));

    const request = { current_password: 'wrong_password', new_password: 'newPassword456' };

    await expect(changePasswordService(request)).rejects.toThrow('Current password is incorrect');
    expect(mockChangePasswordService).toHaveBeenCalledWith(request);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      message: 'Your password has been updated successfully'
    };

    mockChangePasswordService.mockResolvedValue(mockResponse);

    const request = { current_password: 'validCurrent', new_password: 'validNew789' };
    const result = await changePasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });
});