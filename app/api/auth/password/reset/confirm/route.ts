import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { resetPasswordService } from '@/src/services/auth/reset-password';
import ResetPasswordRequestSchema from '@/schemas/auth/ResetPasswordRequest.schema.json';
import ResetPasswordResponseSchema from '@/schemas/auth/ResetPasswordResponse.schema.json';

export async function POST(req: Request) {
  try {
    const body = await parseJson(req);
    validate(ResetPasswordRequestSchema, body);
    
    const data = await resetPasswordService(body);
    validate(ResetPasswordResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Invalid or expired reset token') {
      return errorResponse('unauthorized', 'Invalid or expired reset token', {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}