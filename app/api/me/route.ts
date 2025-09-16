import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { validateBearerToken, AuthenticationError } from '@/src/lib/auth';
import { getAccountService, updateAccountService } from '@/src/services/profiles/account';
import AccountSchema from '@/schemas/profiles/Account.schema.json';
import UpdateAccountRequestSchema from '@/schemas/profiles/UpdateAccountRequest.schema.json';

export async function GET(req: Request) {
  try {
    validateBearerToken(req);
    
    const data = await getAccountService();
    validate(AccountSchema, data);
    
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
    validate(UpdateAccountRequestSchema, body);
    
    const data = await updateAccountService(body);
    validate(AccountSchema, data);
    
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