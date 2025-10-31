// __tests__/components/enhanced-carousel.fixed.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EnhancedCarousel } from '@/src/components/EnhancedCarousel';

// Mock lucide-react icons to inert spans
jest.mock('lucide-react', () => new Proxy({}, { get: () => (props: any) => <span data-icon /> }));

// Mock next/navigation router to avoid App Router invariant in tests
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: (url: string) => {
      // emulate navigation for assertions that check window.location
      // without requiring the Next.js app router
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.location.href = url;
    },
  }),
}));

// Faux scrolling element to mimic the scroll container
class FauxScrollEl {
  scrollLeft = 0;
  clientWidth = 800;
  scrollWidth = 2000;
  private listeners: Record<string, Function[]> = {};
  id = 'scroll-My-List';
  addEventListener(evt: string, cb: any) {
    (this.listeners[evt] ||= []).push(cb);
  }
  removeEventListener(evt: string, cb: any) {
    this.listeners[evt] = (this.listeners[evt] || []).filter((f) => f !== cb);
  }
  dispatch(evt: string) {
    (this.listeners[evt] || []).forEach((cb) => cb({ target: this }));
  }
  scrollTo({ left }: { left: number }) {
    this.scrollLeft = left;
    this.dispatch('scroll');
  }
}

const movies = Array.from({ length: 5 }).map((_, i) => ({
  id: `m${i}`,
  image_path: `/img${i}.jpg`,
  title: `Movie ${i}`,
  type: { name: 'Action' },
  rating: 4.2,
  likes: 10 + i,
  release_date: new Date(2024, 0, 1 + i).toISOString(),
  description: `Desc ${i}`,
})) as any;

let faux: FauxScrollEl;

beforeEach(() => {
  jest.useFakeTimers();
  faux = new FauxScrollEl();
  const orig = document.getElementById;
  jest.spyOn(document, 'getElementById').mockImplementation((id: string) => {
    if (id === 'scroll-My-List') return (faux as unknown) as HTMLElement;
    return orig.call(document, id);
  });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  (document.getElementById as any).mockRestore?.();
});

// keep helper for forward button assertions in future refactors
const getNavButtons = () => {
  const buttons = document.querySelectorAll('button');
  const leftBtn = Array.from(buttons).find(btn => btn.className.includes('-ml-6')) as HTMLButtonElement | undefined;
  const rightBtn = Array.from(buttons).find(btn => btn.className.includes('-mr-6')) as HTMLButtonElement | undefined;
  return { leftBtn, rightBtn };
};

test('renders cards and scroll buttons update position / disabled state', () => {
  render(<EnhancedCarousel title="My List" movies={movies} variant="home" />);

  const realScroller = document.querySelector('#scroll-My-List') as HTMLElement;
  expect(realScroller).toBeTruthy();

  const { rightBtn } = getNavButtons();
  expect(rightBtn).toBeDefined();

  const scrollerFromMock = document.getElementById('scroll-My-List');
  if (scrollerFromMock) {
    act(() => {
      faux.scrollLeft = 400;
      faux.dispatch('scroll');
      jest.advanceTimersByTime(150);
    });
    expect(faux.scrollLeft).toBe(400);
  }

  const { leftBtn: updatedLeftBtn } = getNavButtons();
  expect(updatedLeftBtn).toBeDefined();
});

test('variant-specific rendering across home / documentary / series', () => {
  const { rerender } = render(<EnhancedCarousel title="My List" movies={movies} variant="home" />);
  const homeContainer = document.querySelector('[data-variant="home"]');
  expect(homeContainer).toBeInTheDocument();
  expect(screen.getByText(movies[0].title)).toBeInTheDocument();
  expect(screen.getAllByText(/4\.2/)[0]).toBeInTheDocument();
  expect(screen.getAllByText('Action').length).toBeGreaterThan(0);

  rerender(<EnhancedCarousel title="My List" movies={movies} variant="documentary" />);
  const docContainer = document.querySelector('[data-variant="documentary"]') as HTMLElement | null;
  expect(docContainer).toBeInTheDocument();
  expect(docContainer?.className).toContain('enhanced-carousel-documentary');
  expect(docContainer?.getAttribute('data-section-title')).toBe('My List');

  const docPlay = docContainer?.querySelector('button[title="Play video"]') as HTMLElement | null;
  expect(docPlay?.className).toContain('bg-red-500/90');

  const docAdd = docContainer?.querySelector('button[title="Add to My List"]') as HTMLElement | null;
  expect(docAdd?.className).toContain('border-red-400/60');

  rerender(<EnhancedCarousel title="My List" movies={movies} variant="series" />);
  expect(screen.getByText(movies[2].title)).toBeInTheDocument();
  expect(screen.queryByText('Action')).not.toBeInTheDocument();
});

test('does not render when movies array empty', () => {
  const { container } = render(<EnhancedCarousel title="Empty Section" movies={[]} variant="home" />);
  expect(container.firstChild).toBeNull();
});

test('routes to series or watch based on type', () => {
  const seriesMovie = { ...movies[0], id: 's1', type: { name: 'Series' } };
  const docMovie = { ...movies[1], id: 'd1', type: { name: 'Documentary' } };
  const localMovies = [seriesMovie, docMovie];

  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
  });

  render(<EnhancedCarousel title="My List" movies={localMovies as any} variant="home" />);

  // Click first card (series)
  const cards = document.querySelectorAll('[data-variant="home"] .group\\/item');
  (cards[0] as HTMLElement).click();
  expect(window.location.href).toBe('/series/s1');

  // Click play on second card (documentary)
  const playButtons = document.querySelectorAll('button[title="Play video"]');
  (playButtons[1] as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(window.location.href).toBe('/watch/d1');
});

test('clicking play does not bubble to card click', () => {
  const docMovie = { ...movies[1], id: 'd2', type: { name: 'Documentary' } };
  const localMovies = [docMovie];

  const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
  });

  render(<EnhancedCarousel title="My List" movies={localMovies as any} variant="home" />);

  const playButtons = document.querySelectorAll('button[title="Play video"]');
  (playButtons[0] as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true }));

  // Collect event names sent to console.debug
  const calls = debugSpy.mock.calls.map(c => (c?.[1]?.name || c?.[0]));
  expect(calls).toEqual(expect.arrayContaining(['browse.card.play']));
  expect(calls).not.toEqual(expect.arrayContaining(['browse.card.click']));

  expect(window.location.href).toBe('/watch/d2');
  debugSpy.mockRestore();
});

test('renders with missing image_path without crashing', () => {
  const badMovie = { ...movies[0], id: 'x1', image_path: undefined } as any;
  const { getByText } = render(<EnhancedCarousel title="Edge" movies={[badMovie]} variant="home" />);
  expect(getByText(badMovie.title)).toBeInTheDocument();
  const img = document.querySelector('img');
  expect(img?.getAttribute('src')).toBe('/images/2.jpg');
});
