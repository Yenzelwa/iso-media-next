import { json, errorResponse } from '@/src/lib/http';
import { validate } from '@/src/lib/validate';
import { getDocumentaryCollectionService } from '@/src/services/documentaries';
import CollectionSchema from '@/schemas/documentaries/Collection.schema.json';

export async function GET(req: Request, { params }: { params: { type: string } }) {
  try {
    const data = await getDocumentaryCollectionService(params.type);
    validate(CollectionSchema, data);
    
    return json(data, 200);
  } catch (error) {
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}