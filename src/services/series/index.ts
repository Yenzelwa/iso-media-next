import seriesPagedMock from '@/mocks/series/series.paginated.json';
import seriesDetailsMock from '@/mocks/series/series.details.json';
import episodesSeasonMock from '@/mocks/series/episodes.season.json';
import collectionsPopularMock from '@/mocks/series/collections.popular.json';

export interface SeriesQuery {
  q?: string;
  page?: number;
  page_size?: number;
  category?: string;
  sort?: string;
}

export async function getSeriesService(query: SeriesQuery) {
  return Promise.resolve(seriesPagedMock);
}

export async function getSeriesByIdService(id: string) {
  if (id === 'not_found') {
    throw new Error('Series not found');
  }
  return Promise.resolve(seriesDetailsMock);
}

export async function getSeriesEpisodesService(seriesId: string, season: string) {
  if (seriesId === 'not_found') {
    throw new Error('Series not found');
  }
  return Promise.resolve(episodesSeasonMock);
}

export async function getSeriesCollectionService(type: string) {
  return Promise.resolve(collectionsPopularMock);
}