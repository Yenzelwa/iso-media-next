import { json, errorResponse } from '@/src/lib/http';
import { logoutAllOtherDevicesService } from '@/src/services/security';

export async function POST(req: Request) {
  try {
    const data = await logoutAllOtherDevicesService();
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}