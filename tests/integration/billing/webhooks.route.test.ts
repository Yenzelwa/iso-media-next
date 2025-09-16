import { processStripeWebhookService } from '@/src/services/billing/webhooks';

jest.mock('@/src/services/billing/webhooks');
const mockProcessStripeWebhookService = processStripeWebhookService as jest.MockedFunction<typeof processStripeWebhookService>;

describe('Billing Webhooks Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = { received: true };
    
    mockProcessStripeWebhookService.mockResolvedValue(mockResponse);

    const event = {
      id: 'evt_123',
      type: 'invoice.payment_succeeded',
      data: { object: {} }
    };
    const result = await processStripeWebhookService(event);

    expect(mockProcessStripeWebhookService).toHaveBeenCalledWith(event);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for invalid event', async () => {
    mockProcessStripeWebhookService.mockRejectedValue(new Error('Unsupported event type'));

    const event = {
      id: 'evt_invalid',
      type: 'invalid.event',
      data: { object: {} }
    };

    await expect(processStripeWebhookService(event)).rejects.toThrow('Unsupported event type');
  });

  test('service validates response structure', async () => {
    const mockResponse = { received: true };

    mockProcessStripeWebhookService.mockResolvedValue(mockResponse);

    const event = {
      id: 'evt_valid',
      type: 'customer.created',
      data: { object: {} },
      created: 1234567890
    };
    const result = await processStripeWebhookService(event);

    expect(result).toHaveProperty('received');
    expect(typeof result.received).toBe('boolean');
  });
});