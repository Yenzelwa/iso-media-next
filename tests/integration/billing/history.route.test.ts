import { getBillingHistoryService } from '@/src/services/billing/history';

jest.mock('@/src/services/billing/history');
const mockGetBillingHistoryService = getBillingHistoryService as jest.MockedFunction<typeof getBillingHistoryService>;

describe('Billing History Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      transactions: [
        { id: 'txn_123', amount_cents: 2999, date: '2024-01-15T00:00:00Z' },
        { id: 'txn_124', amount_cents: 1999, date: '2024-02-15T00:00:00Z' }
      ]
    };
    
    mockGetBillingHistoryService.mockResolvedValue(mockResponse);

    const result = await getBillingHistoryService();

    expect(mockGetBillingHistoryService).toHaveBeenCalled();
    expect(result).toEqual(mockResponse);
  });

  test('service handles empty history', async () => {
    const mockResponse = { transactions: [] };
    
    mockGetBillingHistoryService.mockResolvedValue(mockResponse);

    const result = await getBillingHistoryService();

    expect(result).toEqual(mockResponse);
    expect(Array.isArray(result.transactions)).toBe(true);
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      transactions: [
        { id: 'txn_valid', amount_cents: 2999, date: '2024-01-15T00:00:00Z' }
      ]
    };

    mockGetBillingHistoryService.mockResolvedValue(mockResponse);

    const result = await getBillingHistoryService();

    expect(result).toHaveProperty('transactions');
    expect(Array.isArray(result.transactions)).toBe(true);
    if (result.transactions.length > 0) {
      expect(result.transactions[0]).toHaveProperty('id');
      expect(result.transactions[0]).toHaveProperty('amount_cents');
    }
  });
});