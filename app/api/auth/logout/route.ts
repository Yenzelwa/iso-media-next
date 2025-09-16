import { json, errorResponse } from '@/src/lib/http';

export async function POST(req: Request) {
  try {
    // Mock logout - just return success
    // In real implementation, invalidate token
    return new Response(null, { status: 204 });
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}