// __tests__/app/root/profile/profile-sidebar.test.tsx
import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProfileSidebar } from '@/src/app/(root)/profile/ProfileSidebar';

// Mock lucide-react's User icon used inside the component
jest.mock('lucide-react', () => ({
  // forward className/props so we can assert classes
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg data-testid="icon-user" {...props} />
  ),
}));

// Simple stub icons for tabs (accept className to ensure it renders on the element)
const IconProfile: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg data-testid="icon-profile" {...p} />
);
const IconSecurity: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg data-testid="icon-security" {...p} />
);
const IconBilling: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (
  <svg data-testid="icon-billing" {...p} />
);

describe('ProfileSidebar', () => {
  const user = { name: 'Jane Doe', email: 'jane@example.com' };
  const tabs = [
    { id: 'profile', label: 'Profile', icon: IconProfile },
    { id: 'security', label: 'Security', icon: IconSecurity },
    { id: 'billing', label: 'Billing', icon: IconBilling },
  ];

  test('renders user avatar/info and the User icon with correct classes', () => {
    const setActiveTab = jest.fn();
    render(
      <ProfileSidebar
        user={user}
        activeTab="profile"
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
    );

    // User name & email
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();

    // Avatar/User icon (comes from lucide-react mock) should receive className from component
    const userIcon = screen.getByTestId('icon-user');
    expect(userIcon).toBeInTheDocument();
    expect(userIcon).toHaveClass('w-10', 'h-10', 'text-white');
  });

  test('renders all tabs with icons, highlights the active tab, and calls setActiveTab on click', () => {
    const setActiveTab = jest.fn();
    const { rerender } = render(
      <ProfileSidebar
        user={user}
        activeTab="profile"
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
    );

    // All tabs render as buttons with visible names
    const profileBtn = screen.getByRole('button', { name: 'Profile' });
    const securityBtn = screen.getByRole('button', { name: 'Security' });
    const billingBtn = screen.getByRole('button', { name: 'Billing' });

    // Their icons render inside the buttons and accept className from component
    expect(within(profileBtn).getByTestId('icon-profile')).toHaveClass('w-5', 'h-5');
    expect(within(securityBtn).getByTestId('icon-security')).toHaveClass('w-5', 'h-5');
    expect(within(billingBtn).getByTestId('icon-billing')).toHaveClass('w-5', 'h-5');

    // Active tab styling (profile is active initially)
    expect(profileBtn).toHaveClass('bg-red-600/20', 'text-red-400', 'border', 'border-red-500/30');
    expect(securityBtn).toHaveClass('text-gray-400');
    expect(billingBtn).toHaveClass('text-gray-400');

    // Clicking each tab calls setActiveTab with correct id
    fireEvent.click(securityBtn);
    fireEvent.click(billingBtn);
    fireEvent.click(profileBtn);

    expect(setActiveTab).toHaveBeenNthCalledWith(1, 'security');
    expect(setActiveTab).toHaveBeenNthCalledWith(2, 'billing');
    expect(setActiveTab).toHaveBeenNthCalledWith(3, 'profile');

    // Re-render with a different active tab to cover both branches of the className ternary
    rerender(
      <ProfileSidebar
        user={user}
        activeTab="billing"
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
    );

    // Now billing should be active; others inactive
    expect(screen.getByRole('button', { name: 'Billing' })).toHaveClass(
      'bg-red-600/20',
      'text-red-400',
      'border',
      'border-red-500/30'
    );
    expect(screen.getByRole('button', { name: 'Profile' })).toHaveClass('text-gray-400');
    expect(screen.getByRole('button', { name: 'Security' })).toHaveClass('text-gray-400');
  });
});
