import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { changePasswordService } from '@/src/services/auth/change-password';
import ChangePasswordRequestSchema from '@/schemas/auth/ChangePasswordRequest.schema.json';
import ChangePasswordResponseSchema from '@/schemas/auth/ChangePasswordResponse.schema.json';

export async function POST(req: Request) {
  try {
    const body = await parseJson(req);
    validate(ChangePasswordRequestSchema, body);
    
    const data = await changePasswordService(body);
    validate(ChangePasswordResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Current password is incorrect') {
      return errorResponse('unauthorized', 'Current password is incorrect', {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}