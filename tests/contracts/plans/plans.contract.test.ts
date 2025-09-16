import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import PlansResponseSchema from '@/schemas/plans/PlansResponse.schema.json';
import PlanSchema from '@/schemas/plans/Plan.schema.json';
import mockPlans from '@/mocks/plans.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Plans Contract Tests', () => {
  test('plans response matches schema', () => {
    const valid = ajv.validate(PlansResponseSchema, mockPlans);
    expect(valid).toBe(true);
    if (!valid) {
      console.log(ajv.errors);
    }
  });

  test('individual plan matches schema', () => {
    mockPlans.forEach(plan => {
      const valid = ajv.validate(PlanSchema, plan);
      expect(valid).toBe(true);
      if (!valid) {
        console.log(`Plan ${plan.id} validation errors:`, ajv.errors);
      }
    });
  });

  test('plan has required fields', () => {
    mockPlans.forEach(plan => {
      expect(plan).toHaveProperty('id');
      expect(plan).toHaveProperty('name');
      expect(plan).toHaveProperty('price_cents');
      expect(plan).toHaveProperty('interval');
    });
  });

  test('price_cents is integer', () => {
    mockPlans.forEach(plan => {
      expect(typeof plan.price_cents).toBe('number');
      expect(Number.isInteger(plan.price_cents)).toBe(true);
      expect(plan.price_cents).toBeGreaterThanOrEqual(0);
    });
  });

  test('interval has valid values', () => {
    const validIntervals = ['month', 'year'];
    mockPlans.forEach(plan => {
      expect(validIntervals).toContain(plan.interval);
    });
  });
});