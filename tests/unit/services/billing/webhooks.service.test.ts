import { processStripeWebhookService, StripeWebhookEvent } from '@/src/services/billing/webhooks';

describe('Billing Webhooks Service', () => {
  test('processes valid webhook event', async () => {
    const event: StripeWebhookEvent = {
      id: 'evt_1234567890',
      type: 'invoice.payment_succeeded',
      data: { object: {} },
      created: 1234567890
    };

    const result = await processStripeWebhookService(event);

    expect(result).toHaveProperty('received');
    expect(result.received).toBe(true);
  });

  test('throws error for invalid event type', async () => {
    const event: StripeWebhookEvent = {
      id: 'evt_invalid',
      type: 'invalid.event',
      data: { object: {} }
    };

    await expect(processStripeWebhookService(event)).rejects.toThrow('Unsupported event type');
  });

  test('handles event without created timestamp', async () => {
    const event: StripeWebhookEvent = {
      id: 'evt_test',
      type: 'customer.created',
      data: { object: {} }
    };

    const result = await processStripeWebhookService(event);

    expect(result).toBeDefined();
    expect(result.received).toBe(true);
  });
});