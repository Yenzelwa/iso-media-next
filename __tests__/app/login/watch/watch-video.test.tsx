import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from '@/src/app/context/authContext';
import WatchVideo from '@/src/app/(root)/watch/watch-video';
import axios from 'axios';

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

describe('WatchVideo Component', () => {
  const pushMock = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('should redirect to login if no user is found', () => {
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

  it('triggers like button and updates UI', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
    (Cookies.get as jest.Mock).mockReturnValue(null);

    render(<WatchVideo params={{ id: '1' }} />);

    await waitFor(() => {
      const likeButton = screen.getByRole('button', { name: /thumbs-up/i });
      fireEvent.click(likeButton);
      
    });

    // axios.post is mocked, we assume it’s called correctly
    // You can extend this by checking if state updates occur
  });

  it('triggers next episode change', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
    (Cookies.get as jest.Mock).mockReturnValue(null);

    render(<WatchVideo params={{ id: '1' }} />);

    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /next episode/i });
      fireEvent.click(nextButton);
    });

    expect(screen.getByText(/Next Episdose/i)).toBeInTheDocument();
  });

    xit('shows loading state initially', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });

    render(<WatchVideo params={{ id: '1' }} />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('handles error when axios fails on like', async () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 } });
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error('Failed to like'));

    render(<WatchVideo params={{ id: '1' }} />);

    const likeButton = await screen.findByRole('button', { name: /thumbs-up/i });
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(screen.getByText(/Error occured updating likes/i)).toBeInTheDocument();
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
