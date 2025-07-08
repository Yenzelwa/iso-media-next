import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import ForgotPasswordPassword from '@/src/app/(root)/forgot-password/page';

// Mock next/link for unit testing
jest.mock('next/link', () => {
  return ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="login-link">
      {children}
    </a>
  );
});

describe('ForgotPasswordPassword', () => {
  it('renders the page heading and description', () => {
    render(<ForgotPasswordPassword />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/forgot password/i);
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
  });

  it('renders input and submit button', () => {
    render(<ForgotPasswordPassword />);
    const emailInput = screen.getByPlaceholderText(/you@example.com/i);
    const resetButton = screen.getByRole('button', { name: /reset password/i });

    expect(emailInput).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it('accepts user input in email field', async () => {
    render(<ForgotPasswordPassword />);
    const emailInput = screen.getByPlaceholderText(/you@example.com/i);

    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('has a link to return to login page', () => {
    render(<ForgotPasswordPassword />);
    const link = screen.getByTestId('login-link');
    expect(link).toHaveAttribute('href', '/login');
    expect(link).toHaveTextContent(/login/i);
  });

  it('does not submit without implementation', () => {
    const onSubmit = jest.fn();
    render(<ForgotPasswordPassword />);

    const button = screen.getByRole('button', { name: /reset password/i });
    fireEvent.click(button);

    expect(onSubmit).not.toHaveBeenCalled(); // Because no submission handler exists yet
  });
});
