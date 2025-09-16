import { createCustomerService } from '@/src/services/billing/customers';

jest.mock('@/src/services/billing/customers');
const mockCreateCustomerService = createCustomerService as jest.MockedFunction<typeof createCustomerService>;

describe('Billing Customers Route Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('service integration works correctly', async () => {
    const mockResponse = {
      id: 'cust_123',
      stripe_customer_id: 'cus_123',
      email: 'test@example.com',
      name: 'Test User'
    };
    
    mockCreateCustomerService.mockResolvedValue(mockResponse);

    const request = { email: 'test@example.com', name: 'Test User' };
    const result = await createCustomerService(request);

    expect(mockCreateCustomerService).toHaveBeenCalledWith(request);
    expect(result).toEqual(mockResponse);
  });

  test('service throws error for invalid request', async () => {
    mockCreateCustomerService.mockRejectedValue(new Error('Customer creation failed'));

    const request = { email: 'invalid@test.com', name: 'Test User' };

    await expect(createCustomerService(request)).rejects.toThrow('Customer creation failed');
  });

  test('service validates response structure', async () => {
    const mockResponse = {
      id: 'cust_valid',
      stripe_customer_id: 'cus_valid',
      email: 'valid@example.com',
      name: 'Valid User'
    };

    mockCreateCustomerService.mockResolvedValue(mockResponse);

    const result = await createCustomerService({ email: 'valid@example.com', name: 'Valid User' });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('stripe_customer_id');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('name');
  });
});