import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import AccountSchema from '@/schemas/profiles/Account.schema.json';
import UpdateAccountRequestSchema from '@/schemas/profiles/UpdateAccountRequest.schema.json';
import ChangeEmailRequestSchema from '@/schemas/profiles/ChangeEmailRequest.schema.json';
import ChangePhoneRequestSchema from '@/schemas/profiles/ChangePhoneRequest.schema.json';
import ChangeResponseSchema from '@/schemas/profiles/ChangeResponse.schema.json';
import accountMock from '@/mocks/profiles/account.json';
import updatedAccountMock from '@/mocks/profiles/account.updated.json';
import successMock from '@/mocks/profiles/change.success.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Account Contract Tests', () => {
  describe('GET /api/me', () => {
    test('account response mock matches schema', () => {
      const valid = ajv.validate(AccountSchema, accountMock);
      
      if (!valid) {
        console.log('Account validation errors:', ajv.errors);
      }
      
      expect(valid).toBe(true);
    });

    test('account response has required structure', () => {
      expect(accountMock).toHaveProperty('profile');
      expect(accountMock).toHaveProperty('subscription');
      expect(accountMock).toHaveProperty('billing_address');
      expect(accountMock.profile).toHaveProperty('id');
      expect(accountMock.profile).toHaveProperty('email');
      expect(accountMock.profile).toHaveProperty('name');
      expect(accountMock.subscription).toHaveProperty('id');
      expect(accountMock.subscription).toHaveProperty('plan_id');
      expect(accountMock.subscription).toHaveProperty('status');
    });

    test('account profile data types are correct', () => {
      expect(typeof accountMock.profile.id).toBe('string');
      expect(typeof accountMock.profile.email).toBe('string');
      expect(typeof accountMock.profile.name).toBe('string');
      expect(accountMock.profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(accountMock.profile.id).toMatch(/^prof_/);
    });

    test('account subscription data types are correct', () => {
      expect(typeof accountMock.subscription.id).toBe('string');
      expect(typeof accountMock.subscription.plan_id).toBe('string');
      expect(typeof accountMock.subscription.status).toBe('string');
      expect(['active', 'inactive', 'cancelled', 'expired']).toContain(accountMock.subscription.status);
    });

    test('account billing address data types are correct', () => {
      if (accountMock.billing_address) {
        expect(typeof accountMock.billing_address.street).toBe('string');
        expect(typeof accountMock.billing_address.city).toBe('string');
        expect(typeof accountMock.billing_address.state).toBe('string');
        expect(typeof accountMock.billing_address.postal_code).toBe('string');
        expect(typeof accountMock.billing_address.country).toBe('string');
      }
    });

    test('account with null subscription passes validation', () => {
      const accountWithNullSub = {
        ...accountMock,
        subscription: null
      };

      const valid = ajv.validate(AccountSchema, accountWithNullSub);
      expect(valid).toBe(true);
    });

    test('account with null billing address passes validation', () => {
      const accountWithNullBilling = {
        ...accountMock,
        billing_address: null
      };

      const valid = ajv.validate(AccountSchema, accountWithNullBilling);
      expect(valid).toBe(true);
    });

    test('account schema rejects invalid data', () => {
      const invalidAccount = {
        profile: {
          id: '',
          email: 'invalid-email',
          name: ''
        },
        subscription: {
          id: '',
          plan_id: '',
          status: 'invalid-status'
        },
        billing_address: {
          street: '',
          city: '',
          state: '',
          postal_code: '',
          country: ''
        }
      };

      const valid = ajv.validate(AccountSchema, invalidAccount);
      expect(valid).toBe(false);
      expect(ajv.errors).toBeDefined();
      expect(ajv.errors?.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /api/me', () => {
    test('valid update account request passes schema validation', () => {
      const validRequest = {
        name: 'Updated Name',
        phone: '+1987654321',
        avatar_url: 'https://example.com/avatar.jpg',
        billing_address: {
          street: '789 New Street',
          city: 'San Francisco',
          state: 'CA',
          postal_code: '94102',
          country: 'US'
        }
      };
      
      const valid = ajv.validate(UpdateAccountRequestSchema, validRequest);
      
      if (!valid) {
        console.log('Update account validation errors:', ajv.errors);
      }
      
      expect(valid).toBe(true);
    });

    test('partial update request passes schema validation', () => {
      const partialRequest = {
        name: 'New Name Only'
      };
      
      const valid = ajv.validate(UpdateAccountRequestSchema, partialRequest);
      expect(valid).toBe(true);
    });

    test('partial billing address update passes schema validation', () => {
      const billingOnlyRequest = {
        billing_address: {
          city: 'New City',
          state: 'NY'
        }
      };
      
      const valid = ajv.validate(UpdateAccountRequestSchema, billingOnlyRequest);
      expect(valid).toBe(true);
    });

    test('update request with null values passes schema validation', () => {
      const requestWithNulls = {
        phone: null,
        avatar_url: null
      };
      
      const valid = ajv.validate(UpdateAccountRequestSchema, requestWithNulls);
      expect(valid).toBe(true);
    });

    test('empty update request fails schema validation', () => {
      const emptyRequest = {};
      
      const valid = ajv.validate(UpdateAccountRequestSchema, emptyRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('minProperties');
    });

    test('invalid update request fails schema validation', () => {
      const invalidRequest = {
        name: '',
        phone: 123,
        avatar_url: 'not-a-url',
        billing_address: {
          street: ''
        }
      };
      
      const valid = ajv.validate(UpdateAccountRequestSchema, invalidRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.length).toBeGreaterThan(0);
    });

    test('updated account response mock matches schema', () => {
      const valid = ajv.validate(AccountSchema, updatedAccountMock);
      expect(valid).toBe(true);
    });
  });

  describe('POST /api/me/email/change', () => {
    test('valid email change request passes schema validation', () => {
      const validRequest = {
        new_email: 'newemail@example.com',
        password: 'validpassword123'
      };
      
      const valid = ajv.validate(ChangeEmailRequestSchema, validRequest);
      expect(valid).toBe(true);
    });

    test('email change request validates email format', () => {
      const invalidEmailRequest = {
        new_email: 'invalid-email',
        password: 'validpassword'
      };
      
      const valid = ajv.validate(ChangeEmailRequestSchema, invalidEmailRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('format');
    });

    test('email change request requires password', () => {
      const missingPasswordRequest = {
        new_email: 'valid@example.com'
      };
      
      const valid = ajv.validate(ChangeEmailRequestSchema, missingPasswordRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('required');
    });

    test('email change request rejects empty password', () => {
      const emptyPasswordRequest = {
        new_email: 'valid@example.com',
        password: ''
      };
      
      const valid = ajv.validate(ChangeEmailRequestSchema, emptyPasswordRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('minLength');
    });

    test('email change response mock matches schema', () => {
      const valid = ajv.validate(ChangeResponseSchema, successMock);
      expect(valid).toBe(true);
    });

    test('email change response has required message', () => {
      expect(successMock).toHaveProperty('message');
      expect(typeof successMock.message).toBe('string');
      expect(successMock.message).toBe('Successfully updated');
    });
  });

  describe('POST /api/me/phone/change', () => {
    test('valid phone change request passes schema validation', () => {
      const validRequest = {
        new_phone: '+1555123456'
      };
      
      const valid = ajv.validate(ChangePhoneRequestSchema, validRequest);
      expect(valid).toBe(true);
    });

    test('phone change request requires new_phone', () => {
      const missingPhoneRequest = {};
      
      const valid = ajv.validate(ChangePhoneRequestSchema, missingPhoneRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('required');
    });

    test('phone change request rejects empty phone', () => {
      const emptyPhoneRequest = {
        new_phone: ''
      };
      
      const valid = ajv.validate(ChangePhoneRequestSchema, emptyPhoneRequest);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('minLength');
    });

    test('phone change handles international formats', () => {
      const internationalRequest = {
        new_phone: '+44207123456'
      };
      
      const valid = ajv.validate(ChangePhoneRequestSchema, internationalRequest);
      expect(valid).toBe(true);
    });

    test('phone change response mock matches schema', () => {
      const valid = ajv.validate(ChangeResponseSchema, successMock);
      expect(valid).toBe(true);
    });

    test('phone change response has required structure', () => {
      expect(successMock).toHaveProperty('message');
      expect(typeof successMock.message).toBe('string');
      expect(successMock.message).toBe('Successfully updated');
    });

    test('change response schema validates message content', () => {
      const validResponse = {
        message: 'Operation completed successfully'
      };

      const valid = ajv.validate(ChangeResponseSchema, validResponse);
      expect(valid).toBe(true);
    });

    test('change response schema rejects invalid structure', () => {
      const invalidResponse = {
        success: true,
        data: 'should not be here'
      };

      const valid = ajv.validate(ChangeResponseSchema, invalidResponse);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('required');
    });
  });
});