import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { createCustomerService } from '@/src/services/billing/customers';
import CreateCustomerRequestSchema from '@/schemas/billing/CreateCustomerRequest.schema.json';
import BillingCustomerSchema from '@/schemas/billing/BillingCustomer.schema.json';

export async function POST(req: Request) {
  try {
    validateBearerToken(req);
    
    const body = await parseJson(req);
    validate(CreateCustomerRequestSchema, body);
    
    const data = await createCustomerService(body);
    validate(BillingCustomerSchema, data);
    
    return json(data, 201);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    if (error instanceof Error && error.message === 'Customer creation failed') {
      return errorResponse('payment_error', 'Failed to create billing customer', {}, 422);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}