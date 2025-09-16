import authorizeResponseMock from '@/mocks/playback/authorize.response.json';

export async function authorizePlaybackService(videoId: string) {
  if (videoId === 'not_found') {
    throw new Error('Video not found');
  }
  return Promise.resolve(authorizeResponseMock);
}