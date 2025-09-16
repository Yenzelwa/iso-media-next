import { getBillingHistoryService } from '@/src/services/billing/history';

describe('Billing History Service', () => {
  test('returns billing history data', async () => {
    const result = await getBillingHistoryService();

    expect(result).toHaveProperty('transactions');
    expect(Array.isArray(result.transactions)).toBe(true);
  });

  test('returns expected data structure', async () => {
    const result = await getBillingHistoryService();

    expect(typeof result.transactions).toBe('object');
    if (result.transactions.length > 0) {
      expect(result.transactions[0]).toHaveProperty('id');
      expect(result.transactions[0]).toHaveProperty('amount_cents');
      expect(result.transactions[0]).toHaveProperty('date');
    }
  });

  test('handles empty transaction history', async () => {
    const result = await getBillingHistoryService();

    expect(result).toBeDefined();
    expect(result.transactions).toBeDefined();
  });
});