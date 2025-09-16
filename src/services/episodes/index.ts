import episodeDetailsMock from '@/mocks/episodes/episode.details.json';
import nextEpisodeMock from '@/mocks/episodes/next.episode.json';

export async function getEpisodeByIdService(id: string) {
  if (id === 'not_found') {
    throw new Error('Episode not found');
  }
  return Promise.resolve(episodeDetailsMock);
}

export async function getNextEpisodeService(id: string) {
  if (id === 'not_found') {
    throw new Error('Episode not found');
  }
  return Promise.resolve(nextEpisodeMock);
}