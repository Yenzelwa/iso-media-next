import webhookAcknowledgedMock from '@/mocks/billing/webhook.acknowledged.json';

export interface StripeWebhookEvent {
  id: string;
  type: string;
  data: any;
  created?: number;
}

export async function processStripeWebhookService(event: StripeWebhookEvent) {
  // Mock Stripe webhook processing logic
  if (event.type === 'invalid.event') {
    throw new Error('Unsupported event type');
  }
  
  return Promise.resolve(webhookAcknowledgedMock);
}