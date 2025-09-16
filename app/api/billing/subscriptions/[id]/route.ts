import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { cancelSubscriptionService } from '@/src/services/billing/subscriptions';
import BillingSubscriptionSchema from '@/schemas/billing/BillingSubscription.schema.json';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    validateBearerToken(req);
    
    const { id } = await params;
    const subscriptionId = id;
    if (!subscriptionId) {
      return errorResponse('validation_error', 'Subscription ID is required', {}, 400);
    }
    
    const data = await cancelSubscriptionService(subscriptionId);
    validate(BillingSubscriptionSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    if (error instanceof Error && error.message === 'Subscription not found') {
      return errorResponse('not_found', 'Subscription not found', {}, 404);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}