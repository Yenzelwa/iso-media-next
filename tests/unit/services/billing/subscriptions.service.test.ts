import { createSubscriptionService, cancelSubscriptionService, CreateSubscriptionRequest } from '@/src/services/billing/subscriptions';

describe('Billing Subscriptions Service', () => {
  test('creates subscription with valid price ID', async () => {
    const request: CreateSubscriptionRequest = {
      price_id: 'price_1234567890',
      trial_period_days: 14
    };

    const result = await createSubscriptionService(request);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('price_id');
    expect(result).toHaveProperty('status');
  });

  test('throws error for invalid price ID', async () => {
    const request: CreateSubscriptionRequest = {
      price_id: 'price_invalid'
    };

    await expect(createSubscriptionService(request)).rejects.toThrow('Invalid price ID');
  });

  test('cancels subscription successfully', async () => {
    const subscriptionId = 'sub_1234567890';

    const result = await cancelSubscriptionService(subscriptionId);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('status');
    expect(result.status).toBe('canceled');
  });

  test('throws error for invalid subscription ID', async () => {
    const subscriptionId = 'sub_invalid';

    await expect(cancelSubscriptionService(subscriptionId)).rejects.toThrow('Subscription not found');
  });
});