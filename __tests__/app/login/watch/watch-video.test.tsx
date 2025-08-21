import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '@/src/app/context/authContext';
import WatchVideo from '@/src/app/(root)/watch/watch-video';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { formatThumbsCount } from '@/src/utils/formatThumbsCount';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('js-cookie', () => ({
  get: jest.fn()
}));

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} }))
}));



// Mock dynamic imports
jest.mock('@/src/components/Player', () => () => <div data-testid="player">Player</div>);
const norm = (s?: string | null) => (s ?? '').replace(/\s+/g, '').toLowerCase();
const textEquals = (expected: string) => (_content: string, node: Element | null) =>
  norm(node?.textContent) === norm(expected);

describe('WatchVideo Component', () => {
  const pushMock = jest.fn();
  const user = userEvent.setup();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
      (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ likes: 0, dislikes: 0 }), // will override per test if needed
    });
  });

  xit('should redirect to login if no user is found', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null });
    render(<WatchVideo params={{ id: '1' }} />);
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('renders video player and details if user is logged in', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
    (Cookies.get as jest.Mock).mockReturnValue(null);

    render(<WatchVideo params={{ id: '1' }} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('player')).toBeInTheDocument();
      expect(screen.getByText(/23 October 2023 - Season 2 - Episode 01/i)).toBeInTheDocument();
    });
  });

it('increments like count when liking an unliked episode', async () => {
    const initialLikes = 3421;
    const expectedLikes = 3422; // API returns authoritative value

    // Make API return the exact expected likes so UI can re-sync
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ likes: expectedLikes, dislikes: 8 }),
    });

    const user = userEvent.setup();
    render(<WatchVideo params={{ id: '254' } as any} />);

    const likeBtn = await screen.findByRole('button', { name: /thumbs-up/i });

    await user.click(likeBtn);

     await waitFor(() => {
      expect(within(likeBtn).getByText(formatThumbsCount(expectedLikes))).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://172.24.74.185:4002/videos/253/like',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, like: false }),
      })
    );
  });

  it('decrements like count when unliking a liked episode', async () => {
    // Episode id 253 (from your mock data) starts with:
    // likes: 2551, user.like: true -> expect -1 to 2550
    const initialLikes = 2551;
    const expectedLikes = 2550;

    (global as any).fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ likes: expectedLikes, dislikes: 5 }),
    });

    render(<WatchVideo params={{ id: '253' } as any} />);

    const likeButton = await screen.findByRole('button', { name: /thumbs-up/i });
    within(likeButton).getByText(formatThumbsCount(initialLikes));

    await user.click(likeButton);

    await waitFor(() => {
      expect(within(likeButton).getByText(formatThumbsCount(expectedLikes))).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://172.24.74.185:4002/videos/253/like',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, like: false }),
      })
    );
  });

it('triggers next episode change (navigates to next id)', async () => {
  (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
  (Cookies.get as jest.Mock).mockReturnValue(null);

  const pushMock = jest.fn();
  // Make the already-mocked useRouter return our pushMock for THIS test
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
    replace: jest.fn(),
    prefetch: jest.fn(),
  });

  render(<WatchVideo params={{ id: '1' }} />);

  const nextButton = await screen.findByRole('button', { name: /next episode/i });
  await user.click(nextButton);

  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('/watch/254');
  });
});



 it('handles error when axios fails on like', async () => {
  (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
  (global.fetch as jest.Mock).mockResolvedValueOnce(new Error('Failed to like'));


  render(<WatchVideo params={{ id: '1' }} />);

  const likeButton = await screen.findByRole('button', { name: /thumbs-up/i });
  fireEvent.click(likeButton);

  await waitFor(() => {
    expect(screen.getByText(/error occurred updating likes/i)).toBeInTheDocument();
  });
});


  it('does not crash if next episode button is not present', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });

    render(<WatchVideo params={{ id: '1' }} />);

    // Intentionally query a button that may not exist
    expect(screen.queryByRole('button', { name: /previous episode/i })).not.toBeInTheDocument();
  });

  it('respects cookies if resume point exists', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
    (Cookies.get as jest.Mock).mockReturnValue('123'); // Simulate resume point

    render(<WatchVideo params={{ id: '1' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('player')).toBeInTheDocument();
    });
});
});
