import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import CreateSubscriptionRequestSchema from '@/schemas/billing/CreateSubscriptionRequest.schema.json';
import BillingSubscriptionSchema from '@/schemas/billing/BillingSubscription.schema.json';
import subscriptionCreatedMock from '@/mocks/billing/subscription.created.json';
import subscriptionCanceledMock from '@/mocks/billing/subscription.canceled.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Billing Subscriptions Contract Tests', () => {
  test('valid create subscription request passes schema validation', () => {
    const validRequest = {
      price_id: 'price_1234567890',
      trial_period_days: 14
    };
    
    const valid = ajv.validate(CreateSubscriptionRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid create subscription request fails schema validation', () => {
    const invalidRequest = {
      price_id: '',
      trial_period_days: -1
    };
    
    const valid = ajv.validate(CreateSubscriptionRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors!.length).toBeGreaterThan(0);
  });

  test('created subscription response mock matches schema', () => {
    const valid = ajv.validate(BillingSubscriptionSchema, subscriptionCreatedMock);
    expect(valid).toBe(true);
  });

  test('canceled subscription response mock matches schema', () => {
    const valid = ajv.validate(BillingSubscriptionSchema, subscriptionCanceledMock);
    expect(valid).toBe(true);
  });

  test('responses have required fields', () => {
    expect(subscriptionCreatedMock).toHaveProperty('id');
    expect(subscriptionCreatedMock).toHaveProperty('status');
    expect(subscriptionCanceledMock).toHaveProperty('id');
    expect(subscriptionCanceledMock).toHaveProperty('status');
  });
});