import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ResetPasswordPage from '@/src/app/(root)/reset-password/page';

describe('ResetPasswordPage', () => {
  it('renders the page heading and description', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/reset password/i);
    expect(screen.getByText(/enter your new password/i)).toBeInTheDocument();
  });

  it('renders new password and confirm password fields', () => {
    render(<ResetPasswordPage />);
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  it('allows users to type in password fields', async () => {
    render(<ResetPasswordPage />);
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await userEvent.type(newPasswordInput, 'StrongPass123!');
    await userEvent.type(confirmPasswordInput, 'StrongPass123!');

    expect(newPasswordInput).toHaveValue('StrongPass123!');
    expect(confirmPasswordInput).toHaveValue('StrongPass123!');
  });

  it('does not render any checkbox element', () => {
    render(<ResetPasswordPage />);
    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).not.toBeInTheDocument();
  });
});
