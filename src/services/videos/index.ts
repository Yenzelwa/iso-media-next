import likeResponseMock from '@/mocks/catalog/like.response.json';

export interface LikeRequest {
  like: boolean;
}

export interface DislikeRequest {
  dislike: boolean;
}

export async function likeVideoService(id: string, request: LikeRequest) {
  if (id === 'not_found') {
    throw new Error('Video not found');
  }
  return Promise.resolve(likeResponseMock);
}

export async function dislikeVideoService(id: string, request: DislikeRequest) {
  if (id === 'not_found') {
    throw new Error('Video not found');
  }
  return Promise.resolve(likeResponseMock);
}