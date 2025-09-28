import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getDocumentariesService } from '@/src/services/documentaries';
import PaginatedVideosSchema from '@/schemas/catalog/PaginatedVideos.schema.json';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = {
      q: url.searchParams.get('q') || undefined,
      page: Number(url.searchParams.get('page')) || 1,
      page_size: Number(url.searchParams.get('page_size')) || 10,
      category: url.searchParams.get('category') || undefined,
      sort: (url.searchParams.get('sort') as 'latest' | 'popular' | 'rating') || undefined,
    };
    
    const data = await getDocumentariesService(query);
    validate(PaginatedVideosSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}