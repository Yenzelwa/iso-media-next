import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock the MovieCard to capture props
jest.mock('@/src/components/shared/VideoCard', () => ({
  MovieCard: ({ movie, sub_title }: any) => (
    <div data-testid="movie-card" data-sub={sub_title}>
      <span>{movie.title}</span>
    </div>
  ),
}));

import Videos from '@/src/components/shared/Videos';

const videos = [
  {
    id: 1,
    title: 'One',
    image_path: '/i1.jpg',
    rating: 4.2,
    likes: 100,
    type: { name: 'Movies', category: { name: 'Docu' } },
  },
  {
    id: 2,
    title: 'Two',
    image_path: '/i2.jpg',
    rating: 3.1,
    likes: 200,
    type: { name: 'Series', category: { name: 'SeriesCat' } },
  },
  {
    id: 3,
    title: 'Three',
    image_path: '/i3.jpg',
    rating: 5,
    likes: 300,
    type: { name: 'Film', category: { name: 'FilmCat' } },
  },
] as any[];

describe('Videos', () => {
  it('renders title and MovieCard list; page=browse composes sub_title as "Category - Type"', () => {
    render(<Videos data={videos} title="Featured" page="browse" />);
    expect(screen.getByText('Featured')).toBeInTheDocument();

    const cards = screen.getAllByTestId('movie-card');
    expect(cards).toHaveLength(3);

    // Check the composed sub_title on a couple of cards
    const subs = cards.map((c) => (c as HTMLElement).dataset.sub);
    expect(subs).toContain('Docu - Movies');
    expect(subs).toContain('SeriesCat - Series');
  });

  it('page!=browse composes sub_title as "Category" only', () => {
    render(<Videos data={videos} title="Latest" page="home" />);
    const cards = screen.getAllByTestId('movie-card');
    for (const c of cards) {
      const sub = (c as HTMLElement).dataset.sub!;
      expect(sub.includes(' - ')).toBe(false);
    }
  });
});
