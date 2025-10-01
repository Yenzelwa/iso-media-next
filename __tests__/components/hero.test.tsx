// __tests__/components/hero.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/src/components/Hero';
import { useAuth } from '@/src/app/context/authContext';

const push = jest.fn();

jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

jest.mock('@/src/components/StarRating', () => ({
  __esModule: true,
  StarRating: ({ rating }: { rating: number }) => <div data-testid="star-rating">{rating}</div>,
}));

jest.mock('lucide-react', () => ({
  ChevronLeft: () => <span data-testid="chevron-left" />,
  ChevronRight: () => <span data-testid="chevron-right" />,
  Play: () => <span data-testid="play-icon" />,
}));

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

const videos = [
  { id: 'a', title: 'Alpha', description: 'A', image_path: '/a.jpg', rating: 4.5, type: { name: 'Movie' } },
  { id: 'b', title: 'Beta', description: 'B', image_path: '/b.jpg', rating: 3.7, type: { name: 'Series' } },
  { id: 'c', title: 'Gamma', description: 'C', image_path: '/c.jpg', rating: 5, type: { name: 'Doc' } },
] as any;

const flushTransition = () => act(() => {
  jest.advanceTimersByTime(420);
});

describe('Hero', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    push.mockClear();
    mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn() });
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('renders first slide and CTA for guest users', () => {
    render(<Hero videos={videos} />);

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByTestId('star-rating')).toHaveTextContent('5');

    const trialButton = screen.getByRole('button', { name: /start free trial/i });
    fireEvent.click(trialButton);
    expect(push).toHaveBeenCalledWith('/login');
    expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
  });

  test('navigates slides via controls and dots', () => {
    render(<Hero videos={videos} />);

    fireEvent.click(screen.getByLabelText(/next hero item/i));
    flushTransition();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/previous hero item/i));
    flushTransition();
    expect(screen.getByText('Alpha')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/previous hero item/i));
    flushTransition();
    expect(screen.getByText('Gamma')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/go to slide 2/i));
    flushTransition();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  test('auto-plays every 5s', () => {
    render(<Hero videos={videos} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    flushTransition();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    flushTransition();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  test('renders play CTA for authenticated users', () => {
    mockUseAuth.mockReturnValue({ user: { id: '1' }, login: jest.fn(), logout: jest.fn() });
    render(<Hero videos={videos} />);

    const playButton = screen.getByRole('button', { name: /play now/i });
    fireEvent.click(playButton);
    expect(push).toHaveBeenCalledWith('/watch/a');
  });
});
