import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieCard } from '@/src/components/shared/VideoCard';

// Mock Next Link to a plain <a>
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));


const baseVideo = {
  id: 42,
  title: 'A Great Movie',
  image_path: '/img/poster.jpg',
  rating: 3.7,
  likes: 1234,
  description: 'desc',
  release_date: '2024-01-01',
  type: {
    name: 'Movies',
    category: { name: 'Spiritual' },
  },
} as any;

describe('MovieCard', () => {
  it('links to /watch/:id for non-series and renders info, rating stars, badge', () => {
    render(<MovieCard movie={baseVideo} isActive />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/watch/${baseVideo.id}`);
    // active class
    expect(link.className).toContain('shadow-2xl');

    // poster image + alt
    const img = screen.getByAltText(baseVideo.title) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe(baseVideo.image_path);

    // type badge
    expect(screen.getByText(baseVideo.type.name)).toBeInTheDocument();

    // rating number (1 decimal)
    expect(screen.getByText(baseVideo.rating.toFixed(1))).toBeInTheDocument();

    // stars: floor(3.7)=3 red, 2 gray
    const container = link; // scope to card
    const redStars = container.querySelectorAll('svg.w-3.h-3.text-red');
    const grayStars = container.querySelectorAll('svg.w-3.h-3.text-gray');
    expect(redStars.length).toBe(3);
    expect(grayStars.length).toBe(2);

    // likes & category text
    expect(screen.getByText(`${baseVideo.likes} likes`)).toBeInTheDocument();
    expect(screen.getByText(baseVideo.type.category.name)).toBeInTheDocument();

    // "New" badge
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('links to /series/:id when type.name is "Series"', () => {
    const seriesVideo = {
      ...baseVideo,
      type: { ...baseVideo.type, name: 'Series' },
    };
    render(<MovieCard movie={seriesVideo} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/series/${seriesVideo.id}`);
  });
});
