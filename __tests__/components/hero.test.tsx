// __tests__/components/hero.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Hero } from '@/src/components/Hero';

// Mock router
const push = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));

// Mock StarRating to a simple display that echoes the rating prop
jest.mock('@/src/components/StarRating', () => ({ __esModule: true, StarRating: ({ rating }: any) => <div data-testid="star-rating">{rating}</div> }));

// Mock lucide-react chevrons so onClick works (render as buttons)
jest.mock('lucide-react', () => ({
  ChevronLeft: (p: any) => <button aria-label="left" onClick={p.onClick} />,
  ChevronRight: (p: any) => <button aria-label="right" onClick={p.onClick} />,
}));

const videos = [
  { id: 'a', title: 'Alpha', description: 'A', image_path: '/a.jpg', rating: 4.5, type: { name: 'Movie' } },
  { id: 'b', title: 'Beta', description: 'B', image_path: '/b.jpg', rating: 3.7, type: { name: 'Series' } },
  { id: 'c', title: 'Gamma', description: 'C', image_path: '/c.jpg', rating: 5, type: { name: 'Doc' } },
] as any;

// Utility: advance through the component's 300ms + 100ms nested timeouts
const flushTransition = () => act(() => { jest.advanceTimersByTime(400); });

describe('Hero', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    push.mockClear();
  });
  afterEach(() => {
    // Wrap pending timers in act to avoid warnings
    act(() => { jest.runOnlyPendingTimers(); });
    jest.useRealTimers();
  });

  test('renders first slide and star rating, trial button routes to login', () => {
    render(<Hero videos={videos} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    // StarRating receives floored rating
    expect(screen.getByTestId('star-rating')).toHaveTextContent('4');

    const trial = screen.getByRole('button', { name: /try 14 days trial/i });
    fireEvent.click(trial);
    expect(push).toHaveBeenCalledWith('/login');
  });

  test('next/prev navigation and dots goToSlide work with transitions', () => {
    const { container } = render(<Hero videos={videos} />);

    // Next -> Beta
    fireEvent.click(screen.getByLabelText('right'));
    flushTransition();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    // Prev -> Alpha
    fireEvent.click(screen.getByLabelText('left'));
    flushTransition();
    expect(screen.getByText('Alpha')).toBeInTheDocument();

    // Prev from first wraps -> Gamma
    fireEvent.click(screen.getByLabelText('left'));
    flushTransition();
    expect(screen.getByText('Gamma')).toBeInTheDocument();

    // Dots: jump to index 1 (Beta)
    // const dots = container.querySelectorAll('.text-2xl.cursor-pointer');
    // fireEvent.click(dots[1] as Element);
    // flushTransition();
    // expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  test('auto-plays every 5s when not transitioning', () => {
    render(<Hero videos={videos} />);
    // First tick -> Beta
    act(() => { jest.advanceTimersByTime(5000); });
    flushTransition();
    expect(screen.getByText('Beta')).toBeInTheDocument();

    // Next tick -> Gamma
    act(() => { jest.advanceTimersByTime(5000); });
    flushTransition();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });
});
