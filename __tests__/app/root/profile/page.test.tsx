import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '@/src/app/context/authContext';
import { useRouter } from 'next/navigation';
import AccountSettings from '@/src/app/(root)/profile/page';

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock child components
jest.mock('@/src/app/(root)/profile/navigationTabs', () => ({
  NavigationTabs: ({ activeTab, onTabChange }: any) => (
    <div data-testid="navigation-tabs">
      <button onClick={() => onTabChange('membership')}>Membership</button>
      <button onClick={() => onTabChange('plan')}>Plan</button>
      <button onClick={() => onTabChange('security')}>Security</button>
    </div>
  )
}));

jest.mock('@/src/app/(root)/profile/membershipSection', () => ({
  MembershipSection: () => <div>Membership Section Content</div>
}));

jest.mock('@/src/app/(root)/profile/planDetailsSection', () => ({
  PlanDetailsSection: () => <div>Plan Details Section Content</div>
}));

jest.mock('@/src/app/(root)/profile/securitySettings', () => ({
  Security: () => <div>Security Section Content</div>
}));

describe('AccountSettings Component', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockReset();
  });

  it('renders with default tab (membership)', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 }, loading: false });

    render(<AccountSettings />);
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
    expect(screen.getByText('Membership')).toBeInTheDocument();
  });

  it('renders plan details when plan tab is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 }, loading: false });

    render(<AccountSettings />);
    fireEvent.click(screen.getByText('Plan'));
    expect(screen.getByText('Plan Details Section Content')).toBeInTheDocument();
  });

  it('renders security section when security tab is clicked', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { id: 1 }, loading: false });

    render(<AccountSettings />);
    fireEvent.click(screen.getByText('Security'));
    expect(screen.getByText('Security Section Content')).toBeInTheDocument();
  });

  it('redirects to login if user is not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, loading: false });

    // Note: if you uncomment useEffect in the component, this test will now apply
    render(<AccountSettings />);
    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});
