import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { registerService } from '@/src/services/auth/register';
import RegisterRequestSchema from '@/schemas/auth/RegisterRequest.schema.json';
import LoginResponseSchema from '@/schemas/auth/LoginResponse.schema.json';

export async function POST(req: Request) {
  try {
    const body = await parseJson(req);
    validate(RegisterRequestSchema, body);
    
    const data = await registerService(body);
    validate(LoginResponseSchema, data);
    
    return json(data, 201);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Email already exists') {
      return errorResponse('conflict', 'Email already exists', {}, 409);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}