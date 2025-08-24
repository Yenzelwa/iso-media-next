import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// --- Mocks ---
// Link -> simple anchor that forwards onClick
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, onClick, ...rest }: any) => (
    <a href={typeof href === 'string' ? href : href?.pathname} onClick={onClick} {...rest}>
      {children}
    </a>
  ),
}));

// UserMenu stub
jest.mock('../../src/components/UserMenu', () => ({
  UserMenu: () => <div data-testid="user-menu" />,
}));

// useAuth hook (we'll control return per test)
const mockUseAuth = jest.fn();
jest.mock('../../src/app/context/authContext', () => ({
  useAuth: () => mockUseAuth(),
}));

import { Navigation } from '../../src/components/Navigation';

const getMobileWrapper = (container: HTMLElement) =>
  container.querySelector('.lg\\:hidden.transition-all.duration-500.ease-out') as HTMLDivElement;

const getToggle = () => screen.getByRole('button', { name: /toggle mobile menu/i });

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders brand and desktop auth links when logged out', () => {
    mockUseAuth.mockReturnValue({ user: null, logout: jest.fn() });
    render(<Navigation />);

    expect(screen.getByText('IsolaKwaMUNTU')).toBeInTheDocument();
    // Desktop actions (hidden via CSS but present in DOM)
    expect(screen.getAllByText('Log In')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Get Started')[0]).toBeInTheDocument();
    expect(screen.queryByTestId('user-menu')).not.toBeInTheDocument();

    // Desktop nav links exist
    expect(screen.getAllByText('BROWSE')[0]).toBeInTheDocument();
    expect(screen.getAllByText('SERIES')[0]).toBeInTheDocument();
    expect(screen.getAllByText('DOCUMENTARY')[0]).toBeInTheDocument();
  });

  it('toggles mobile menu via click and keyboard (Enter/Space)', () => {
    mockUseAuth.mockReturnValue({ user: null, logout: jest.fn() });
    const { container } = render(<Navigation />);

    const toggle = getToggle();
    const wrapper = getMobileWrapper(container);
    expect(wrapper).toBeInTheDocument();

    // Initially closed
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(wrapper!.className).toMatch(/max-h-0/);

    // Click opens
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(wrapper!.className).toMatch(/max-h-screen/);
    expect(wrapper!.className).toMatch(/opacity-100/);

    // Enter closes
    fireEvent.keyDown(toggle, { key: 'Enter' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(wrapper!.className).toMatch(/max-h-0/);

    // Space opens again
    fireEvent.keyDown(toggle, { key: ' ' });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(wrapper!.className).toMatch(/max-h-screen/);
  });

  it('clicking a mobile link closes the menu (logged out)', () => {
    mockUseAuth.mockReturnValue({ user: null, logout: jest.fn() });
    const { container } = render(<Navigation />);

    const toggle = getToggle();
    const wrapper = getMobileWrapper(container)!;

    // Open
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Click Log In inside mobile menu -> closes
    fireEvent.click(screen.getAllByText('Log In')[1]);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(wrapper.className).toMatch(/max-h-0/);
  });

  it('shows UserMenu when logged in on desktop; mobile sign out calls logout and closes', () => {
    const logout = jest.fn();
    mockUseAuth.mockReturnValue({ user: { id: 1, name: 'Jane' }, logout });
    const { container } = render(<Navigation />);

    // Desktop shows user menu instead of auth links
    expect(screen.getByTestId('user-menu')).toBeInTheDocument();
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument();

    // Mobile: open and sign out
    const toggle = getToggle();
    const wrapper = getMobileWrapper(container)!;

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));
    expect(logout).toHaveBeenCalledTimes(1);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(wrapper.className).toMatch(/max-h-0/);
  });
});
