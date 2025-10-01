import BrowsePage from '@/src/app/(root)/browse/page';
import { useAuth } from '@/src/app/context/authContext';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

type MockedFetch = jest.MockedFunction<typeof fetch>;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn(),
}));

const buildVideo = (id: string, overrides?: { category?: string }) => ({
  id,
  title: `Video ${id}`,
  description: 'Description',
  image_path: '/image.jpg',
  rating: 4.2,
  type: {
    name: overrides?.category ?? 'Featured',
    category: overrides?.category ? { name: overrides.category } : undefined,
  },
});

const createResponse = (data: unknown) =>
  Promise.resolve({
    ok: true,
    json: async () => data,
  });

describe('BrowsePage', () => {
  const mockPush = jest.fn();
  const mockUser = { id: '1', name: 'Test User' };
  let fetchMock: MockedFetch;

  beforeEach(() => {
    fetchMock = jest.fn() as MockedFetch;
    (global.fetch as unknown) = fetchMock;

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser, login: jest.fn(), logout: jest.fn() });

    fetchMock.mockImplementation(request => {
      const url = typeof request === 'string' ? request : request.toString();

      if (url.includes('/api/catalog/hero')) {
        return createResponse({ items: [buildVideo('hero-1')] });
      }

      if (url.includes('/api/catalog/videos')) {
        return createResponse({
          items: [
            buildVideo('catalog-1'),
            buildVideo('catalog-2', { category: 'Wellness' }),
          ],
        });
      }

      if (url.includes('/api/documentaries')) {
        return createResponse({ items: [buildVideo('doc-1', { category: 'Documentary' })] });
      }

      return createResponse({ items: [] });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders populated carousels when data is available', async () => {
    render(<BrowsePage />);

    await waitFor(() => expect(screen.getByText('Trending Now')).toBeInTheDocument());

    expect(screen.getByText('Documentary Collections')).toBeInTheDocument();
    expect(screen.getByText('Wellness & Healing')).toBeInTheDocument();
  });

  it('skips carousels when responses are empty', async () => {
    fetchMock.mockImplementation(request => {
      const url = typeof request === 'string' ? request : request.toString();

      if (url.includes('/api/catalog/hero')) {
        return createResponse({ items: [buildVideo('hero-only')] });
      }

      return createResponse({ items: [] });
    });

    render(<BrowsePage />);

    await waitFor(() => expect(screen.queryByText('Trending Now')).not.toBeInTheDocument());
    expect(screen.queryByText('Documentary Collections')).not.toBeInTheDocument();
    expect(screen.queryByText('Wellness & Healing')).not.toBeInTheDocument();
  });
});
