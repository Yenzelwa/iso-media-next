import subscriptionCreatedMock from '@/mocks/billing/subscription.created.json';
import subscriptionCanceledMock from '@/mocks/billing/subscription.canceled.json';

export interface CreateSubscriptionRequest {
  price_id: string;
  trial_period_days?: number;
}

export async function createSubscriptionService(request: CreateSubscriptionRequest) {
  // Mock Stripe subscription creation logic
  if (request.price_id === 'price_invalid') {
    throw new Error('Invalid price ID');
  }
  
  return Promise.resolve(subscriptionCreatedMock);
}

export async function cancelSubscriptionService(subscriptionId: string) {
  // Mock Stripe subscription cancellation logic
  if (subscriptionId === 'sub_invalid') {
    throw new Error('Subscription not found');
  }
  
  return Promise.resolve(subscriptionCanceledMock);
}