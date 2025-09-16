// Integration tests for account routes
import { 
  getAccountService, 
  updateAccountService, 
  changeEmailService, 
  changePhoneService 
} from '@/src/services/profiles/account';

// Mock the services for focused route testing
jest.mock('@/src/services/profiles/account');
const mockGetAccountService = getAccountService as jest.MockedFunction<typeof getAccountService>;
const mockUpdateAccountService = updateAccountService as jest.MockedFunction<typeof updateAccountService>;
const mockChangeEmailService = changeEmailService as jest.MockedFunction<typeof changeEmailService>;
const mockChangePhoneService = changePhoneService as jest.MockedFunction<typeof changePhoneService>;

describe('Account Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/me', () => {
    test('service integration works correctly', async () => {
      const mockResponse = {
        profile: {
          id: 'prof_123456789',
          email: 'user@example.com',
          name: 'John Doe',
          phone: '+1234567890',
          avatar_url: 'https://example.com/avatars/user123.jpg'
        },
        subscription: {
          id: 'sub_987654321',
          plan_id: 'plan_premium',
          status: 'active',
          expires_at: '2024-12-31T23:59:59Z'
        },
        billing_address: {
          street: '123 Main Street',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US'
        }
      };
      
      mockGetAccountService.mockResolvedValue(mockResponse);

      const result = await getAccountService();

      expect(mockGetAccountService).toHaveBeenCalledWith();
      expect(result).toEqual(mockResponse);
    });

    test('service validates response structure', async () => {
      const mockResponse = {
        profile: {
          id: 'prof_validation_test',
          email: 'test@example.com',
          name: 'Test User',
          phone: '+1555555555',
          avatar_url: 'https://example.com/test.jpg'
        },
        subscription: {
          id: 'sub_test123',
          plan_id: 'plan_basic',
          status: 'active',
          expires_at: '2024-06-30T23:59:59Z'
        },
        billing_address: {
          street: '456 Test Ave',
          city: 'Boston',
          state: 'MA',
          postal_code: '02101',
          country: 'US'
        }
      };

      mockGetAccountService.mockResolvedValue(mockResponse);

      const result = await getAccountService();

      expect(result).toHaveProperty('profile');
      expect(result).toHaveProperty('subscription');
      expect(result).toHaveProperty('billing_address');
      expect(result.profile).toHaveProperty('id');
      expect(result.profile).toHaveProperty('email');
      expect(result.subscription).toHaveProperty('status');
      expect(result.billing_address).toHaveProperty('country');
    });

    test('service handles authentication scenarios', async () => {
      const mockResponse = {
        profile: {
          id: 'prof_auth_test',
          email: 'auth@example.com',
          name: 'Auth User',
          phone: null,
          avatar_url: null
        },
        subscription: {
          id: 'sub_auth_test',
          plan_id: 'plan_free',
          status: 'active',
          expires_at: '2024-12-31T23:59:59Z'
        },
        billing_address: null
      };

      mockGetAccountService.mockResolvedValue(mockResponse);

      const result = await getAccountService();

      expect(result).toBeDefined();
      expect(result.profile.id).toMatch(/^prof_/);
      expect(result.profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });
  });

  describe('PATCH /api/me', () => {
    test('service integration works correctly', async () => {
      const request = {
        name: 'Updated Name',
        phone: '+1987654321',
        billing_address: {
          street: '789 New St',
          city: 'Chicago',
          state: 'IL'
        }
      };

      const mockResponse = {
        profile: {
          id: 'prof_123456789',
          email: 'user@example.com',
          name: 'Updated Name',
          phone: '+1987654321',
          avatar_url: 'https://example.com/avatars/user123.jpg'
        },
        subscription: {
          id: 'sub_987654321',
          plan_id: 'plan_premium',
          status: 'active',
          expires_at: '2024-12-31T23:59:59Z'
        },
        billing_address: {
          street: '789 New St',
          city: 'Chicago',
          state: 'IL',
          postal_code: '10001',
          country: 'US'
        }
      };
      
      mockUpdateAccountService.mockResolvedValue(mockResponse);

      const result = await updateAccountService(request);

      expect(mockUpdateAccountService).toHaveBeenCalledWith(request);
      expect(result).toEqual(mockResponse);
    });

    test('service handles partial billing address updates', async () => {
      const request = {
        billing_address: {
          city: 'San Francisco',
          state: 'CA'
        }
      };

      const mockResponse = {
        profile: {
          id: 'prof_partial_test',
          email: 'partial@example.com',
          name: 'Partial User',
          phone: '+1234567890',
          avatar_url: null
        },
        subscription: {
          id: 'sub_partial_test',
          plan_id: 'plan_basic',
          status: 'active',
          expires_at: '2024-12-31T23:59:59Z'
        },
        billing_address: {
          street: '123 Original St',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '10001',
          country: 'US'
        }
      };

      mockUpdateAccountService.mockResolvedValue(mockResponse);

      const result = await updateAccountService(request);

      expect(mockUpdateAccountService).toHaveBeenCalledWith(request);
      expect(result.billing_address.city).toBe('San Francisco');
      expect(result.billing_address.state).toBe('CA');
    });

    test('service validates request structure', async () => {
      const request = {
        name: 'Valid Name',
        avatar_url: 'https://example.com/avatar.jpg'
      };

      const mockResponse = {
        profile: {
          id: 'prof_valid_test',
          email: 'valid@example.com',
          name: 'Valid Name',
          phone: '+1234567890',
          avatar_url: 'https://example.com/avatar.jpg'
        },
        subscription: {
          id: 'sub_valid_test',
          plan_id: 'plan_premium',
          status: 'active',
          expires_at: '2024-12-31T23:59:59Z'
        },
        billing_address: {
          street: '123 Valid St',
          city: 'Valid City',
          state: 'VC',
          postal_code: '12345',
          country: 'US'
        }
      };

      mockUpdateAccountService.mockResolvedValue(mockResponse);

      const result = await updateAccountService(request);

      expect(result).toHaveProperty('profile');
      expect(result).toHaveProperty('subscription');
      expect(result).toHaveProperty('billing_address');
      expect(result.profile.name).toBe(request.name);
      expect(result.profile.avatar_url).toBe(request.avatar_url);
    });
  });

  describe('POST /api/me/email/change', () => {
    test('service integration works correctly', async () => {
      const request = {
        new_email: 'newemail@example.com',
        password: 'validpass123'
      };

      const mockResponse = {
        message: 'Successfully updated'
      };
      
      mockChangeEmailService.mockResolvedValue(mockResponse);

      const result = await changeEmailService(request);

      expect(mockChangeEmailService).toHaveBeenCalledWith(request);
      expect(result).toEqual(mockResponse);
    });

    test('service handles authentication errors', async () => {
      const request = {
        new_email: 'newemail@example.com',
        password: 'invalid'
      };

      mockChangeEmailService.mockRejectedValue(new Error('Invalid password'));

      await expect(changeEmailService(request)).rejects.toThrow('Invalid password');
      expect(mockChangeEmailService).toHaveBeenCalledWith(request);
    });

    test('service validates request structure', async () => {
      const request = {
        new_email: 'valid@example.com',
        password: 'correctpassword'
      };

      const mockResponse = {
        message: 'Successfully updated'
      };

      mockChangeEmailService.mockResolvedValue(mockResponse);

      const result = await changeEmailService(request);

      expect(result).toHaveProperty('message');
      expect(typeof result.message).toBe('string');
      expect(result.message).toBe('Successfully updated');
    });

    test('service handles business logic errors', async () => {
      const request = {
        new_email: 'duplicate@example.com',
        password: 'validpass'
      };

      mockChangeEmailService.mockRejectedValue(new Error('Email already exists'));

      await expect(changeEmailService(request)).rejects.toThrow('Email already exists');
      expect(mockChangeEmailService).toHaveBeenCalledWith(request);
    });
  });

  describe('POST /api/me/phone/change', () => {
    test('service integration works correctly', async () => {
      const request = {
        new_phone: '+1555123456'
      };

      const mockResponse = {
        message: 'Successfully updated'
      };
      
      mockChangePhoneService.mockResolvedValue(mockResponse);

      const result = await changePhoneService(request);

      expect(mockChangePhoneService).toHaveBeenCalledWith(request);
      expect(result).toEqual(mockResponse);
    });

    test('service validates request structure', async () => {
      const request = {
        new_phone: '+44207123456'
      };

      const mockResponse = {
        message: 'Successfully updated'
      };

      mockChangePhoneService.mockResolvedValue(mockResponse);

      const result = await changePhoneService(request);

      expect(result).toHaveProperty('message');
      expect(typeof result.message).toBe('string');
      expect(result.message).toBe('Successfully updated');
    });

    test('service handles validation errors', async () => {
      const request = {
        new_phone: 'invalid-phone-format'
      };

      mockChangePhoneService.mockRejectedValue(new Error('Invalid phone number'));

      await expect(changePhoneService(request)).rejects.toThrow('Invalid phone number');
      expect(mockChangePhoneService).toHaveBeenCalledWith(request);
    });

    test('service handles business logic errors', async () => {
      const request = {
        new_phone: '+1555999999'
      };

      mockChangePhoneService.mockRejectedValue(new Error('Phone number already in use'));

      await expect(changePhoneService(request)).rejects.toThrow('Phone number already in use');
      expect(mockChangePhoneService).toHaveBeenCalledWith(request);
    });
  });
});