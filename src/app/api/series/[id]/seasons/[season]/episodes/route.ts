import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { getSeriesEpisodesService } from '@/src/services/series';
import EpisodeSchema from '@/schemas/series/Episode.schema.json';

/**
 * GET /api/series/[id]/seasons/[season]/episodes
 * Returns episodes for a given series id and season number.
 */
type Params = { params: { id: string; season: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const id = (params?.id || '').trim();
    const seasonRaw = (params?.season || '').trim();
    const seasonNum = Number(seasonRaw);

    if (!id || !seasonRaw || Number.isNaN(seasonNum) || seasonNum < 1) {
      return errorResponse('bad_request', 'Invalid series id or season number', { id, season: seasonRaw }, 400);
    }

    const data = await getSeriesEpisodesService(id, seasonRaw);

    if (Array.isArray(data)) {
      data.forEach((episode) => validate(EpisodeSchema, episode));
    }

    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('invalid_response', 'Episode payload failed validation', error.details, 500);
    }
    if (error instanceof Error && error.message === 'Series not found') {
      return errorResponse('not_found', 'Series not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}
