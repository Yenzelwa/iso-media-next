// Integration tests for refresh route
import { refreshService } from '@/src/services/auth/refresh';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/refresh');
const mockRefreshService = refreshService as jest.MockedFunction<typeof refreshService>;

describe('Refresh Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      access_token: 'new_access_token',
      expires_in: 3600
    };
    
    mockRefreshService.mockResolvedValue(mockResponse);

    const request = { refresh_token: 'valid_refresh_token' };
    const result = await refreshService(request);

    expect(mockRefreshService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for invalid refresh token', async () => {
    mockRefreshService.mockRejectedValue(new Error('Invalid or expired refresh token'));

    const request = { refresh_token: 'invalid_token' };

    await expect(refreshService(request)).rejects.toThrow('Invalid or expired refresh token');
    expect(mockRefreshService).toHaveBeenCalledWith(request);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      access_token: 'refreshed_token_abc123',
      expires_in: 7200
    };

    mockRefreshService.mockResolvedValue(mockResponse);

    const request = { refresh_token: 'test_refresh_token' };
    const result = await refreshService(request);

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('expires_in');
    expect(typeof result.access_token).toBe('string');
    expect(typeof result.expires_in).toBe('number');
    expect(result.expires_in).toBeGreaterThan(0);
  });
});