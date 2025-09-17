import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { loginService } from '@/src/services/auth/login';
import LoginRequestSchema from '@/schemas/auth/LoginRequest.schema.json';
import LoginResponseSchema from '@/schemas/auth/LoginResponse.schema.json';

export async function POST(req: Request) {
  try {
    const body = await parseJson(req);
    validate(LoginRequestSchema, body);
    
    const data = await loginService(body);
    validate(LoginResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Invalid credentials') {
      return errorResponse('unauthorized', 'Invalid email or password', {}, 401);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}