import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getSeriesService } from '@/src/services/series';
import PaginatedSeriesSchema from '@/schemas/series/PaginatedSeries.schema.json';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = {
      q: url.searchParams.get('q') || undefined,
      page: Number(url.searchParams.get('page')) || 1,
      page_size: Number(url.searchParams.get('page_size')) || 10,
      category: url.searchParams.get('category') || undefined,
      sort: url.searchParams.get('sort') || undefined,
    };
    
    const data = await getSeriesService(query);
    validate(PaginatedSeriesSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}