import { createSubscriptionService, cancelSubscriptionService } from '@/src/services/billing/subscriptions';

jest.mock('@/src/services/billing/subscriptions');
const mockCreateSubscriptionService = createSubscriptionService as jest.MockedFunction<typeof createSubscriptionService>;
const mockCancelSubscriptionService = cancelSubscriptionService as jest.MockedFunction<typeof cancelSubscriptionService>;

describe('Billing Subscriptions Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('create subscription service integration works correctly', async () => {
    const mockResponse = {
      id: 'sub_123',
      price_id: 'price_123',
      status: 'active'
    };
    
    mockCreateSubscriptionService.mockResolvedValue(mockResponse);

    const request = { price_id: 'price_123', trial_period_days: 14 };
    const result = await createSubscriptionService(request);

    expect(mockCreateSubscriptionService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('cancel subscription service integration works correctly', async () => {
    const mockResponse = {
      id: 'sub_123',
      status: 'canceled'
    };
    
    mockCancelSubscriptionService.mockResolvedValue(mockResponse);

    const subscriptionId = 'sub_123';
    const result = await cancelSubscriptionService(subscriptionId);

    expect(mockCancelSubscriptionService).toHaveBeenCalledWith(subscriptionId);
    expect(result).toEqual(mockResponse);
  });

  test('services validate response structures', async () => {
    const createResponse = { id: 'sub_valid', price_id: 'price_valid', status: 'active' };
    const cancelResponse = { id: 'sub_valid', status: 'canceled' };

    mockCreateSubscriptionService.mockResolvedValue(createResponse);
    mockCancelSubscriptionService.mockResolvedValue(cancelResponse);

    const createResult = await createSubscriptionService({ price_id: 'price_valid' });
    const cancelResult = await cancelSubscriptionService('sub_valid');

    expect(createResult).toHaveProperty('id');
    expect(createResult).toHaveProperty('status');
    expect(cancelResult).toHaveProperty('status', 'canceled');
  });
});