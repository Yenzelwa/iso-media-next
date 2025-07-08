import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('@/src/app/(root)/browse/page', () => () => (
  <div data-testid="browse-page">Mock BrowsePage</div>
));

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from '@/src/app/context/authContext';
import Home from '@/src/app/(root)/page';

describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state when loading is true', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders BrowsePage when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { id: 1, name: 'Khanya' },
      loading: false,
    });

    render(<Home />);
    expect(screen.getByTestId('browse-page')).toBeInTheDocument();
  });

  it('redirects to /login when no user and not loading', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<Home />);
    
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });
});
