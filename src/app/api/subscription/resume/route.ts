import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { resumeSubscriptionService } from '@/src/services/plans/resumeSubscription';

export async function POST() {
  try {
    // In real implementation, would validate Bearer token first
    const data = await resumeSubscriptionService();
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
    
    if (error instanceof Error && error.message === 'No canceled subscription') {
      return errorResponse('conflict', 'No canceled subscription to resume', {}, 409);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}