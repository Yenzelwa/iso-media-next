import videosPagedMock from '@/mocks/catalog/videos.paginated.json';
import videoDetailsMock from '@/mocks/catalog/video.details.json';
import likeResponseMock from '@/mocks/catalog/like.response.json';
import heroItemsMock from '@/mocks/catalog/hero.items.json';

export interface VideosQuery {
  q?: string;
  page?: number;
  page_size?: number;
  category?: string;
  type?: string;
}

export interface LikeRequest {
  like: boolean;
}

export async function getVideosService(query: VideosQuery) {
  // Filter logic would go here in real implementation
  return Promise.resolve(videosPagedMock);
}

export async function getVideoByIdService(id: string) {
  if (id === 'not_found') {
    throw new Error('Video not found');
  }
  return Promise.resolve(videoDetailsMock);
}

export async function likeVideoService(id: string, request: LikeRequest) {
  if (id === 'not_found') {
    throw new Error('Video not found');
  }
  return Promise.resolve(likeResponseMock);
}

export async function getHeroVideosService() {
  return Promise.resolve(heroItemsMock);
}