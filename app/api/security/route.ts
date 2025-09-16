import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { getSecuritySettingsService, updateSecuritySettingsService } from '@/src/services/security';
import SecuritySettingsSchema from '@/schemas/security/SecuritySettings.schema.json';

export async function GET(req: Request) {
  try {
    const data = await getSecuritySettingsService();
    validate(SecuritySettingsSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await parseJson(req);
    
    const data = await updateSecuritySettingsService(body);
    validate(SecuritySettingsSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}