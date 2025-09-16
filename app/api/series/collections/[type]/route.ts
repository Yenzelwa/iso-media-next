import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getSeriesCollectionService } from '@/src/services/series';
import SeriesCollectionSchema from '@/schemas/series/SeriesCollection.schema.json';

export async function GET(req: Request, { params }: { params: { type: string } }) {
  try {
    const data = await getSeriesCollectionService(params.type);
    validate(SeriesCollectionSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}