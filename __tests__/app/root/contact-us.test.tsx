import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUsPage from '@/src/app/(root)/contact-us/page';

describe('ContactUsPage', () => {
  it('displays the contact us page heading', () => {
    render(<ContactUsPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/contact us/i);
  });


  it('renders name, email, and message inputs', () => {
    render(<ContactUsPage />);

    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/write your message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  
  it('displays office contact details', () => {
    render(<ContactUsPage />);
    expect(screen.getByText(/support@visionstream.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+27 21 123 4567/i)).toBeInTheDocument();
  });

  
  it('does not render a select element', () => {
    render(<ContactUsPage />);
    const dropdown = screen.queryByRole('combobox');
    expect(dropdown).not.toBeInTheDocument();
  });
});
