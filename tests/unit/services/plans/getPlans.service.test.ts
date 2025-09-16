import { getPlansService } from '@/src/services/plans/getPlans';

describe('Get Plans Service', () => {
  test('returns array of available plans', async () => {
    const result = await getPlansService();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('price_cents');
  });

  test('plans have required properties', async () => {
    const result = await getPlansService();

    result.forEach(plan => {
      expect(plan).toHaveProperty('id');
      expect(plan).toHaveProperty('name');
      expect(plan).toHaveProperty('price_cents');
      expect(plan).toHaveProperty('interval');
      expect(typeof plan.price_cents).toBe('number');
    });
  });

  test('includes both monthly and yearly plans', async () => {
    const result = await getPlansService();
    
    const intervals = result.map(plan => plan.interval);
    expect(intervals).toContain('month');
    expect(intervals).toContain('year');
  });
});