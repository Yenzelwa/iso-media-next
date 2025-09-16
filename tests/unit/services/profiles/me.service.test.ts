import { getProfileService, updateProfileService, UpdateProfileRequest } from '@/src/services/profiles/me';

describe('Profile Me Service', () => {
  describe('getProfileService', () => {
    test('returns profile data with required fields', async () => {
      const result = await getProfileService();

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('avatar_url');
    });

    test('returns valid profile data structure', async () => {
      const result = await getProfileService();

      expect(typeof result.id).toBe('string');
      expect(typeof result.email).toBe('string');
      expect(typeof result.name).toBe('string');
      expect(result.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(result.id).toMatch(/^prof_/);
    });

    test('returns consistent mock data', async () => {
      const result1 = await getProfileService();
      const result2 = await getProfileService();

      expect(result1).toEqual(result2);
    });
  });

  describe('updateProfileService', () => {
    test('returns updated profile for valid request', async () => {
      const request: UpdateProfileRequest = {
        name: 'Updated Name',
        phone: '+1987654321'
      };

      const result = await updateProfileService(request);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('avatar_url');
    });

    test('handles partial updates', async () => {
      const request: UpdateProfileRequest = {
        name: 'New Name Only'
      };

      const result = await updateProfileService(request);

      expect(result).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(typeof result.name).toBe('string');
    });

    test('handles null values in request', async () => {
      const request: UpdateProfileRequest = {
        phone: null,
        avatar_url: null
      };

      const result = await updateProfileService(request);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
    });

    test('returns valid data structure', async () => {
      const request: UpdateProfileRequest = {
        name: 'Test User',
        phone: '+1555555555',
        avatar_url: 'https://example.com/avatar.jpg'
      };

      const result = await updateProfileService(request);

      expect(typeof result.id).toBe('string');
      expect(typeof result.email).toBe('string');
      expect(typeof result.name).toBe('string');
      expect(result.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    test('handles empty request object', async () => {
      const request: UpdateProfileRequest = {};

      const result = await updateProfileService(request);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('email');
    });
  });
});