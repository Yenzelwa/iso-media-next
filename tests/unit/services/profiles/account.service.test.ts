import { 
  getAccountService, 
  updateAccountService, 
  changeEmailService, 
  changePhoneService,
  UpdateAccountRequest,
  ChangeEmailRequest,
  ChangePhoneRequest
} from '@/src/services/profiles/account';

describe('Account Service', () => {
  describe('getAccountService', () => {
    test('returns account data with required fields', async () => {
      const result = await getAccountService();

      expect(result).toHaveProperty('profile');
      expect(result).toHaveProperty('subscription');
      expect(result).toHaveProperty('billing_address');
      expect(result.profile).toHaveProperty('id');
      expect(result.profile).toHaveProperty('email');
      expect(result.profile).toHaveProperty('name');
    });

    test('returns valid account data structure', async () => {
      const result = await getAccountService();

      expect(typeof result.profile.id).toBe('string');
      expect(typeof result.profile.email).toBe('string');
      expect(typeof result.profile.name).toBe('string');
      expect(result.profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(result.profile.id).toMatch(/^prof_/);
      expect(result.subscription).toHaveProperty('id');
      expect(result.subscription).toHaveProperty('plan_id');
      expect(result.subscription).toHaveProperty('status');
    });

    test('returns consistent mock data', async () => {
      const result1 = await getAccountService();
      const result2 = await getAccountService();

      expect(result1).toEqual(result2);
    });

    test('billing address has correct structure', async () => {
      const result = await getAccountService();

      expect(result.billing_address).toHaveProperty('street');
      expect(result.billing_address).toHaveProperty('city');
      expect(result.billing_address).toHaveProperty('state');
      expect(result.billing_address).toHaveProperty('postal_code');
      expect(result.billing_address).toHaveProperty('country');
    });
  });

  describe('updateAccountService', () => {
    test('returns updated account for valid request', async () => {
      const request: UpdateAccountRequest = {
        name: 'Updated Name',
        phone: '+1987654321'
      };

      const result = await updateAccountService(request);

      expect(result).toHaveProperty('profile');
      expect(result).toHaveProperty('subscription');
      expect(result).toHaveProperty('billing_address');
    });

    test('handles partial updates', async () => {
      const request: UpdateAccountRequest = {
        name: 'New Name Only'
      };

      const result = await updateAccountService(request);

      expect(result).toBeDefined();
      expect(result.profile).toHaveProperty('id');
      expect(typeof result.profile.name).toBe('string');
    });

    test('handles billing address updates', async () => {
      const request: UpdateAccountRequest = {
        billing_address: {
          street: '456 New St',
          city: 'Boston',
          state: 'MA'
        }
      };

      const result = await updateAccountService(request);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('billing_address');
      expect(result.billing_address).toHaveProperty('street');
    });

    test('handles null values in request', async () => {
      const request: UpdateAccountRequest = {
        phone: null,
        avatar_url: null
      };

      const result = await updateAccountService(request);

      expect(result).toBeDefined();
      expect(result.profile).toHaveProperty('id');
    });

    test('handles empty request object', async () => {
      const request: UpdateAccountRequest = {};

      const result = await updateAccountService(request);

      expect(result).toBeDefined();
      expect(result.profile).toHaveProperty('id');
      expect(result.profile).toHaveProperty('email');
    });
  });

  describe('changeEmailService', () => {
    test('returns success for valid email change request', async () => {
      const request: ChangeEmailRequest = {
        new_email: 'newemail@example.com',
        password: 'validpass'
      };

      const result = await changeEmailService(request);

      expect(result).toHaveProperty('message');
      expect(result.message).toBe('Successfully updated');
    });

    test('throws error for invalid password', async () => {
      const request: ChangeEmailRequest = {
        new_email: 'newemail@example.com',
        password: 'invalid'
      };

      await expect(changeEmailService(request)).rejects.toThrow('Invalid password');
    });

    test('validates request structure', async () => {
      const request: ChangeEmailRequest = {
        new_email: 'test@domain.com',
        password: 'correctpass'
      };

      const result = await changeEmailService(request);

      expect(typeof result.message).toBe('string');
    });

    test('handles different valid passwords', async () => {
      const request: ChangeEmailRequest = {
        new_email: 'another@example.com',
        password: 'somevalidpassword123'
      };

      const result = await changeEmailService(request);

      expect(result).toHaveProperty('message');
      expect(result.message).toBe('Successfully updated');
    });
  });

  describe('changePhoneService', () => {
    test('returns success for valid phone change request', async () => {
      const request: ChangePhoneRequest = {
        new_phone: '+1555123456'
      };

      const result = await changePhoneService(request);

      expect(result).toHaveProperty('message');
      expect(result.message).toBe('Successfully updated');
    });

    test('handles international phone numbers', async () => {
      const request: ChangePhoneRequest = {
        new_phone: '+44207123456'
      };

      const result = await changePhoneService(request);

      expect(result).toHaveProperty('message');
      expect(typeof result.message).toBe('string');
    });

    test('validates request structure', async () => {
      const request: ChangePhoneRequest = {
        new_phone: '+15551234567'
      };

      const result = await changePhoneService(request);

      expect(typeof result.message).toBe('string');
      expect(result.message).toBe('Successfully updated');
    });

    test('handles different phone formats', async () => {
      const request: ChangePhoneRequest = {
        new_phone: '555-123-4567'
      };

      const result = await changePhoneService(request);

      expect(result).toHaveProperty('message');
    });
  });
});