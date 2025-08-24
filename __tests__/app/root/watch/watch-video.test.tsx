// __tests__/components/watch-page.client.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import WatchPage from '@/src/app/(root)/watch/[id]/watch-video';

// Mock router
const push = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

// Mock dynamic Player to a simple element that echoes the video_path prop
jest.mock('next/dynamic', () => () => (props: any) => (
  <div data-testid="player" data-video={props.video_path} />
));

// Mock children components
jest.mock('@/src/components/WatchSeries', () => ({
  __esModule: true,
  default: ({ seasons }: any) => <div data-testid="seasons" data-count={seasons.length} />,
}));

jest.mock('@/src/components/CommentsSection', () => ({
  __esModule: true,
  default: ({ video_id }: any) => <div data-testid="comments" data-video-id={video_id} />,
}));

// Make formatting deterministic for assertions
jest.mock('@/src/utils/formatThumbsCount', () => ({
  formatThumbsCount: (n: number) => String(n),
}));

// Provide fetch
const mockFetch = jest.fn();
// @ts-ignore
global.fetch = mockFetch;

describe('WatchPage (client)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComp = () => render(<WatchPage params={{ id: '253' }} />);

  test('initializes with episode & series data, renders Player & Comments', async () => {
    renderComp();

    // Title/description from initial currentVideo
    expect(await screen.findByText('The Sacred Journey Within')).toBeInTheDocument();
    expect(screen.getByText(/Embark on a transformative exploration/)).toBeInTheDocument();

    // Player receives video_path
    expect(screen.getByTestId('player')).toHaveAttribute('data-video', expect.stringContaining('BigBuckBunny.mp4'));

    // Comments get initial video_id
    expect(screen.getByTestId('comments')).toHaveAttribute('data-video-id', '125');

    // Next Episode button is visible (has next_episode_id)
    expect(screen.getByRole('button', { name: /next episode/i })).toBeInTheDocument();
  });

  test('Next Episode navigates to next id, updates UI and Comments video_id', async () => {
    renderComp();
    const next = await screen.findByRole('button', { name: /next episode/i });

    // Chain fetch mocks used later so we don't interfere here
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ likes: 2551, dislikes: 5 }) });

    fireEvent.click(next);

    // Router push called
    expect(push).toHaveBeenCalledWith('/watch/254');

    // Text reflects next episode data
    expect(await screen.findByText('Meditation and Mindfulness Mastery')).toBeInTheDocument();

    // Player & Comments updated too
    expect(screen.getByTestId('comments')).toHaveAttribute('data-video-id', '126');
    expect(screen.getByTestId('player')).toHaveAttribute('data-video', expect.stringContaining('BigBuckBunny.mp4'));
  });

  test('toggle seasons panel on and off', async () => {
    renderComp();
    const toggle = await screen.findByRole('button', { name: /all episodes/i });

    // Open
    fireEvent.click(toggle);
    expect(screen.getByTestId('seasons')).toHaveAttribute('data-count', '2');

    // Close
    fireEvent.click(toggle);
    expect(screen.queryByTestId('seasons')).not.toBeInTheDocument();
  });

  test('like and dislike optimistic updates and server sync, then error path for dislike', async () => {
    renderComp();

    // Initial counts displayed via mocked formatter
    const likeBtn = await screen.findByRole('button', { name: 'thumbs-up' });
    const dislikeBtn = screen.getByRole('button', { name: 'thumbs-down' });

    // like is initially true -> clicking sends like=false and decrements likes (2551 -> 2550)
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ likes: 2550, dislikes: 5 }) });
    fireEvent.click(likeBtn);

    // Optimistic update shows 2550 immediately
    expect(within(likeBtn).getByText('2550')).toBeInTheDocument();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/like'), expect.anything()));
    // Server sync keeps 2550
    await waitFor(() => expect(within(likeBtn).getByText('2550')).toBeInTheDocument());

    // Now click dislike -> becomes true, increments (5 -> 6)
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({ likes: 2550, dislikes: 6 }) });
    fireEvent.click(dislikeBtn);
    expect(within(dislikeBtn).getByText('6')).toBeInTheDocument();
    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/dislike'), expect.anything()));
    await waitFor(() => expect(within(dislikeBtn).getByText('6')).toBeInTheDocument());

    // Error path: toggle dislike off but server responds not ok -> shows error message
    mockFetch.mockResolvedValueOnce({ ok: false });
    fireEvent.click(dislikeBtn);
    // Optimistic: 6 -> 5
    expect(within(dislikeBtn).getByText('5')).toBeInTheDocument();
    // Error appears
    await waitFor(() => expect(screen.getByText('Error occurred updating dislikes')).toBeInTheDocument());
  });
});
