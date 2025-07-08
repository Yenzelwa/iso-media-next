import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/src/app/(root)/layout';

// Mock components
jest.mock('@/src/components/NavBar', () => ({
  Navigation: () => <nav data-testid="nav">Mock Navigation</nav>,
}));

jest.mock('@/src/components/Footer', () => ({
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

jest.mock('@/src/app/context/authContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('renders the Navigation component', () => {
    render(
      <RootLayout>
        <main data-testid="content">Page Content</main>
      </RootLayout>
    );
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it('wraps children in AuthProvider and displays them', () => {
    render(
      <RootLayout>
        <main data-testid="child-content">Secure Area</main>
      </RootLayout>
    );

    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toHaveTextContent('Secure Area');
  });


  it('does not render a sidebar element', () => {
    render(
      <RootLayout>
        <main>Page</main>
      </RootLayout>
    );

    const sidebar = screen.queryByTestId('sidebar');
    expect(sidebar).not.toBeInTheDocument();
  });
});
