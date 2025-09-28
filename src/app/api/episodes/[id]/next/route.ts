import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getNextEpisodeService } from '@/src/services/episodes';
import NextEpisodeSchema from '@/schemas/episodes/NextEpisode.schema.json';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getNextEpisodeService(params.id);
    validate(NextEpisodeSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Episode not found') {
      return errorResponse('not_found', 'Episode not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}