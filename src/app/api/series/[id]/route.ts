import { json, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { getSeriesByIdService } from '@/src/services/series';
import SeriesSchema from '@/schemas/series/Series.schema.json';

/**
 * GET /api/series/[id]
 * Fetch a single series by id, validate the payload against the Series schema,
 * and return a typed JSON response. Returns 404 when the series is not found.
 */
type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  try {
    const id = (params?.id || '').trim();
    if (!id) {
      return errorResponse('bad_request', 'Invalid series id', { id }, 400);
    }

    const data = await getSeriesByIdService(id);
    validate(SeriesSchema, data);

    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('invalid_response', 'Series payload failed validation', error.details, 500);
    }
    if (error instanceof Error && error.message === 'Series not found') {
      return errorResponse('not_found', 'Series not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}
