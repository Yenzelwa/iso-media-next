import { createCustomerService, CreateCustomerRequest } from '@/src/services/billing/customers';

describe('Billing Customers Service', () => {
  test('creates customer with valid data', async () => {
    const request: CreateCustomerRequest = {
      email: 'user@example.com',
      name: 'John Doe'
    };

    const result = await createCustomerService(request);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('stripe_customer_id');
    expect(result.email).toBe('user@example.com');
    expect(result.name).toBe('John Doe');
  });

  test('throws error for invalid email', async () => {
    const request: CreateCustomerRequest = {
      email: 'invalid@test.com',
      name: 'Test User'
    };

    await expect(createCustomerService(request)).rejects.toThrow('Customer creation failed');
  });

  test('returns expected data structure', async () => {
    const request: CreateCustomerRequest = {
      email: 'test@example.com',
      name: 'Test User'
    };

    const result = await createCustomerService(request);

    expect(typeof result.id).toBe('string');
    expect(typeof result.stripe_customer_id).toBe('string');
    expect(typeof result.email).toBe('string');
    expect(typeof result.name).toBe('string');
  });
});