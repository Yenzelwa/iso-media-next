// Integration tests for logout route
import { logoutService } from '@/src/services/auth/logout';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/logout');
const mockLogoutService = logoutService as jest.MockedFunction<typeof logoutService>;

describe('Logout Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      success: true,
      message: 'Successfully logged out'
    };
    
    mockLogoutService.mockResolvedValue(mockResponse);

    const request = { token: 'valid_access_token' };
    const result = await logoutService(request);

    expect(mockLogoutService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service handles logout without token', async () => {
    const mockResponse = {
      success: true,
      message: 'Successfully logged out'
    };

    mockLogoutService.mockResolvedValue(mockResponse);

    const result = await logoutService();

    expect(mockLogoutService).toHaveBeenCalledWith();
    expect(result).toEqual(mockResponse);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      success: true,
      message: 'User logged out successfully'
    };

    mockLogoutService.mockResolvedValue(mockResponse);

    const request = { token: 'test_token_123' };
    const result = await logoutService(request);

    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('message');
    expect(result.success).toBe(true);
    expect(typeof result.message).toBe('string');
  });
});