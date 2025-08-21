import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProfilePage from '@/src/app/(root)/profile/page';

// ==== Mocks ====

// Mock the auth context hook used by the page
jest.mock('@/src/app/context/authContext', () => ({
  __esModule: true,
  useAuth: jest.fn(),
}));

// Mock MembershipBilling (named export)
jest.mock('@/src/app/(root)/profile/membershipBilling', () => ({
  __esModule: true,
  MembershipBilling: ({ user, updateUser }: any) => (
    <div data-testid="membership-billing">
      <div data-testid="billing-username">{user?.name}</div>
      <button
        onClick={() =>
          updateUser({
            name: 'New Name',
            email: 'new@example.com',
          })
        }
      >
        Trigger UpdateUser
      </button>
    </div>
  ),
}));

// Mock PlanDetails (named export)
jest.mock('@/src/app/(root)/profile/PlanDetails', () => ({
  __esModule: true,
  PlanDetails: () => <div data-testid="plan-details">PlanDetails</div>,
}));

// Mock SecurityPrivacy (named export)
jest.mock('@/src/app/(root)/profile/SecurityPrivacy', () => ({
  __esModule: true,
  SecurityPrivacy: () => <div data-testid="security-privacy">SecurityPrivacy</div>,
}));

// Mock ProfileSidebar (named export) and expose a way to change tabs
jest.mock('@/src/app/(root)/profile/ProfileSidebar', () => ({
  __esModule: true,
  ProfileSidebar: ({ user, activeTab, setActiveTab, tabs }: any) => (
    <aside data-testid="profile-sidebar">
      <div data-testid="sidebar-user-name">{user?.name}</div>
      <div data-testid="sidebar-active-tab">{activeTab}</div>
      <div>
        {tabs?.map((t: any) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
    </aside>
  ),
}));

// Helper to control the mocked useAuth return per test
const { useAuth } = jest.requireMock('@/src/app/context/authContext') as {
  useAuth: jest.Mock;
};

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders unauthenticated state and calls login when clicking "Set Demo User"', async () => {
    const user = userEvent.setup();
    const login = jest.fn();

    useAuth.mockReturnValue({
      user: null,
      login,
    });

    render(<ProfilePage />);

    // Shows Welcome and CTA
    expect(screen.getByRole('heading', { level: 1, name: /welcome/i })).toBeInTheDocument();
    const setDemoBtn = screen.getByRole('button', { name: /set demo user/i });
    expect(setDemoBtn).toBeInTheDocument();

    await user.click(setDemoBtn);

    // Should call login with empty token and the fake user object
    expect(login).toHaveBeenCalledTimes(1);
    const [tokenArg, userArg] = login.mock.calls[0];
    expect(tokenArg).toBe(''); // token is '' in setFakeUser
    expect(userArg).toMatchObject({
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      subscription: 'premium',
    });
  });

  it('renders authenticated state (defaults to Account tab) and shows components', () => {
    const login = jest.fn();
    // Auth user returned by the hook (component will extend it via useEffect)
    const authUser = {
      id: 'abc',
      name: 'Auth User',
      email: 'auth@example.com',
      avatar: '',
      subscription: 'basic' as const,
      token: 'tok-123',
    };

    useAuth.mockReturnValue({
      user: authUser,
      login,
    });

    render(<ProfilePage />);

    // Heading and helper text
    expect(screen.getByRole('heading', { level: 1, name: /my profile/i })).toBeInTheDocument();
    expect(screen.getByText(/manage your account settings and preferences/i)).toBeInTheDocument();

    // Sidebar shows the (extended) user name, which starts from auth user
    expect(screen.getByTestId('profile-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar-user-name')).toHaveTextContent('Auth User');

    // Default active tab is 'account' → MembershipBilling visible
    expect(screen.getByTestId('membership-billing')).toBeInTheDocument();
    expect(screen.queryByTestId('plan-details')).not.toBeInTheDocument();
    expect(screen.queryByTestId('security-privacy')).not.toBeInTheDocument();
  });

  it('switches tabs via sidebar buttons', async () => {
    const user = userEvent.setup();
    const login = jest.fn();
    const authUser = {
      id: 'abc',
      name: 'Auth User',
      email: 'auth@example.com',
      avatar: '',
      subscription: 'basic' as const,
      token: 'tok-123',
    };

    useAuth.mockReturnValue({
      user: authUser,
      login,
    });

    render(<ProfilePage />);

    // Buttons are rendered by mocked ProfileSidebar in order:
    // "Account Settings", "Plan Details", "Security & Privacy"
    const accountBtn = screen.getByRole('button', { name: /account settings/i });
    const planBtn = screen.getByRole('button', { name: /plan details/i });
    const securityBtn = screen.getByRole('button', { name: /security & privacy/i });

    // Start in Account
    expect(screen.getByTestId('membership-billing')).toBeInTheDocument();

    // Go to Plan Details
    await user.click(planBtn);
    expect(screen.getByTestId('plan-details')).toBeInTheDocument();
    expect(screen.queryByTestId('membership-billing')).not.toBeInTheDocument();
    expect(screen.queryByTestId('security-privacy')).not.toBeInTheDocument();

    // Go to Security & Privacy
    await user.click(securityBtn);
    expect(screen.getByTestId('security-privacy')).toBeInTheDocument();
    expect(screen.queryByTestId('membership-billing')).not.toBeInTheDocument();
    expect(screen.queryByTestId('plan-details')).not.toBeInTheDocument();

    // Back to Account
    await user.click(accountBtn);
    expect(screen.getByTestId('membership-billing')).toBeInTheDocument();
  });

  it('calls login with updated name/email when updateUser is triggered', async () => {
    const user = userEvent.setup();
    const login = jest.fn();
    const authUser = {
      id: 'abc',
      name: 'Auth User',
      email: 'auth@example.com',
      avatar: '',
      subscription: 'basic' as const,
      token: 'tok-123',
    };

    useAuth.mockReturnValue({
      user: authUser,
      login,
    });

    render(<ProfilePage />);

    // MembershipBilling mock exposes a button to call updateUser({ name, email })
    const trigger = screen.getByRole('button', { name: /trigger updateuser/i });
    await user.click(trigger);

    // login should be called because name/email changed
    expect(login).toHaveBeenCalledTimes(1);
    const [tokenArg, updatedUserArg] = login.mock.calls[0];
    expect(tokenArg).toBe('tok-123');
    expect(updatedUserArg).toMatchObject({
      id: 'abc',
      name: 'New Name',
      email: 'new@example.com',
      subscription: 'basic',
      token: 'tok-123',
    });

    // Sidebar should reflect updated name from extendedUser state
    expect(screen.getByTestId('sidebar-user-name')).toHaveTextContent('New Name');
    // MembershipBilling also echoes current user name (from props)
    expect(screen.getByTestId('billing-username')).toHaveTextContent('New Name');
  });
});
