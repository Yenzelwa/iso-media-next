import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import ProfileSchema from '@/schemas/profiles/Profile.schema.json';
import UpdateProfileRequestSchema from '@/schemas/profiles/UpdateProfileRequest.schema.json';
import profileMock from '@/mocks/profiles/me.json';
import updatedProfileMock from '@/mocks/profiles/me.updated.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Profile Me Contract Tests', () => {
  describe('GET /api/profiles/me', () => {
    test('profile response mock matches schema', () => {
      const valid = ajv.validate(ProfileSchema, profileMock);
      
      if (!valid) {
        console.log('Validation errors:', ajv.errors);
      }
      
      expect(valid).toBe(true);
    });

    test('profile response has required fields', () => {
      expect(profileMock).toHaveProperty('id');
      expect(profileMock).toHaveProperty('email');
      expect(profileMock).toHaveProperty('name');
      expect(profileMock).toHaveProperty('phone');
      expect(profileMock).toHaveProperty('avatar_url');
    });

    test('profile response field types are correct', () => {
      expect(typeof profileMock.id).toBe('string');
      expect(typeof profileMock.email).toBe('string');
      expect(typeof profileMock.name).toBe('string');
      expect(profileMock.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(profileMock.id).toMatch(/^prof_/);
    });

    test('updated profile response mock matches schema', () => {
      const valid = ajv.validate(ProfileSchema, updatedProfileMock);
      
      if (!valid) {
        console.log('Updated profile validation errors:', ajv.errors);
      }
      
      expect(valid).toBe(true);
    });

    test('profile handles null values correctly', () => {
      const profileWithNulls = {
        id: 'prof_test123',
        email: 'test@example.com',
        name: 'Test User',
        phone: null,
        avatar_url: null
      };

      const valid = ajv.validate(ProfileSchema, profileWithNulls);
      expect(valid).toBe(true);
    });

    test('profile schema rejects invalid data', () => {
      const invalidProfile = {
        id: '',
        email: 'invalid-email',
        name: '',
        phone: 123,
        avatar_url: 'not-a-url'
      };

      const valid = ajv.validate(ProfileSchema, invalidProfile);
      expect(valid).toBe(false);
      expect(ajv.errors).toBeDefined();
      expect(ajv.errors?.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /api/profiles/me', () => {
    test('valid update profile request passes schema validation', () => {
      const validRequest = {
        name: 'Updated Name',
        phone: '+1987654321',
        avatar_url: 'https://example.com/new-avatar.jpg'
      };
      
      const valid = ajv.validate(UpdateProfileRequestSchema, validRequest);
      expect(valid).toBe(true);
    });

    test('partial update request passes schema validation', () => {
      const partialRequest = {
        name: 'New Name Only'
      };
      
      const valid = ajv.validate(UpdateProfileRequestSchema, partialRequest);
      expect(valid).toBe(true);
    });

    test('update request with null values passes schema validation', () => {
      const requestWithNulls = {
        phone: null,
        avatar_url: null
      };
      
      const valid = ajv.validate(UpdateProfileRequestSchema, requestWithNulls);
      expect(valid).toBe(true);
    });

    test('empty update request fails schema validation', () => {
      const emptyRequest = {};
      
      const valid = ajv.validate(UpdateProfileRequestSchema, emptyRequest);
      expect(valid).toBe(false);
      expect(ajv.errors).toBeDefined();
      expect(ajv.errors?.[0]?.keyword).toBe('minProperties');
    });

    test('invalid update request fails schema validation', () => {
      const invalidRequest = {
        name: '',
        phone: 123,
        avatar_url: 'not-a-url'
      };
      
      const valid = ajv.validate(UpdateProfileRequestSchema, invalidRequest);
      expect(valid).toBe(false);
      expect(ajv.errors).toBeDefined();
      expect(ajv.errors?.length).toBeGreaterThan(0);
    });

    test('request with additional properties fails schema validation', () => {
      const requestWithExtra = {
        name: 'Valid Name',
        extra_field: 'should not be here'
      };
      
      const valid = ajv.validate(UpdateProfileRequestSchema, requestWithExtra);
      expect(valid).toBe(false);
      expect(ajv.errors?.[0]?.keyword).toBe('additionalProperties');
    });

    test('updated profile response mock matches schema', () => {
      const valid = ajv.validate(ProfileSchema, updatedProfileMock);
      expect(valid).toBe(true);
    });

    test('profile update maintains required structure', () => {
      expect(updatedProfileMock).toHaveProperty('id');
      expect(updatedProfileMock).toHaveProperty('email');
      expect(updatedProfileMock).toHaveProperty('name');
      expect(typeof updatedProfileMock.id).toBe('string');
      expect(typeof updatedProfileMock.email).toBe('string');
      expect(typeof updatedProfileMock.name).toBe('string');
    });
  });
});