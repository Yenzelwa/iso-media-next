import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getSeriesEpisodesService } from '@/src/services/series';
import EpisodeSchema from '@/schemas/series/Episode.schema.json';

export async function GET(req: Request, { params }: { params: { id: string, season: string } }) {
  try {
    const data = await getSeriesEpisodesService(params.id, params.season);
    
    if (Array.isArray(data)) {
      data.forEach(episode => validate(EpisodeSchema, episode));
    }
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Series not found') {
      return errorResponse('not_found', 'Series not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}