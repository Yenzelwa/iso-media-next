import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import AttachPaymentMethodRequestSchema from '@/schemas/billing/AttachPaymentMethodRequest.schema.json';
import PaymentMethodSchema from '@/schemas/billing/PaymentMethod.schema.json';
import paymentMethodAttachedMock from '@/mocks/billing/payment-method.attached.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Billing Payment Methods Contract Tests', () => {
  test('valid attach payment method request passes schema validation', () => {
    const validRequest = {
      payment_method_id: 'pm_1234567890',
      set_as_default: true
    };
    
    const valid = ajv.validate(AttachPaymentMethodRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid attach payment method request fails schema validation', () => {
    const invalidRequest = {
      payment_method_id: '',
      set_as_default: 'invalid'
    };
    
    const valid = ajv.validate(AttachPaymentMethodRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors!.length).toBeGreaterThan(0);
  });

  test('payment method response mock matches schema', () => {
    const valid = ajv.validate(PaymentMethodSchema, paymentMethodAttachedMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(paymentMethodAttachedMock).toHaveProperty('id');
    expect(paymentMethodAttachedMock).toHaveProperty('brand');
    expect(paymentMethodAttachedMock).toHaveProperty('last4');
  });
});