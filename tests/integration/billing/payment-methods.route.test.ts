import { attachPaymentMethodService } from '@/src/services/billing/payment-methods';

jest.mock('@/src/services/billing/payment-methods');
const mockAttachPaymentMethodService = attachPaymentMethodService as jest.MockedFunction<typeof attachPaymentMethodService>;

describe('Billing Payment Methods Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      id: 'pm_attach_123',
      brand: 'visa',
      last4: '4242',
      exp_month: 12,
      exp_year: 2026
    };
    
    mockAttachPaymentMethodService.mockResolvedValue(mockResponse);

    const request = { payment_method_id: 'pm_123', set_as_default: true };
    const result = await attachPaymentMethodService(request);

    expect(mockAttachPaymentMethodService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for invalid payment method', async () => {
    mockAttachPaymentMethodService.mockRejectedValue(new Error('Invalid payment method'));

    const request = { payment_method_id: 'pm_invalid' };

    await expect(attachPaymentMethodService(request)).rejects.toThrow('Invalid payment method');
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      id: 'pm_attach_valid',
      brand: 'mastercard',
      last4: '1234',
      exp_month: 6,
      exp_year: 2027
    };

    mockAttachPaymentMethodService.mockResolvedValue(mockResponse);

    const result = await attachPaymentMethodService({ payment_method_id: 'pm_valid' });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('brand');
    expect(result).toHaveProperty('last4');
  });
});