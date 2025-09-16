import { json, errorResponse } from '@/src/lib/http';
import { logoutDeviceService } from '@/src/services/security';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await logoutDeviceService(params.id);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Device not found') {
      return errorResponse('not_found', 'Device not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}