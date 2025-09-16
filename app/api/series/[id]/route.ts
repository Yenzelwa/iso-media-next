import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getSeriesByIdService } from '@/src/services/series';
import SeriesSchema from '@/schemas/series/Series.schema.json';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getSeriesByIdService(params.id);
    validate(SeriesSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof Error && error.message === 'Series not found') {
      return errorResponse('not_found', 'Series not found', {}, 404);
    }
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}