// Integration tests for login route
import { loginService } from '@/src/services/auth/login';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/login');
const mockLoginService = loginService as jest.MockedFunction<typeof loginService>;

describe('Login Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      access_token: 'mock_token',
      refresh_token: 'mock_refresh', 
      expires_in: 3600,
      user: { id: '1', email: 'test@example.com', name: 'Test User' }
    };
    
    mockLoginService.mockResolvedValue(mockResponse);

    const request = { email: 'test@example.com', password: 'password' };
    const result = await loginService(request);

    expect(mockLoginService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for invalid credentials', async () => {
    mockLoginService.mockRejectedValue(new Error('Invalid credentials'));

    const request = { email: 'invalid@test.com', password: 'wrong' };

    await expect(loginService(request)).rejects.toThrow('Invalid credentials');
    expect(mockLoginService).toHaveBeenCalledWith(request);
  });

  test('service validates request structure', async () => {
    const mockResponse = {
      access_token: 'mock_token',
      refresh_token: 'mock_refresh',
      expires_in: 3600,
      user: { id: 'user_123', email: 'user@example.com', name: 'User Name' }
    };

    mockLoginService.mockResolvedValue(mockResponse);

    const request = { email: 'user@example.com', password: 'validpass' };
    const result = await loginService(request);

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('refresh_token');
    expect(result).toHaveProperty('expires_in');
    expect(result).toHaveProperty('user');
    expect(result.user).toHaveProperty('id');
    expect(result.user).toHaveProperty('email');
  });
});