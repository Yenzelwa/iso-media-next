import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getHeroVideosService } from '@/src/services/catalog/videos';
import HeroItemsSchema from '@/schemas/catalog/HeroItems.schema.json';

export async function GET(req: Request) {
  try {
    const data = await getHeroVideosService();
    validate(HeroItemsSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}
