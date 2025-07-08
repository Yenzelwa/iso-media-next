import React from 'react';
import { render, screen } from '@testing-library/react';// Adjust path to where you keep the component
import '@testing-library/jest-dom';
import DocumentaryPage from '@/src/app/(root)/documentary/page';

// Mocks
jest.mock('@/src/components/BrowseSlideShow', () => ({
  __esModule: true,
  default: ({ videos }: any) => (
    <div data-testid="browse-slideshow">BrowseSlideShow: {videos?.length} items</div>
  ),
}));

jest.mock('@/src/components/MovieCarousel', () => ({
  MovieCarousel: ({ title, movies }: any) => (
    <div data-testid="movie-carousel">
      MovieCarousel - {title} ({movies?.length} items)
    </div>
  ),
}));

describe('DocumentaryPage', () => {
  it('renders BrowseSlideShow with the correct number of movies', () => {
    render(<DocumentaryPage />);
    const slideShow = screen.getByTestId('browse-slideshow');
    expect(slideShow).toBeInTheDocument();
    expect(slideShow).toHaveTextContent('6 items');
  });

  it('renders MovieCarousel with title "Documentary"', () => {
    render(<DocumentaryPage />);
    const carousel = screen.getByTestId('movie-carousel');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveTextContent(/documentary/i);
    expect(carousel).toHaveTextContent('6 items');
  });

  it('does not render a heading saying "Welcome"', () => {
    render(<DocumentaryPage />);
    const heading = screen.queryByText(/welcome/i);
    expect(heading).not.toBeInTheDocument();
  });
});
