import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { changeEmailService } from '@/src/services/profiles/account';
import ChangeEmailRequestSchema from '@/schemas/profiles/ChangeEmailRequest.schema.json';
import ChangeResponseSchema from '@/schemas/profiles/ChangeResponse.schema.json';

export async function POST(req: Request) {
  try {
    validateBearerToken(req);
    
    const body = await parseJson(req);
    validate(ChangeEmailRequestSchema, body);
    
    const data = await changeEmailService(body);
    validate(ChangeResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    if (error instanceof Error && error.message === 'Invalid password') {
      return errorResponse('unauthorized', 'Invalid password', {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}