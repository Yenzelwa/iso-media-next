import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { authorizePlaybackService } from '@/src/services/playback';
import AuthorizePlaybackSchema from '@/schemas/playback/AuthorizePlayback.schema.json';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await authorizePlaybackService(params.id);
    validate(AuthorizePlaybackSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Video not found') {
      return errorResponse('not_found', 'Video not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}