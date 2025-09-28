import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { getPlansService } from '@/src/services/plans/getPlans';

export async function GET() {
  try {
    const data = await getPlansService();
    
    // Import schema dynamically to avoid import issues
    const PlansResponseSchema = require('@/schemas/plans/PlansResponse.schema.json');
    validate(PlansResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    console.error('Plans API error:', error);
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}