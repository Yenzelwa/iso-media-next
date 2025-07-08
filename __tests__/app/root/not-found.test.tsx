import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '@/src/app/(root)/not-found';


jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="home-link">
      {children}
    </a>
  );
});

describe('NotFoundPage', () => {
  it('displays the 404 heading', () => {
    render(<NotFoundPage />);
    const statusHeading = screen.getByText('404');
    expect(statusHeading).toBeInTheDocument();
    expect(statusHeading.tagName).toBe('H1');
  });

  it('displays "Page not found!" message', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Page not found!');
  });

  it('has a link to go back home', () => {
    render(<NotFoundPage />);
    const link = screen.getByTestId('home-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('Go back home');
  });

  it('does not render a button element', () => {
    render(<NotFoundPage />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
