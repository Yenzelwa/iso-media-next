import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getVideoByIdService } from '@/src/services/catalog/videos';
import VideoSchema from '@/schemas/catalog/Video.schema.json';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getVideoByIdService(params.id);
    // eslint-disable-next-line no-debugger
    debugger;
    validate(VideoSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Video not found') {
      return errorResponse('not_found', 'Video not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}