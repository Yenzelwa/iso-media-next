import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { changePhoneService } from '@/src/services/profiles/account';
import ChangePhoneRequestSchema from '@/schemas/profiles/ChangePhoneRequest.schema.json';
import ChangeResponseSchema from '@/schemas/profiles/ChangeResponse.schema.json';

export async function POST(req: Request) {
  try {
    validateBearerToken(req);
    
    const body = await parseJson(req);
    validate(ChangePhoneRequestSchema, body);
    
    const data = await changePhoneService(body);
    validate(ChangeResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof AuthenticationError) {
      return errorResponse('unauthorized', error.message, {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}