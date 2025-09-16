import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getEpisodeByIdService } from '@/src/services/episodes';
import EpisodeSchema from '@/schemas/series/Episode.schema.json';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getEpisodeByIdService(params.id);
    validate(EpisodeSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Episode not found') {
      return errorResponse('not_found', 'Episode not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}