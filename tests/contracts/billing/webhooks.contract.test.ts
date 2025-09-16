import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import StripeWebhookEventSchema from '@/schemas/billing/StripeWebhookEvent.schema.json';
import webhookAcknowledgedMock from '@/mocks/billing/webhook.acknowledged.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Billing Webhooks Contract Tests', () => {
  test('valid stripe webhook event passes schema validation', () => {
    const validEvent = {
      id: 'evt_1234567890',
      type: 'invoice.payment_succeeded',
      data: { object: {} },
      created: 1234567890
    };
    
    const valid = ajv.validate(StripeWebhookEventSchema, validEvent);
    expect(valid).toBe(true);
  });

  test('invalid stripe webhook event fails schema validation', () => {
    const invalidEvent = {
      id: '',
      type: 123,
      data: 'invalid'
    };
    
    const valid = ajv.validate(StripeWebhookEventSchema, invalidEvent);
    expect(valid).toBe(false);
    expect(ajv.errors!.length).toBeGreaterThan(0);
  });

  test('webhook acknowledged response matches expected structure', () => {
    expect(webhookAcknowledgedMock).toHaveProperty('received');
    expect(typeof webhookAcknowledgedMock.received).toBe('boolean');
  });

  test('webhook event with optional created field is valid', () => {
    const eventWithoutCreated = {
      id: 'evt_test',
      type: 'customer.created',
      data: { object: {} }
    };
    
    const valid = ajv.validate(StripeWebhookEventSchema, eventWithoutCreated);
    expect(valid).toBe(true);
  });
});