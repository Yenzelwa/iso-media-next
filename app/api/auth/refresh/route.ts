import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import RefreshRequestSchema from '@/schemas/auth/RefreshRequest.schema.json';
import refreshMock from '@/mocks/auth/refresh.success.json';

export async function POST(req: Request) {
  try {
    const body = await parseJson(req);
    validate(RefreshRequestSchema, body);
    
    if (body.refresh_token === 'invalid_token') {
      return errorResponse('unauthorized', 'Invalid refresh token', {}, 401);
    }
    
    return json(refreshMock, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}