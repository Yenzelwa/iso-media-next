import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import BillingHistoryResponseSchema from '@/schemas/billing/BillingHistoryResponse.schema.json';
import BillingTransactionSchema from '@/schemas/billing/BillingTransaction.schema.json';
import billingHistoryMock from '@/mocks/billing/billing.history.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
ajv.addSchema(BillingTransactionSchema);

describe('Billing History Contract Tests', () => {
  test('billing history response mock matches schema', () => {
    const valid = ajv.validate(BillingHistoryResponseSchema, billingHistoryMock);
    expect(valid).toBe(true);
  });

  test('response has required fields', () => {
    expect(billingHistoryMock).toHaveProperty('transactions');
    expect(Array.isArray(billingHistoryMock.transactions)).toBe(true);
  });

  test('transaction items have required structure', () => {
    if (billingHistoryMock.transactions.length > 0) {
      const transaction = billingHistoryMock.transactions[0];
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('amount_cents');
      expect(transaction).toHaveProperty('date');
      expect(transaction).toHaveProperty('description');
    }
  });

  test('empty transactions array is valid', () => {
    const emptyHistory = { transactions: [] };
    const valid = ajv.validate(BillingHistoryResponseSchema, emptyHistory);
    expect(valid).toBe(true);
  });
});