import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getFeaturedDocumentaryService } from '@/src/services/documentaries';
import VideoSchema from '@/schemas/catalog/Video.schema.json';

export async function GET(req: Request) {
  try {
    const data = await getFeaturedDocumentaryService();
    validate(VideoSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}