import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { attachPaymentMethodService } from '@/src/services/billing/payment-methods';
import AttachPaymentMethodRequestSchema from '@/schemas/billing/AttachPaymentMethodRequest.schema.json';
import PaymentMethodSchema from '@/schemas/billing/PaymentMethod.schema.json';

export async function POST(req: Request) {
  try {
    validateBearerToken(req);
    
    const body = await parseJson(req);
    validate(AttachPaymentMethodRequestSchema, body);
    
    const data = await attachPaymentMethodService(body);
    validate(PaymentMethodSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    if (error instanceof Error && error.message === 'Invalid payment method') {
      return errorResponse('payment_error', 'Invalid payment method ID', {}, 422);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}