// __tests__/BrowseSlideShow.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BrowseSlideShow from '@/src/components/BrowseSlideShow';

// --- Mocks ---
// Mock next/image to a plain img so we can assert on src/alt
jest.mock('next/image', () => (props: any) => {
  const { src = '', alt = '', ...rest } = props;
  return <img data-testid="bg-image" src={typeof src === 'string' ? src : src?.src || ''} alt={alt} {...rest} />;
});

// Mock router push
const push = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

// Mock react-icons chevrons as real buttons so we can click them
jest.mock('react-icons/bs', () => ({
  BsChevronCompactLeft: (props: any) => <button aria-label="prev" onClick={props.onClick} />,
  BsChevronCompactRight: (props: any) => <button aria-label="next" onClick={props.onClick} />,
}));

// Mock RxDotFilled so it renders something stable; the click is on its wrapper div
jest.mock('react-icons/rx', () => ({
  RxDotFilled: () => <span>•</span>,
}));

// Mock StarIcon to a simple span (no behavior — just render coverage)
jest.mock('@/src/components/shared/StarIcon', () => ({ __esModule: true, default: () => <span data-testid="star">★</span> }));

// Auth context mock — we'll override per test
let mockUser: any = null;
jest.mock('@/src/app/context/authContext', () => ({
  useAuth: () => ({ user: mockUser }),
}));

// --- Fixtures ---
const videos = [
  { id: 'a', title: 'Alpha', video_path: '/alpha.jpg' },
  { id: 'b', title: 'Beta', video_path: '' }, // triggers fallback
  { id: 'c', title: 'Gamma', video_path: '/gamma.jpg' },
] as any;

// Helper to render fresh and reset push
const setup = () => {
  push.mockClear();
  return render(<BrowseSlideShow videos={videos} />);
};

// --- Tests ---

test('renders first slide image and title', () => {
  mockUser = { id: 'u1' }; // authenticated path by default
  setup();
  expect(screen.getByText('Alpha')).toBeInTheDocument();
  const img = screen.getByTestId('bg-image') as HTMLImageElement;
  expect(img).toHaveAttribute('src', '/alpha.jpg');
 expect(img).toHaveAttribute('alt', videos[0].title);
});

test('next button advances slide and wraps at end', () => {
  mockUser = { id: 'u1' };
  setup();
  // 1st -> 2nd
  fireEvent.click(screen.getByLabelText('next'));
  expect(screen.getByText('Beta')).toBeInTheDocument();
  // 2nd -> 3rd
  fireEvent.click(screen.getByLabelText('next'));
  expect(screen.getByText('Gamma')).toBeInTheDocument();
  // 3rd -> wrap to 1st
  fireEvent.click(screen.getByLabelText('next'));
  expect(screen.getByText('Alpha')).toBeInTheDocument();
});

test('prev button goes back and wraps to last from first', () => {
  mockUser = { id: 'u1' };
  setup();
  // at first -> prev wraps to last
  fireEvent.click(screen.getByLabelText('prev'));
  expect(screen.getByText('Gamma')).toBeInTheDocument();
  // prev again -> middle
  fireEvent.click(screen.getByLabelText('prev'));
  expect(screen.getByText('Beta')).toBeInTheDocument();
});

test('clicking dots jumps to selected slide (goToSlide)', () => {
mockUser = { id: 'u1' };
const { container } = setup();
// Scope to the bottom dots bar to avoid counting chevron controls
const dotsBar = container.querySelector('div.flex.top-4.justify-center.py-2') as HTMLElement;
expect(dotsBar).toBeInTheDocument();
const dots = dotsBar.querySelectorAll('.text-2xl.cursor-pointer');
expect(dots.length).toBe(videos.length);
// Jump to index 2 (third slide)
fireEvent.click(dots[2] as Element);
expect(screen.getByText('Gamma')).toBeInTheDocument();
});

test('fallback image is used when video_path is empty', () => {
  mockUser = { id: 'u1' };
  setup();
  // Move to Beta (index 1) which has empty path
  fireEvent.click(screen.getByLabelText('next'));
  const img = screen.getByTestId('bg-image') as HTMLImageElement;
  expect(screen.getByText('Beta')).toBeInTheDocument();
  expect(img.getAttribute('src')).toContain('/images/2.jpg');
});

test('shows Play Now for authenticated user and navigates to /watch/:id', () => {
  mockUser = { id: 'u1', email: 'x@y.z' };
  setup();
  const btn = screen.getByRole('button', { name: /play now/i });
  expect(btn).toBeInTheDocument();
  // On first slide (id: a)
  fireEvent.click(btn);
  expect(push).toHaveBeenCalledWith('/watch/a');
  // Navigate to 3rd slide and click again
  fireEvent.click(screen.getByLabelText('next'));
  fireEvent.click(screen.getByLabelText('next'));
  fireEvent.click(screen.getByRole('button', { name: /play now/i }));
  expect(push).toHaveBeenLastCalledWith('/watch/c');
});

test('shows Trial CTA for guests and routes to /account', () => {
  mockUser = null;
  setup();
  const btn = screen.getByRole('button', { name: /try 14 days trial/i });
  expect(btn).toBeInTheDocument();
  fireEvent.click(btn);
  expect(push).toHaveBeenCalledWith('/account');
});

// Ensure StarIcon renders (static coverage)
test('renders star icons', () => {
  mockUser = { id: 'u1' };
  setup();
  const stars = screen.getAllByTestId('star');
  expect(stars.length).toBeGreaterThanOrEqual(4);
});
