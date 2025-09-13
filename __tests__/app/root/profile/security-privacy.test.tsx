// __tests__/app/root/profile/security-privacy.test.tsx
import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SecurityPrivacy } from '@/src/app/(root)/profile/SecurityPrivacy';

// Mock lucide-react icons to simple SVGs (keep className passthrough)
jest.mock('lucide-react', () => ({
  Shield: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-shield" {...p} />,
  Calendar: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-calendar" {...p} />,
  Bell: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-bell" {...p} />,
  User: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-user" {...p} />,
  Settings: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-settings" {...p} />,
  Eye: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-eye" {...p} />,
  History: (p: React.SVGProps<SVGSVGElement>) => <svg data-testid="icon-history" {...p} />,
}));



const getDeviceCardByName = (name: string) => {
  const title = screen.getByText(name);
  // The card root is two levels up from the device title <span>
  return title.closest('div')!.closest('div')!;
};

let alertSpy: jest.SpyInstance;
let confirmSpy: jest.SpyInstance;

beforeEach(() => {
  alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
});

afterEach(() => {
  jest.clearAllMocks();
  alertSpy.mockRestore();
  confirmSpy.mockRestore();
});

describe('SecurityPrivacy', () => {
  test('renders key sections, counts sessions, and shows key elements', () => {
    render(<SecurityPrivacy />);

    // Section headings that actually exist
    expect(screen.getByRole('heading', { name: /security settings/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /active devices/i })).toBeInTheDocument();

    // Initial sessions count
    expect(screen.getByText(/4 active sessions found/i)).toBeInTheDocument();

    // Key security elements that exist
    expect(screen.getByRole('button', { name: /logout all other devices/i })).toBeInTheDocument();
    expect(screen.getByTestId('toggle')).toBeInTheDocument();

    // Icons render (smoke check)
    expect(screen.getByTestId('icon-shield')).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-user').length).toBeGreaterThanOrEqual(1);
  });

  test('two-factor toggle shows modal and requires setup completion for color change', () => {
    render(<SecurityPrivacy />);

    // Two-Factor: initially off -> bg-gray-600
    const twoFAToggle = screen.getByTestId('toggle');
    expect(twoFAToggle.className).toMatch(/bg-gray-600/);
    
    // Click toggle opens modal (doesn't immediately change color)
    fireEvent.click(twoFAToggle);
    expect(twoFAToggle.className).toMatch(/bg-gray-600/); // Still gray until setup complete
    
    // Modal should be visible
    expect(screen.getByRole('heading', { name: /enable two-factor authentication/i })).toBeInTheDocument();
    
    // Complete setup to change toggle color
    const completeButton = screen.getByRole('button', { name: /complete setup/i });
    fireEvent.click(completeButton);
    
    // Now toggle should be red (enabled)
    expect(twoFAToggle.className).toMatch(/bg-red-600/);
  });

  test('Auto Logout select changes value', () => {
    render(<SecurityPrivacy />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('30');
    fireEvent.change(select, { target: { value: '60' } });
    expect(select.value).toBe('60');
    fireEvent.change(select, { target: { value: 'never' } });
    expect(select.value).toBe('never');
  });

  test('per-device Logout removes the device and shows alert', () => {
    render(<SecurityPrivacy />);

    // iPhone 14 Pro has a Logout button because it's not current
    const iphoneCard = screen.getByRole('region', { name: 'iPhone 14 Pro' });
    const logoutBtn = within(iphoneCard).getByRole('button', { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(alertSpy).toHaveBeenCalledWith('Successfully logged out iPhone 14 Pro');
    // Sessions count decreases
    expect(screen.getByText(/3 active sessions found/i)).toBeInTheDocument();
    // The device card disappears
    expect(screen.queryByText('iPhone 14 Pro')).not.toBeInTheDocument();

    // Current device (MacBook Pro) should not have a Logout button
    const macCard = getDeviceCardByName('MacBook Pro');
    expect(within(macCard).queryByRole('button', { name: /logout/i })).toBeNull();
  });

  test('bulk logout: confirm=false does nothing', () => {
    render(<SecurityPrivacy />);
    confirmSpy.mockReturnValueOnce(false);

    const bulkBtn = screen.getByRole('button', { name: /logout all other devices/i });
    fireEvent.click(bulkBtn);

    // No alert, devices unchanged
    expect(alertSpy).not.toHaveBeenCalled();
    expect(screen.getByText(/4 active sessions found/i)).toBeInTheDocument();
  });

  test('bulk logout: confirm=true removes all non-current, then second click shows "No other devices"', () => {
    render(<SecurityPrivacy />);

    const bulkBtn = screen.getByRole('button', { name: /logout all other devices/i });
    // First click: confirm true (default)
    fireEvent.click(bulkBtn);

    expect(alertSpy).toHaveBeenCalledWith('Successfully logged out 3 devices');
    expect(screen.getByText(/1 active sessions found/i)).toBeInTheDocument();

    // No Logout buttons remain (only current device)
    expect(screen.queryByRole('button', { name: /^logout$/i })).toBeNull();

    // Second click: no other devices
    fireEvent.click(bulkBtn);
    expect(alertSpy).toHaveBeenLastCalledWith('No other devices to log out');
  });

  test('device icon selection branches: User for iPhone & Samsung, Settings otherwise', () => {
    render(<SecurityPrivacy />);

    // iPhone -> User icon exists in that card
    const iphoneCard = screen.getByRole('region', { name: 'iPhone 14 Pro' });
    expect(within(iphoneCard).getByTestId('icon-user')).toBeInTheDocument();

    // Samsung TV hits first branch (contains "Samsung"), so also User
    const samsungCard = screen.getByRole('region', { name: 'Samsung TV' });
    expect(within(samsungCard).getByTestId('icon-user')).toBeInTheDocument();

    // MacBook / Windows -> Settings icon
    const macCard = screen.getByRole('region', { name: 'MacBook Pro' });
    expect(within(macCard).getByTestId('icon-settings')).toBeInTheDocument();
     const pcCard = screen.getByRole('region', { name: 'Windows PC' });
    expect(within(pcCard).getByTestId('icon-settings')).toBeInTheDocument();
  });


});
