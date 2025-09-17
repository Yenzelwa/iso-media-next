import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { createSubscriptionService } from '@/src/services/billing/subscriptions';
import CreateSubscriptionRequestSchema from '@/schemas/billing/CreateSubscriptionRequest.schema.json';
import BillingSubscriptionSchema from '@/schemas/billing/BillingSubscription.schema.json';

export async function POST(req: Request) {
  try {
    validateBearerToken(req);
    
    const body = await parseJson(req);
    validate(CreateSubscriptionRequestSchema, body);
    
    const data = await createSubscriptionService(body);
    validate(BillingSubscriptionSchema, data);
    
    return json(data, 201);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    if (error instanceof Error && error.message === 'Invalid price ID') {
      return errorResponse('payment_error', 'Invalid price ID provided', {}, 422);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}