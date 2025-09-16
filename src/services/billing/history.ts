import billingHistoryMock from '@/mocks/billing/billing.history.json';

export async function getBillingHistoryService() {
  // Mock billing history retrieval logic
  return Promise.resolve(billingHistoryMock);
}