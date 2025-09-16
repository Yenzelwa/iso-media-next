import { json, parseJson, errorResponse } from '@/src/lib/http';
import { validate, ValidationError } from '@/src/lib/validate';
import { likeVideoService } from '@/src/services/videos';
import LikeRequestSchema from '@/schemas/catalog/LikeRequest.schema.json';
import LikeResponseSchema from '@/schemas/catalog/LikeResponse.schema.json';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await parseJson(req);
    validate(LikeRequestSchema, body);
    
    const data = await likeVideoService(params.id, body);
    validate(LikeResponseSchema, data);
    
    return json(data, 200);
  } catch (error) {
    if (error instanceof ValidationError) {
      return errorResponse('validation_error', error.message, error.details, 400);
    }
    
    if (error instanceof Error && error.message === 'Video not found') {
      return errorResponse('not_found', 'Video not found', {}, 404);
    }
    
    return errorResponse('internal', 'Internal server error', {}, 500);
  }
}