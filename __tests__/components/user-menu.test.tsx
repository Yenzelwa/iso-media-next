// __tests__/components/user-menu.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Router mock
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));



// IMPORTANT: mock the *exact* module path that UserMenu imports
// UserMenu has: import { useAuth } from '../app/context/authContext';
jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn(),
}));

// Pull the mocked hook so we can control its return value
import { useAuth } from '@/src/app/context/authContext';

// Import the component AFTER mocks
import { UserMenu } from '@/src/components/UserMenu';

const goTo = (path: string) => window.history.pushState({}, '', path);

describe('UserMenu', () => {
  const logoutMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    goTo('/'); // default: non-registration path

    // Default mock: authenticated premium user, no avatar (forces initials branch)
    (useAuth as jest.Mock).mockReturnValue({
      user: {
        id: 1,
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        subscription: 'premium',
        avatar: '',
      },
      logout: logoutMock,
    });
  });

  test('returns null when no user', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, logout: logoutMock });

    const { container } = render(<UserMenu />);
    expect(container.firstChild).toBeNull();
  });

  test('renders simplified registration header on /register and logs out', () => {
    goTo('/register'); // triggers the "registration pages" branch in the component

    render(<UserMenu />);

    // Compact header shows user info
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@example.com')).toBeInTheDocument();

    // Logout button works and redirects home
    const logoutBtn = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  test('opens/closes dropdown on non-registration pages and shows Premium label', () => {
    goTo('/'); // non-registration, full dropdown

    render(<UserMenu />);

    // Initials (no avatar)
    expect(screen.getAllByText('AL')[0]).toBeInTheDocument();

    // Toggle menu open
   const toggle = screen.getByLabelText('toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Menu content + subscription label
    expect(screen.getByText('My Profile')).toBeInTheDocument();
    expect(screen.getByText(/Premium Member/i)).toBeInTheDocument();

    // Click a link closes the menu
    fireEvent.click(screen.getByRole('link', { name: /my profile/i }));
    expect(screen.queryByText('My Profile')).not.toBeInTheDocument();
  });

  test('clicking outside closes the dropdown and "Sign Out" logs out + redirects', () => {
    render(<UserMenu />);

    // Open
    const toggle = screen.getByLabelText('toggle');
    fireEvent.click(toggle);
    expect(screen.getByText('My Profile')).toBeInTheDocument();

    // Click outside
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    fireEvent.mouseDown(outside);

    expect(screen.queryByText('My Profile')).not.toBeInTheDocument();

    // Open again and sign out
    fireEvent.click(toggle);
    fireEvent.click(screen.getByRole('button', { name: /sign out/i }));

    expect(logoutMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
