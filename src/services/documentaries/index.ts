import documentariesPagedMock from '@/mocks/documentaries/documentaries.paginated.json';
import featuredDocumentaryMock from '@/mocks/documentaries/featured.documentary.json';
import collectionsLatestMock from '@/mocks/documentaries/collections.latest.json';

export interface DocumentariesQuery {
  q?: string;
  page?: number;
  page_size?: number;
  category?: string;
  sort?: 'latest' | 'popular' | 'rating';
}

export async function getDocumentariesService(query: DocumentariesQuery) {
  return Promise.resolve(documentariesPagedMock);
}

export async function getFeaturedDocumentaryService() {
  return Promise.resolve(featuredDocumentaryMock);
}

export async function getDocumentaryCollectionService(type: string) {
  return Promise.resolve(collectionsLatestMock);
}