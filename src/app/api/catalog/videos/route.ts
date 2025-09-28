import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getVideosService } from '@/src/services/catalog/videos';
import PaginatedVideosSchema from '@/schemas/catalog/PaginatedVideos.schema.json';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    // eslint-disable-next-line no-debugger
    debugger;
    const query = {
      q: url.searchParams.get('q') || undefined,
      page: Number(url.searchParams.get('page')) || 1,
      page_size: Number(url.searchParams.get('page_size')) || 10,
      category: url.searchParams.get('category') || undefined,
      type: url.searchParams.get('type') || undefined,
    };
    // eslint-disable-next-line no-debugger
    debugger;
    const data = await getVideosService(query);
    // eslint-disable-next-line no-debugger
    debugger;
    validate(PaginatedVideosSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}