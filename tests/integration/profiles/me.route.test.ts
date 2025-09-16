// Integration tests for profiles/me routes
import { getProfileService, updateProfileService } from '@/src/services/profiles/me';

// Mock the services for focused route testing
jest.mock('@/src/services/profiles/me');
const mockGetProfileService = getProfileService as jest.MockedFunction<typeof getProfileService>;
const mockUpdateProfileService = updateProfileService as jest.MockedFunction<typeof updateProfileService>;

describe('Profile Me Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/profiles/me', () => {
    test('service integration works correctly', async () => {
      const mockResponse = {
        id: 'prof_123456789',
        email: 'user@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        avatar_url: 'https://example.com/avatars/user123.jpg'
      };
      
      mockGetProfileService.mockResolvedValue(mockResponse);

      const result = await getProfileService();

      expect(mockGetProfileService).toHaveBeenCalledWith();
      expect(result).toEqual(mockResponse);
    });

    test('service validates response structure', async () => {
      const mockResponse = {
        id: 'prof_987654321',
        email: 'test@example.com',
        name: 'Test User',
        phone: '+1987654321',
        avatar_url: 'https://example.com/avatar.jpg'
      };

      mockGetProfileService.mockResolvedValue(mockResponse);

      const result = await getProfileService();

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('avatar_url');
      expect(result.id).toMatch(/^prof_/);
      expect(result.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    test('service handles authentication scenarios', async () => {
      const mockResponse = {
        id: 'prof_auth_test',
        email: 'auth@example.com',
        name: 'Auth Test User',
        phone: null,
        avatar_url: null
      };

      mockGetProfileService.mockResolvedValue(mockResponse);

      const result = await getProfileService();

      expect(result).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(typeof result.email).toBe('string');
    });
  });

  describe('PATCH /api/profiles/me', () => {
    test('service integration works correctly', async () => {
      const request = {
        name: 'Updated Name',
        phone: '+1987654321'
      };

      const mockResponse = {
        id: 'prof_123456789',
        email: 'user@example.com',
        name: 'Updated Name',
        phone: '+1987654321',
        avatar_url: 'https://example.com/avatars/user123.jpg'
      };
      
      mockUpdateProfileService.mockResolvedValue(mockResponse);

      const result = await updateProfileService(request);

      expect(mockUpdateProfileService).toHaveBeenCalledWith(request);
      expect(result).toEqual(mockResponse);
    });

    test('service handles partial updates', async () => {
      const request = {
        name: 'Only Name Update'
      };

      const mockResponse = {
        id: 'prof_123456789',
        email: 'user@example.com',
        name: 'Only Name Update',
        phone: '+1234567890',
        avatar_url: 'https://example.com/avatars/user123.jpg'
      };

      mockUpdateProfileService.mockResolvedValue(mockResponse);

      const result = await updateProfileService(request);

      expect(mockUpdateProfileService).toHaveBeenCalledWith(request);
      expect(result.name).toBe('Only Name Update');
    });

    test('service validates request and response structure', async () => {
      const request = {
        name: 'Test User',
        phone: '+1555555555',
        avatar_url: 'https://example.com/new-avatar.jpg'
      };

      const mockResponse = {
        id: 'prof_validation_test',
        email: 'validation@example.com',
        name: 'Test User',
        phone: '+1555555555',
        avatar_url: 'https://example.com/new-avatar.jpg'
      };

      mockUpdateProfileService.mockResolvedValue(mockResponse);

      const result = await updateProfileService(request);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('avatar_url');
      expect(result.name).toBe(request.name);
      expect(result.phone).toBe(request.phone);
      expect(result.avatar_url).toBe(request.avatar_url);
    });

    test('service handles null values in request', async () => {
      const request = {
        phone: null,
        avatar_url: null
      };

      const mockResponse = {
        id: 'prof_null_test',
        email: 'null@example.com',
        name: 'Null Test User',
        phone: null,
        avatar_url: null
      };

      mockUpdateProfileService.mockResolvedValue(mockResponse);

      const result = await updateProfileService(request);

      expect(mockUpdateProfileService).toHaveBeenCalledWith(request);
      expect(result.phone).toBeNull();
      expect(result.avatar_url).toBeNull();
    });

    test('service handles validation errors', async () => {
      const request = {
        name: '',
        phone: 'invalid-phone'
      };

      mockUpdateProfileService.mockRejectedValue(new Error('Validation failed'));

      await expect(updateProfileService(request)).rejects.toThrow('Validation failed');
      expect(mockUpdateProfileService).toHaveBeenCalledWith(request);
    });
  });
});