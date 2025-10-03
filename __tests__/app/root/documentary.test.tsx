import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DocumentaryPage from '@/src/app/(root)/documentary/page';
import { useRouter } from 'next/navigation';

type MockedFetch = jest.MockedFunction<typeof fetch>;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock EnhancedCarousel (named export)
jest.mock('@/src/components/EnhancedCarousel', () => ({
  __esModule: true,
  EnhancedCarousel: ({ title, movies }: any) => (
    <div data-testid={`enhanced-carousel-${title}`}>
      {title}: {movies?.length ?? 0}
    </div>
  ),
}));

const createResponse = (data: unknown) =>
  Promise.resolve({
    ok: true,
    json: async () => data,
  });

const createDocumentary = (overrides: Partial<Record<string, any>>) => ({
  id: overrides.id ?? 'doc-unknown',
  title: overrides.title ?? 'Untitled Documentary',
  description: overrides.description ?? 'Description',
  image_path: overrides.image_path ?? '/doc.jpg',
  video_path: overrides.video_path ?? '/doc.mp4',
  rating: overrides.rating ?? 4.5,
  likes: overrides.likes ?? 1200,
  dislikes: overrides.dislikes ?? 12,
  release_date: overrides.release_date ?? '2023-01-01T00:00:00Z',
  type: overrides.type ?? {
    id: 1,
    name: 'Documentary',
    category: {
      id: 1,
      name: overrides.category_name ?? 'Science',
    },
  },
});

const mockDocumentaries = [
  createDocumentary({
    id: 'doc-1',
    title: 'The Hidden History of Consciousness',
    description: 'Exploring hidden aspects of human awareness.',
    rating: 4.9,
    release_date: '2024-01-15T00:00:00Z',
    type: {
      id: 1,
      name: 'Documentary',
      category: { id: 1, name: 'Spirituality' },
    },
  }),
  createDocumentary({
    id: 'doc-2',
    title: 'Quantum Realities Explained',
    description: 'A deep dive into quantum phenomena.',
    rating: 4.7,
    release_date: '2024-03-20T00:00:00Z',
    type: {
      id: 1,
      name: 'Documentary',
      category: { id: 2, name: 'Science' },
    },
  }),
  createDocumentary({
    id: 'doc-3',
    title: 'Digital Consciousness',
    description: 'Technology and the evolution of consciousness.',
    rating: 4.6,
    release_date: '2023-11-10T00:00:00Z',
    type: {
      id: 1,
      name: 'Documentary',
      category: { id: 3, name: 'Science' },
    },
  }),
  createDocumentary({
    id: 'doc-4',
    title: 'Mindful Classrooms',
    description: 'Meditation techniques for modern education.',
    rating: 4.4,
    release_date: '2023-10-05T00:00:00Z',
    type: {
      id: 1,
      name: 'Documentary',
      category: { id: 4, name: 'Education' },
    },
  }),
  createDocumentary({
    id: 'doc-5',
    title: 'Teaching Presence',
    description: 'Elevating teaching with mindfulness.',
    rating: 4.3,
    release_date: '2023-08-20T00:00:00Z',
    type: {
      id: 1,
      name: 'Documentary',
      category: { id: 5, name: 'Education' },
    },
  }),
  createDocumentary({
    id: 'doc-6',
    title: 'Holistic Wellness Rituals',
    description: 'Time-tested rituals for modern balance.',
    rating: 4.2,
    release_date: '2023-05-12T00:00:00Z',
    type: {
      id: 1,
      name: 'Documentary',
      category: { id: 6, name: 'Wellness' },
    },
  }),
];

describe('DocumentaryPage', () => {
  let fetchMock: MockedFetch;
  let mockPush: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn() as MockedFetch;
    (global.fetch as unknown) = fetchMock;

    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    fetchMock.mockImplementation(request => {
      const url = typeof request === 'string' ? request : request.toString();

      if (url.includes('/api/documentaries/featured')) {
        return createResponse({ items: mockDocumentaries[0] });
      }

      if (url.includes('/api/documentaries')) {
        return createResponse({ items: mockDocumentaries });
      }

      return createResponse({ items: [] });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Featured documentary title and initial results count', async () => {
    render(<DocumentaryPage />);

    await screen.findByText(/6 documentaries found/i);

    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: /The Hidden History of Consciousness/i,
      })
    ).toBeInTheDocument();

    const categoryChip = await screen.findByTestId('featured-category-chip');
    expect(categoryChip).toHaveClass('bg-red-600/80');
    expect(categoryChip).toHaveClass('rounded-full');
    expect(categoryChip).toHaveAttribute('tabindex', '0');
    expect(categoryChip).toHaveAttribute('aria-label', expect.stringContaining('category'));

    expect(screen.getByText(/6 documentaries found/i)).toBeInTheDocument();
  });

  it('filters by search term and updates the count', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    await screen.findByText(/6 documentaries found/i);

    const searchBox = screen.getByPlaceholderText(/search documentaries/i);

    await user.clear(searchBox);
    await user.type(searchBox, 'Quantum');
    expect(await screen.findByText(/1 documentaries found/i)).toBeInTheDocument();

    await user.clear(searchBox);
    await user.type(searchBox, 'no match at all');
    expect(await screen.findByText(/0 documentaries found/i)).toBeInTheDocument();

    await user.clear(searchBox);
    expect(await screen.findByText(/6 documentaries found/i)).toBeInTheDocument();
  });

  it('filters by category and updates the count', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    await screen.findByText(/6 documentaries found/i);

    const categorySelect = screen.getAllByRole('combobox')[0];
    await user.selectOptions(categorySelect, 'Science');
    expect(await screen.findByText(/2 documentaries found/i)).toBeInTheDocument();

    await user.selectOptions(categorySelect, 'All');
    expect(await screen.findByText(/6 documentaries found/i)).toBeInTheDocument();
  });

  it('toggles between grid and list views', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    await screen.findByText(/6 documentaries found/i);

    expect(screen.queryByRole('button', { name: /watch$/i })).not.toBeInTheDocument();

    const toggleButtons = screen.getAllByRole('button', { name: '' });
    await user.click(toggleButtons[1]);
    const watchButtons = await screen.findAllByRole('button', { name: /watch$/i });
    expect(watchButtons.length).toBeGreaterThanOrEqual(1);

    await user.click(toggleButtons[0]);
    expect(screen.queryByRole('button', { name: /watch$/i })).not.toBeInTheDocument();
  });

  it('renders all EnhancedCarousel sections with correct item counts', async () => {
    render(<DocumentaryPage />);

    const latest = await screen.findByTestId('enhanced-carousel-Latest Documentaries');
    expect(latest).toHaveTextContent('Latest Documentaries: 4');

    const topRated = await screen.findByTestId('enhanced-carousel-Top Rated Collection');
    expect(topRated).toHaveTextContent('Top Rated Collection: 6');

    const science = await screen.findByTestId('enhanced-carousel-Science & Consciousness');
    expect(science).toHaveTextContent('Science & Consciousness: 2');

    const education = await screen.findByTestId('enhanced-carousel-Educational Insights');
    expect(education).toHaveTextContent('Educational Insights: 2');
  });

  it('skips carousel rendering when documentary collections are empty', async () => {
    fetchMock.mockImplementation(async (url: RequestInfo | URL) => {
      const path = typeof url === 'string' ? url : url.toString();

      if (path.includes('/api/documentaries/featured')) {
        return createResponse({ items: [] });
      }

      if (path.includes('/api/documentaries')) {
        return createResponse({ items: [] });
      }

      return createResponse({ items: [] });
    });

    render(<DocumentaryPage />);

    await screen.findByText(/0 documentaries found/i);

    expect(screen.queryByTestId('enhanced-carousel-Latest Documentaries')).not.toBeInTheDocument();
    expect(screen.queryByTestId('enhanced-carousel-Top Rated Collection')).not.toBeInTheDocument();
    expect(screen.queryByTestId('enhanced-carousel-Science & Consciousness')).not.toBeInTheDocument();
    expect(screen.queryByTestId('enhanced-carousel-Educational Insights')).not.toBeInTheDocument();
  });

  it('shows rating and action buttons in the featured block', async () => {
    render(<DocumentaryPage />);

    expect(await screen.findByText(String(mockDocumentaries[0].rating))).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /watch now/i })).toBeInTheDocument();
  });

  it('navigates to the watch page when watch actions are clicked', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    const watchNow = await screen.findByRole('button', { name: /watch now/i });
    await user.click(watchNow);
    expect(mockPush).toHaveBeenNthCalledWith(1, '/watch/doc-1');

    const toggleButtons = screen.getAllByRole('button', { name: '' });
    await user.click(toggleButtons[1]);

    const listWatchButtons = await screen.findAllByRole('button', { name: /^watch$/i });
    await user.click(listWatchButtons[0]);
    expect(mockPush).toHaveBeenNthCalledWith(2, '/watch/doc-2');
  });
});
