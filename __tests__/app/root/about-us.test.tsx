import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUsPage from '@/src/app/(root)/about-us/page';

describe('AboutUsPage', () => {
  it('displays the About Us page heading', () => {
    render(<AboutUsPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/about us/i);
  });

  it('renders mission and vision sections', () => {
    render(<AboutUsPage />);
    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
    expect(screen.getByText(/our values/i)).toBeInTheDocument();
    expect(screen.getByText(/what we offer/i)).toBeInTheDocument();
  });

  it('does not render any button', () => {
    render(<AboutUsPage />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
