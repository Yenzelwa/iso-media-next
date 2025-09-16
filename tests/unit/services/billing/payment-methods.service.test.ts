import { attachPaymentMethodService, AttachPaymentMethodRequest } from '@/src/services/billing/payment-methods';

describe('Billing Payment Methods Service', () => {
  test('attaches payment method successfully', async () => {
    const request: AttachPaymentMethodRequest = {
      payment_method_id: 'pm_1234567890',
      set_as_default: true
    };

    const result = await attachPaymentMethodService(request);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('brand');
    expect(result).toHaveProperty('last4');
  });

  test('throws error for invalid payment method', async () => {
    const request: AttachPaymentMethodRequest = {
      payment_method_id: 'pm_invalid'
    };

    await expect(attachPaymentMethodService(request)).rejects.toThrow('Invalid payment method');
  });

  test('handles optional set_as_default parameter', async () => {
    const request: AttachPaymentMethodRequest = {
      payment_method_id: 'pm_valid_test'
    };

    const result = await attachPaymentMethodService(request);

    expect(typeof result.id).toBe('string');
    expect(typeof result.brand).toBe('string');
    expect(typeof result.last4).toBe('string');
  });
});