import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { changeSubscriptionService } from '@/src/services/plans/changeSubscription';

export async function POST(req: Request) {
  try {
    // In real implementation, would validate Bearer token first
    const body = await parseJson(req);
    const SubscriptionChangeRequestSchema = require('@/schemas/plans/SubscriptionChangeRequest.schema.json');
    validate(SubscriptionChangeRequestSchema, body);
    
    const data = await changeSubscriptionService(body);
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
    
    if (error instanceof Error && error.message === 'Invalid plan_id') {
      return errorResponse('not_found', 'Plan not found', {}, 404);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}