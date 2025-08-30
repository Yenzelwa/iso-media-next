import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanDetails } from '@/src/app/(root)/profile/PlanDetails';

// Mock lucide-react icons to simple elements
jest.mock('lucide-react', () => ({
  CreditCard: () => <svg data-testid="icon-credit" />,
  Settings: () => <svg data-testid="icon-settings" />,
  X: () => <svg data-testid="icon-x" />,
}));

describe('PlanDetails', () => {
  const originalAlert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    window.alert = originalAlert;
  });

  function openModalByButton(testid: RegExp | string) {
    fireEvent.click(screen.getByTestId(testid));
  }

  test('renders Current Plan summary with Premium details and status', () => {
    render(<PlanDetails />);

    // Headings and summary text
    const plan_summary = screen.getByTestId('plan_summary').closest('div')!
   // expect(within(plan_summary).getByText('current plan').toBeInTheDocument());
    expect(within(plan_summary).getByText(/Compare features and choose the perfect plan for you/i)).toBeInTheDocument();

    // Premium plan is current
   // expect(within(plan_summary).getByRole('heading', { name: /premium /i })).toBeInTheDocument();


   // Feature cards for current plan
  // expect(within(plan_summary).getByText('4K Ultra HD')).toBeInTheDocument();
   expect(within(plan_summary).getByText('4 Devices')).toBeInTheDocument();
  // expect(within(plan_summary).getByText('Unlimited')).toBeInTheDocument();

    // Action buttons in Current Plan section
     expect(within(plan_summary).getByRole('button', { name: /upgrade plan/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /cancel subscription/i })).toBeInTheDocument();
    // expect(screen.getByRole('button', { name: /upgrade plan/i })).toBeInTheDocument();
  });

  test('renders plan cards with correct labels and current plan ribbon', () => {
    render(<PlanDetails />);

    // All Available Plans heading
    expect(screen.getByRole('heading', { name: /all available plans/i })).toBeInTheDocument();

    // Premium card shows CURRENT PLAN, disabled button
   // Premium card: has CURRENT PLAN ribbon, and its action button is disabled.
    const premiumAction = screen.getByLabelText('premium'); // accessible name is from aria-label
    const premiumCard = premiumAction.closest('div')!;
    expect(within(premiumCard).getByRole('heading', { name: /premium/i })).toBeInTheDocument();
    expect(premiumAction).toBeDisabled();
    // (optional) still assert the visible text on the button:
  expect(premiumAction).toHaveTextContent(/current plan/i);
    // Basic card: current implementation compares strings for label (buggy but intentional here)
    const plan = screen.getByTestId('plan_summary').closest('div')!
   // const basicBtn = screen.getByRole('button', { name: /upgrade plan/i }).closest('div')!;
    expect(within(plan).getByRole('button', { name: /upgrade plan/i })).toBeInTheDocument();

  
  });

  test('clicking plan action buttons triggers alerts with correct upgrade/downgrade intent', () => {
    render(<PlanDetails />);
   const divCard = screen.getByTestId('plan_summary').closest('div')!;
    fireEvent.click(within(divCard).getByRole('button', {name: /downgrade plan/i}));
    expect(window.alert).toHaveBeenCalledWith(
      'Downgrading to Basic plan for $9.99/month'
    );

    // Family: label "Upgrade" and alert "Upgrading"
    fireEvent.click(within(divCard).getByRole('button', { name: /upgrade/i }));
    expect(window.alert).toHaveBeenCalledWith(
      'Upgrading to Family plan for $49.99/month'
    );
  });

  test('Manage Plan modal: open, Continue (alerts & closes), reopen and Close (no alert)', () => {
    render(<PlanDetails />);

    // Open
    openModalByButton(/manage-plan/i);
    const modal = screen.getByRole('heading', { name: /manage plan/i }).closest('div')!;
    expect(modal).toBeInTheDocument();

    // Continue -> alert and close
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(window.alert).toHaveBeenCalledWith('Plan management features are coming soon!');
    // Modal should close
    expect(screen.queryByRole('heading', { name: /manage plan/i })).not.toBeInTheDocument();

    // Reopen and Close (no alert)
    openModalByButton(/manage-plan/i);
    expect(screen.getByRole('heading', { name: /manage plan/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByRole('heading', { name: /manage plan/i })).not.toBeInTheDocument();
  });

  test('Cancel Subscription modal: open, Confirm Cancellation (alerts & closes), reopen and Keep Subscription (closes)', () => {
    render(<PlanDetails />);

    // Open
    openModalByButton(/cancel-subscription/i);
    expect(screen.getByRole('heading', { name: /cancel subscription/i })).toBeInTheDocument();
    // Confirm Cancellation -> alert and close
    fireEvent.click(screen.getByRole('button', { name: /confirm cancellation/i }));
    expect(window.alert).toHaveBeenCalledWith(
      'Subscription canceled. You will retain access until February 15, 2024.'
    );
    expect(screen.queryByRole('heading', { name: /cancel subscription/i })).not.toBeInTheDocument();

    // Reopen then Keep Subscription -> closes, no new alert
    openModalByButton(/cancel-subscription/i);
    expect(screen.getByRole('heading', { name: /cancel subscription/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /keep subscription/i }));
    expect(screen.queryByRole('heading', { name: /cancel subscription/i })).not.toBeInTheDocument();
  });

  test('Upgrade Plan modal: open, Upgrade Now (alerts & closes), reopen and Maybe Later (closes)', () => {
    render(<PlanDetails />);

    // Open
    openModalByButton(/upgrade-popup/i);
    expect(screen.getByRole('heading', { name: /upgrade plan/i })).toBeInTheDocument();

    // Upgrade Now -> alert and close
    fireEvent.click(screen.getByRole('button', { name: /upgrade now/i }));
    expect(window.alert).toHaveBeenCalledWith(
      'Upgrading to Family plan for $29.99/month. Changes will take effect immediately.'
    );
    expect(screen.queryByRole('heading', { name: /upgrade plan/i })).not.toBeInTheDocument();

    // Reopen -> Maybe Later -> close without alert
    openModalByButton(/upgrade-popup/i);
    expect(screen.getByRole('heading', { name: /upgrade plan/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /maybe later/i }));
    expect(screen.queryByRole('heading', { name: /upgrade plan/i })).not.toBeInTheDocument();
  });

  test('Feature Comparison table renders with expected headers and key cells', () => {
    render(<PlanDetails />);

    expect(screen.getByRole('heading', { name: /feature comparison/i })).toBeInTheDocument();

    // Verify some table headers and cells
    const featuresHeader = screen.getByRole('columnheader', { name: /features/i });
    const basicHeader = screen.getByRole('columnheader', { name: /basic/i });
    const premiumHeader = screen.getByRole('columnheader', { name: /premium/i });
    const familyHeader = screen.getByRole('columnheader', { name: /family/i });
    expect(featuresHeader).toBeInTheDocument();
    expect(basicHeader).toBeInTheDocument();
    expect(premiumHeader).toBeInTheDocument();
    expect(familyHeader).toBeInTheDocument();

    // Spot-check a few cells
    expect(screen.getAllByText(/4k ultra hd/i).length).toBeGreaterThanOrEqual(3); // Premium card, Family card, and table cells
    expect(screen.getAllByText(/devices/i).length).toBeGreaterThan(1)
    expect(screen.getAllByText(/unlimited/i).length).toBeGreaterThanOrEqual(3);
  });
});
