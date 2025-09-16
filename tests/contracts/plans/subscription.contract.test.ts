import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import SubscriptionSchema from '@/schemas/plans/Subscription.schema.json';
import SubscriptionChangeRequestSchema from '@/schemas/plans/SubscriptionChangeRequest.schema.json';
import SubscriptionCancelRequestSchema from '@/schemas/plans/SubscriptionCancelRequest.schema.json';
import mockSubscription from '@/mocks/subscription.json';
import mockSubscriptionChanged from '@/mocks/subscription.changed.json';
import mockSubscriptionCanceled from '@/mocks/subscription.canceled.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Subscription Contract Tests', () => {
  test('subscription response matches schema', () => {
    const valid = ajv.validate(SubscriptionSchema, mockSubscription);
    expect(valid).toBe(true);
    if (!valid) {
      console.log(ajv.errors);
    }
  });

  test('changed subscription matches schema', () => {
    const valid = ajv.validate(SubscriptionSchema, mockSubscriptionChanged);
    expect(valid).toBe(true);
  });

  test('canceled subscription matches schema', () => {
    const valid = ajv.validate(SubscriptionSchema, mockSubscriptionCanceled);
    expect(valid).toBe(true);
  });

  test('change request validates correctly', () => {
    const validRequest = { plan_id: 'premium_monthly' };
    const valid = ajv.validate(SubscriptionChangeRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('change request rejects invalid data', () => {
    const invalidRequest = { plan_id: '' };
    const valid = ajv.validate(SubscriptionChangeRequestSchema, invalidRequest);
    expect(valid).toBe(false);
  });

  test('cancel request validates correctly', () => {
    const validRequests = [
      { at_period_end: true },
      { at_period_end: false },
      {}
    ];

    validRequests.forEach(request => {
      const valid = ajv.validate(SubscriptionCancelRequestSchema, request);
      expect(valid).toBe(true);
    });
  });

  test('subscription has required fields', () => {
    [mockSubscription, mockSubscriptionChanged, mockSubscriptionCanceled].forEach(subscription => {
      expect(subscription).toHaveProperty('id');
      expect(subscription).toHaveProperty('plan');
      expect(subscription).toHaveProperty('status');
      expect(subscription).toHaveProperty('current_period_start');
      expect(subscription).toHaveProperty('current_period_end');
    });
  });
});