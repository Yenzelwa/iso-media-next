import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountRootLayout from '@/src/app/(account)/layout';

jest.mock('@/src/app/context/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: jest.fn(() => ({})),
}));

describe('AccountRootLayout', () => {
  it('renders children content', () => {
    render(
      <AccountRootLayout>
        <div data-testid="child">Test Child</div>
      </AccountRootLayout>
    );
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('wraps children with AuthProvider', () => {
    render(
      <AccountRootLayout>
        <div data-testid="inside-auth">Inside Auth</div>
      </AccountRootLayout>
    );

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('inside-auth')).toBeInTheDocument();
  });

  it('applies layout styling', () => {
    const { container } = render(
      <AccountRootLayout>
        <div>Layout Check</div>
      </AccountRootLayout>
    );
   // expect(container.querySelector('div')).toHaveClass('bg-black');
    expect(container.querySelector('.p-12')).toBeInTheDocument();
  });
});
