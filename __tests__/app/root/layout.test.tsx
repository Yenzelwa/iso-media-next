
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// IMPORTANT: mock every component RootLayout imports that could be undefined
jest.mock('@/src/components/Navigation', () => ({
  Navigation: () => <nav data-testid="navigation" />,
}));

jest.mock('@/src/components/Footer', () => ({
  Footer: () => <footer data-testid="footer" />,
}));

jest.mock('@/src/components/ui/sooner', () => ({
  Toaster: () => <div data-testid="toaster" />,
  Sonner: () => <div data-testid="sonner" />,
}));

jest.mock('@/src/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: any) => (
    <div data-testid="tooltip-provider">{children}</div>
  ),
}));

// (Optional) If your AuthProvider has heavy side effects, stub it to a pass-through.
// Note: the path string must match exactly what RootLayout imports.
jest.mock('../../../src/app/context/authContext', () => ({
  AuthProvider: ({ children }: any) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

// Import AFTER mocks so the module under test sees the stubs
import RootLayout from '../../../src/app/(root)/layout';

describe('RootLayout', () => {
  it('renders the Navigation component', () => {
    render(
      <RootLayout>
        <main data-testid="content">Page Content</main>
      </RootLayout>
    );
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('wraps children (AuthProvider, TooltipProvider) and displays them', () => {
    render(
      <RootLayout>
        <main data-testid="child-content">Secure Area</main>
      </RootLayout>
    );
    // From our stubs:
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toHaveTextContent('Secure Area');

    // Toaster/Sonner present (stubbed)
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
    expect(screen.getByTestId('sonner')).toBeInTheDocument();
  });

  it('renders the Footer and no sidebar', () => {
    render(
      <RootLayout>
        <main>Page</main>
      </RootLayout>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    // Assert that we don't render a sidebar (by test id or role, depending on your app)
    expect(screen.queryByTestId(/sidebar/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
  });
});
