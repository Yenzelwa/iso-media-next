import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '@/src/app/(root)/layout';


jest.mock('@/src/components/Navigation', () => ({
  __esModule: true,
  default: () => <nav data-testid="nav">Mock Navigation</nav>,
}));

jest.mock('@/src/components/Footer', () => ({
  __esModule: true,
  Footer: () => <footer data-testid="footer">Mock Footer</footer>,
}));

jest.mock('@/src/app/context/authContext', () => ({
  __esModule: true,
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-provider">{children}</div>
  ),
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  jest.clearAllMocks();
});


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
