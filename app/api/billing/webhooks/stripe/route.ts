import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { processStripeWebhookService } from '@/src/services/billing/webhooks';
import StripeWebhookEventSchema from '@/schemas/billing/StripeWebhookEvent.schema.json';

export async function POST(req: Request) {
  try {
    // Note: No bearer auth required for webhook endpoints per requirements
    
    const body = await parseJson(req);
    validate(StripeWebhookEventSchema, body);
    
    const data = await processStripeWebhookService(body);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Unsupported event type') {
      return errorResponse('webhook_error', 'Unsupported webhook event type', {}, 422);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}