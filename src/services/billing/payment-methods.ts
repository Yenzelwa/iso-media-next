import paymentMethodAttachedMock from '@/mocks/billing/payment-method.attached.json';

export interface AttachPaymentMethodRequest {
  payment_method_id: string;
  set_as_default?: boolean;
}

export async function attachPaymentMethodService(request: AttachPaymentMethodRequest) {
  // Mock Stripe payment method attachment logic
  if (request.payment_method_id === 'pm_invalid') {
    throw new Error('Invalid payment method');
  }
  
  return Promise.resolve(paymentMethodAttachedMock);
}