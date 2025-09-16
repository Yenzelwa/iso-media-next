import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { getProfileService, updateProfileService } from '@/src/services/profiles/me';
import ProfileSchema from '@/schemas/profiles/Profile.schema.json';
import UpdateProfileRequestSchema from '@/schemas/profiles/UpdateProfileRequest.schema.json';

export async function GET(req: Request) {
  try {
    validateBearerToken(req);
    
    const data = await getProfileService();
    validate(ProfileSchema, data);
    
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

export async function PATCH(req: Request) {
  try {
    validateBearerToken(req);
    
    const body = await parseJson(req);
    validate(UpdateProfileRequestSchema, body);
    
    const data = await updateProfileService(body);
    validate(ProfileSchema, data);
    
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