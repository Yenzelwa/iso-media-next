import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { forgotPasswordService } from '@/src/services/auth/forgot-password';
import ForgotPasswordRequestSchema from '@/schemas/auth/ForgotPasswordRequest.schema.json';
import ForgotPasswordResponseSchema from '@/schemas/auth/ForgotPasswordResponse.schema.json';

export async function POST(req: Request) {
  try {
    const body = await parseJson(req);
    validate(ForgotPasswordRequestSchema, body);
    
    const data = await forgotPasswordService(body);
    validate(ForgotPasswordResponseSchema, data);
    
    return json(data, 202);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}