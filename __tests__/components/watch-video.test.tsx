import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';

// Adjust this import to the real file path of your component:
import Seasons from '@/src/components/WatchSeries';

describe('Seasons', () => {
  const makeSeasons = () => {
    const s1e1 = {
      id: 101,
      season_id: 1,
      series_id: 1,
      episode_number: 1,
      episode_short_detail: 'S01E01',
      title: 'The Beginning',
      description: 'Season 1 Episode 1 desc',
      image_path: '/img/s1e1.jpg',
      video_id: 1001,
      likes: 1250,
      dislikes: 0,
      ratings: 4.2,
      release_date: new Date('2023-01-02'),
      next_episode_id: 102,
      user: { id: 1, like: false, dislike: false, rating: 0 },
      episode_detail: 'Season 1 - Episode 01',
    };

    const s1e2 = {
      id: 102,
      season_id: 1,
      series_id: 1,
      episode_number: 2,
      episode_short_detail: 'S01E02',
      title: 'First Steps',
      description: 'Season 1 Episode 2 desc',
      image_path: '/img/s1e2.jpg',
      video_id: 1002,
      likes: 987,
      dislikes: 0,
      ratings: 3.9,
      release_date: new Date('2023-01-09'),
      next_episode_id: 201,
      user: { id: 1, like: false, dislike: false, rating: 0 },
      episode_detail: 'Season 1 - Episode 02',
    };

    const s2e1 = {
      id: 201,
      season_id: 2,
      series_id: 1,
      episode_number: 1,
      episode_short_detail: 'S02E01',
      title: 'New Horizons',
      description: 'Season 2 Episode 1 desc',
      image_path: '/img/s2e1.jpg',
      video_id: 2001,
      likes: 4321,
      dislikes: 0,
      ratings: 4.8,
      release_date: new Date('2024-02-01'),
      next_episode_id: 0,
      user: { id: 1, like: false, dislike: false, rating: 0 },
      episode_detail: 'Season 2 - Episode 01',
    };

    return [
      { id: 1, seasonNumber: 1, episodes: [s1e1, s1e2] },
      { id: 2, seasonNumber: 2, episodes: [s2e1] },
    ] as any[];
  };

  it('renders with the first season selected and shows its episodes', () => {
    const seasons = makeSeasons();
    render(<Seasons seasons={seasons} />);

    // Header present
    expect(screen.getByText(/Episodes/i)).toBeInTheDocument();

    // The select should have 2 options: Season 1 & Season 2
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const options = within(select).getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('Season 1');
    expect(options[1]).toHaveTextContent('Season 2');

    // Selected value equals first season id (1)
    expect(select.value).toBe('1');

    // Season 1 episodes visible
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('First Steps')).toBeInTheDocument();

    // Some key bits rendered for a card
    expect(screen.getAllByAltText(/The Beginning|First Steps/)).toHaveLength(2);
    expect(screen.getByText('S01E01')).toBeInTheDocument();
    expect(screen.getByText('S01E02')).toBeInTheDocument();
    // Ratings text is present
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getByText('3.9')).toBeInTheDocument();
  });

  it('switches seasons via the dropdown and updates the episodes grid', () => {
    const seasons = makeSeasons();
    render(<Seasons seasons={seasons} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;

    // Switch to Season 2
    fireEvent.change(select, { target: { value: '2' } });
    expect(select.value).toBe('2');

    // Season 1 episodes should be gone
    expect(screen.queryByText('The Beginning')).not.toBeInTheDocument();
    expect(screen.queryByText('First Steps')).not.toBeInTheDocument();

    // Season 2 episode should be visible
    expect(screen.getByText('New Horizons')).toBeInTheDocument();
    expect(screen.getByText('S02E01')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByAltText('New Horizons')).toBeInTheDocument();
  });

  it('calls onEpisodeSelect with the episode when a card is clicked', () => {
    const seasons = makeSeasons();
    const onSelect = jest.fn();
    render(<Seasons seasons={seasons} onEpisodeSelect={onSelect} />);

    // Click Season 1, Episode 2 card by its title
    fireEvent.click(screen.getByText('First Steps'));

    expect(onSelect).toHaveBeenCalledTimes(1);
    const arg = onSelect.mock.calls[0][0];
    expect(arg).toMatchObject({
      id: 102,
      title: 'First Steps',
      episode_short_detail: 'S01E02',
    });

    // Switch to season 2 and click its episode
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '2' } });
    fireEvent.click(screen.getByText('New Horizons'));

    expect(onSelect).toHaveBeenCalledTimes(2);
    const arg2 = onSelect.mock.calls[1][0];
    expect(arg2).toMatchObject({
      id: 201,
      title: 'New Horizons',
      episode_short_detail: 'S02E01',
    });
  });
});
