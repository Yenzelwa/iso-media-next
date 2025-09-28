import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getDeviceSessionsService } from '@/src/services/security';
import DeviceSessionSchema from '@/schemas/security/DeviceSession.schema.json';

export async function GET(req: Request) {
  try {
    const data = await getDeviceSessionsService();
    
    if (Array.isArray(data)) {
      data.forEach(device => validate(DeviceSessionSchema, device));
    }
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}