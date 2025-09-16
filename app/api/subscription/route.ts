import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { getSubscriptionService } from '@/src/services/plans/getSubscription';

export async function GET() {
  try {
    // In real implementation, would validate Bearer token and get user subscription
    const data = await getSubscriptionService();
    
    const SubscriptionSchema = require('@/schemas/plans/Subscription.schema.json');
    validate(SubscriptionSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Unauthorized') {
      return errorResponse('unauthorized', 'Bearer token required', {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}