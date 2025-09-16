import customerCreatedMock from '@/mocks/billing/customer.created.json';

export interface CreateCustomerRequest {
  email: string;
  name: string;
}

export async function createCustomerService(request: CreateCustomerRequest) {
  // Mock Stripe customer creation logic
  if (request.email === 'invalid@test.com') {
    throw new Error('Customer creation failed');
  }
  
  return Promise.resolve(customerCreatedMock);
}