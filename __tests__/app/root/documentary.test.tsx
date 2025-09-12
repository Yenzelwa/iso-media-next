import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DocumentaryPage from '@/src/app/(root)/documentary/page';

// Mock EnhancedCarousel (named export)
jest.mock('@/src/components/EnhancedCarousel', () => ({
  __esModule: true,
  EnhancedCarousel: ({ title, movies }: any) => (
    <div data-testid={`enhanced-carousel-${title}`}>
      {title}: {movies?.length ?? 0}
    </div>
  ),
}));

describe('DocumentaryPage', () => {
  it('renders Featured documentary title and initial results count', () => {
    render(<DocumentaryPage />);

    // FeaturedDocumentary uses an h2 with the first item's title
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /The Hidden History of Consciousness/i,
      })
    ).toBeInTheDocument();

    // Initial count (all 6)
    expect(screen.getByText(/6 documentaries found/i)).toBeInTheDocument();
  });

  it('filters by search term and updates the count', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    const searchBox = screen.getByPlaceholderText(/search documentaries/i);

    // Narrow to a single known title
    await user.clear(searchBox);
    await user.type(searchBox, 'Quantum');
    expect(screen.getByText(/1 documentaries found/i)).toBeInTheDocument();

    // No matches
    await user.clear(searchBox);
    await user.type(searchBox, 'no match at all');
    expect(screen.getByText(/0 documentaries found/i)).toBeInTheDocument();

    // Reset to all
    await user.clear(searchBox);
    expect(screen.getByText(/6 documentaries found/i)).toBeInTheDocument();
  });

  it('filters by category and updates the count', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    // Select "Science" (should be 2)
    const categorySelect = screen.getAllByRole('combobox')[0]; // first select is category
    await user.selectOptions(categorySelect, 'Science');
    expect(screen.getByText(/2 documentaries found/i)).toBeInTheDocument();

    // Back to All
    await user.selectOptions(categorySelect, 'All');
    expect(screen.getByText(/6 documentaries found/i)).toBeInTheDocument();
  });

  xit('changes sort to A-Z and shows titles in alphabetical order (check first item)', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    // Switch to list view so titles are clearly visible
    const listBtn = screen.getByRole('button', { name: '' }); // first empty-name button might be grid; safer to pick all and choose the second
    const viewButtons = screen.getAllByRole('button', { name: '' });
    // Buttons are [Grid, List] in a toggle; click List
    await user.click(viewButtons[1]);

    // Set sort to A-Z
    const sortSelect = screen.getAllByRole('combobox')[1]; // second select is sort
    await user.selectOptions(sortSelect, 'A-Z');

    // In A-Z, the first title should be "Digital Consciousness"
    // Grab all h3 headings in the list view and check the first one
    const allLevel3 = screen.getAllByRole('heading', { level: 3 });
    expect(allLevel3[0]).toHaveTextContent(/^Digital Consciousness$/i);
  });

  it('toggles between grid and list views', async () => {
    const user = userEvent.setup();
    render(<DocumentaryPage />);

    // In grid view, there is no visible "Watch" button text on the cards
    expect(screen.queryByRole('button', { name: /watch$/i })).not.toBeInTheDocument();

    // Switch to list view and assert "Watch" buttons are present
    const toggleButtons = screen.getAllByRole('button', { name: '' });
    await user.click(toggleButtons[1]); // List
    const watchButtons = screen.getAllByRole('button', { name: /watch$/i });
    expect(watchButtons.length).toBeGreaterThanOrEqual(1);

    // Back to grid view removes those "Watch" buttons
    await user.click(toggleButtons[0]); // Grid
    expect(screen.queryByRole('button', { name: /watch$/i })).not.toBeInTheDocument();
  });

  it('renders all EnhancedCarousel sections with correct item counts', () => {
    render(<DocumentaryPage />);

    // Latest Documentaries: release_date >= 2023-09-01 => 4
    const latest = screen.getByTestId('enhanced-carousel-Latest Documentaries');
    expect(latest).toHaveTextContent('Latest Documentaries: 4');

    // Top Rated Collection: top 6 of 6 => 6
    const topRated = screen.getByTestId('enhanced-carousel-Top Rated Collection');
    expect(topRated).toHaveTextContent('Top Rated Collection: 6');

    // Science & Consciousness: Science => 2
    const science = screen.getByTestId('enhanced-carousel-Science & Consciousness');
    expect(science).toHaveTextContent('Science & Consciousness: 2');

    // Educational Insights: Education => 2
    const education = screen.getByTestId('enhanced-carousel-Educational Insights');
    expect(education).toHaveTextContent('Educational Insights: 2');
  });

  it('shows rating and action buttons in the featured block', () => {
    render(<DocumentaryPage />);
    // Rating number shown alongside stars - use getAllByText since there are multiple instances
    const ratingElements = screen.getAllByText(/4\.9/i);
    expect(ratingElements.length).toBeGreaterThanOrEqual(1);

    // Featured action buttons
    expect(screen.getByRole('button', { name: /watch now/i })).toBeInTheDocument();
  });
});
