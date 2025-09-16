import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import CreateCustomerRequestSchema from '@/schemas/billing/CreateCustomerRequest.schema.json';
import BillingCustomerSchema from '@/schemas/billing/BillingCustomer.schema.json';
import customerCreatedMock from '@/mocks/billing/customer.created.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

describe('Billing Customers Contract Tests', () => {
  test('valid create customer request passes schema validation', () => {
    const validRequest = {
      email: 'user@example.com',
      name: 'John Doe'
    };
    
    const valid = ajv.validate(CreateCustomerRequestSchema, validRequest);
    expect(valid).toBe(true);
  });

  test('invalid create customer request fails schema validation', () => {
    const invalidRequest = {
      email: 'invalid-email',
      name: ''
    };
    
    const valid = ajv.validate(CreateCustomerRequestSchema, invalidRequest);
    expect(valid).toBe(false);
    expect(ajv.errors).toHaveLength(2);
  });

  test('customer response mock matches schema', () => {
    const valid = ajv.validate(BillingCustomerSchema, customerCreatedMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(customerCreatedMock).toHaveProperty('id');
    expect(customerCreatedMock).toHaveProperty('stripe_customer_id');
    expect(customerCreatedMock).toHaveProperty('email');
    expect(customerCreatedMock).toHaveProperty('name');
  });
});