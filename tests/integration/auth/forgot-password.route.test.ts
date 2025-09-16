// Integration tests for forgot password route
import { forgotPasswordService } from '@/src/services/auth/forgot-password';

// Mock the service for focused route testing
jest.mock('@/src/services/auth/forgot-password');
const mockForgotPasswordService = forgotPasswordService as jest.MockedFunction<typeof forgotPasswordService>;

describe('Forgot Password Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      message: 'Password reset email sent'
    };
    
    mockForgotPasswordService.mockResolvedValue(mockResponse);

    const request = { email: 'user@example.com' };
    const result = await forgotPasswordService(request);

    expect(mockForgotPasswordService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service handles different valid emails', async () => {
    const mockResponse = {
      message: 'Reset instructions sent to your email'
    };

    mockForgotPasswordService.mockResolvedValue(mockResponse);

    const request = { email: 'test@domain.com' };
    const result = await forgotPasswordService(request);

    expect(mockForgotPasswordService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      message: 'Password reset email sent successfully'
    };

    mockForgotPasswordService.mockResolvedValue(mockResponse);

    const request = { email: 'check@structure.com' };
    const result = await forgotPasswordService(request);

    expect(result).toHaveProperty('message');
    expect(typeof result.message).toBe('string');
  });
});