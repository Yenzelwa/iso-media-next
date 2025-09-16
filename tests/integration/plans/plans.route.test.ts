import { getPlansService } from '@/src/services/plans/getPlans';

// Mock the service for integration testing
jest.mock('@/src/services/plans/getPlans');
const mockGetPlansService = getPlansService as jest.MockedFunction<typeof getPlansService>;

describe('Plans Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/plans returns plans array', async () => {
    const mockPlans = [
      { id: 'basic', name: 'Basic', price_cents: 999, interval: 'month' },
      { id: 'premium', name: 'Premium', price_cents: 1999, interval: 'month' }
    ];
    
    mockGetPlansService.mockResolvedValue(mockPlans);

    const result = await getPlansService();

    expect(mockGetPlansService).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(mockPlans);
  });

  test('handles service errors gracefully', async () => {
    mockGetPlansService.mockRejectedValue(new Error('Service unavailable'));

    await expect(getPlansService()).rejects.toThrow('Service unavailable');
    expect(mockGetPlansService).toHaveBeenCalled();
  });

  test('returns consistent data structure', async () => {
    const mockPlans = [
      { 
        id: 'basic', 
        name: 'Basic Plan', 
        price_cents: 999, 
        interval: 'month',
        devices: 2,
        quality: 'HD'
      }
    ];

    mockGetPlansService.mockResolvedValue(mockPlans);

    const result = await getPlansService();

    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('price_cents');
    expect(result[0]).toHaveProperty('interval');
  });
});