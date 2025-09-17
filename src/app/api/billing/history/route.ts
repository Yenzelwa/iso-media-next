import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { getBillingHistoryService } from '@/src/services/billing/history';
import BillingHistoryResponseSchema from '@/schemas/billing/BillingHistoryResponse.schema.json';

export async function GET(req: Request) {
  try {
    validateBearerToken(req);
    
    const data = await getBillingHistoryService();
    validate(BillingHistoryResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}