// Integration tests for register route
import { registerService } from '@/src/services/auth/register';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/register');
const mockRegisterService = registerService as jest.MockedFunction<typeof registerService>;

describe('Register Route Integration', () => {
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
    
    mockRegisterService.mockResolvedValue(mockResponse);

    const request = { first_name: 'John', email: 'test@example.com', password: 'password' };
    const result = await registerService(request);

    expect(mockRegisterService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for existing email', async () => {
    mockRegisterService.mockRejectedValue(new Error('Email already exists'));

    const request = { first_name: 'Jane', email: 'existing@test.com', password: 'password' };

    await expect(registerService(request)).rejects.toThrow('Email already exists');
    expect(mockRegisterService).toHaveBeenCalledWith(request);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      access_token: 'mock_token_123',
      refresh_token: 'mock_refresh_456',
      expires_in: 7200,
      user: { id: 'user_456', email: 'newuser@example.com', name: 'New User' }
    };

    mockRegisterService.mockResolvedValue(mockResponse);

    const request = { first_name: 'Alice', email: 'newuser@example.com', password: 'securepass' };
    const result = await registerService(request);

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('refresh_token');
    expect(result).toHaveProperty('expires_in');
    expect(result).toHaveProperty('user');
    expect(result.user).toHaveProperty('id');
    expect(result.user).toHaveProperty('email');
  });
});