/** @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlanDetails } from '@/src/app/(root)/profile/PlanDetails';

xdescribe('PlanDetails', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => render(<PlanDetails />);

  test('renders current plan summary, price, status, and feature sections', () => {
    renderComponent();

    // Current section
    expect(screen.getByText('Current Plan')).toBeInTheDocument();
    expect(screen.getByText('Your active subscription and plan details')).toBeInTheDocument();

    // Current plan = Premium
    expect(screen.getByText(/premium plan/i)).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText(/active subscription/i)).toBeInTheDocument();

    // Cards in current summary
    expect(screen.getByText('Streaming Quality')).toBeInTheDocument();
    expect(screen.getByText('Simultaneous Streaming')).toBeInTheDocument();
    expect(screen.getByText('Downloads')).toBeInTheDocument();
    expect(screen.getByText('4K Ultra HD')).toBeInTheDocument();
    expect(screen.getByText('4 Devices')).toBeInTheDocument();
    expect(screen.getByText('Unlimited')).toBeInTheDocument();

    // All Available Plans
    expect(screen.getByText('All Available Plans')).toBeInTheDocument();
    expect(screen.getByText('Compare features and choose the perfect plan for you')).toBeInTheDocument();

    // Feature Comparison table
    expect(screen.getByText('Feature Comparison')).toBeInTheDocument();
    expect(screen.getByText('Detailed comparison of all plan features')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    // Spot-check table headers and contents
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.getAllByText('4K Ultra HD').length).toBeGreaterThan(0);
  });

  test('plan cards: current disabled, basic shows Downgrade, family shows Upgrade; clicking triggers proper alerts', () => {
    renderComponent();

    // There are three plan cards: Basic, Premium (current), Family.
    const basicCard = screen.getByText(/^Basic$/).closest('div')!;
    const premiumCard = screen.getByText(/^Premium$/).closest('div')!;
    const familyCard = screen.getByText(/^Family$/).closest('div')!;

    // Premium (current) has disabled button labeled "Current Plan"
    const premiumButton = within(premiumCard).getByRole('button');
    expect(premiumButton).toBeDisabled();
    expect(premiumButton).toHaveTextContent(/current plan/i);

    // Basic is cheaper than Premium -> Downgrade
    const basicAction = within(basicCard).getByRole('button');
    expect(basicAction).toHaveTextContent(/downgrade/i);
    fireEvent.click(basicAction);
    expect(alertSpy).toHaveBeenCalledWith('Downgrading to Basic plan for $9.99/month');

    // Family is more expensive than Premium -> Upgrade
    const familyAction = within(familyCard).getByRole('button');
    expect(familyAction).toHaveTextContent(/upgrade/i);
    fireEvent.click(familyAction);
    expect(alertSpy).toHaveBeenCalledWith('Upgrading to Family plan for $29.99/month');
  });

  test('Manage Plan modal: open, close with X, open again then Continue (alerts & closes) and Close button', () => {
    renderComponent();

    // Open Manage Plan
    const manageBtn = screen.getByRole('button', { name: /manage plan/i });
    fireEvent.click(manageBtn);
    expect(screen.getByText('Manage Plan')).toBeInTheDocument();

    // Close with X
    const dialogHeader = screen.getByText('Manage Plan').closest('div')!;
    const xBtn = within(dialogHeader.parentElement as HTMLElement).getByRole('button');
    fireEvent.click(xBtn);
    expect(screen.queryByText('Manage Plan')).not.toBeInTheDocument();

    // Open again
    fireEvent.click(manageBtn);
    expect(screen.getByText('Manage Plan')).toBeInTheDocument();

    // Continue -> alert + close
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(alertSpy).toHaveBeenCalledWith('Plan management features are coming soon!');
    expect(screen.queryByText('Manage Plan')).not.toBeInTheDocument();

    // Open again, then Close button
    fireEvent.click(manageBtn);
    expect(screen.getByText('Manage Plan')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /^close$/i }));
    expect(screen.queryByText('Manage Plan')).not.toBeInTheDocument();
  });

  test('Cancel Subscription modal: open, Confirm (alerts & closes), reopen and Keep Subscription closes, X also closes', () => {
    renderComponent();

    const cancelBtn = screen.getByRole('button', { name: /cancel subscription/i });
    fireEvent.click(cancelBtn);

    expect(screen.getByText('Cancel Subscription')).toBeInTheDocument();
    // Confirm Cancellation -> alert + close
    fireEvent.click(screen.getByRole('button', { name: /confirm cancellation/i }));
    expect(alertSpy).toHaveBeenCalledWith(
      'Subscription canceled. You will retain access until February 15, 2024.'
    );
    expect(screen.queryByText('Cancel Subscription')).not.toBeInTheDocument();

    // Reopen & Keep Subscription -> close w/o alert
    fireEvent.click(cancelBtn);
    expect(screen.getByText('Cancel Subscription')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /keep subscription/i }));
    expect(screen.queryByText('Cancel Subscription')).not.toBeInTheDocument();

    // Reopen & close with X
    fireEvent.click(cancelBtn);
    expect(screen.getByText('Cancel Subscription')).toBeInTheDocument();
    const dialogHeader = screen.getByText('Cancel Subscription').closest('div')!;
    const xBtn = within(dialogHeader.parentElement as HTMLElement).getByRole('button');
    fireEvent.click(xBtn);
    expect(screen.queryByText('Cancel Subscription')).not.toBeInTheDocument();
  });

  test('Upgrade Plan modal: open, Upgrade Now (alerts & closes), reopen and Maybe Later closes, X also closes', () => {
    renderComponent();

    const upgradeBtn = screen.getByRole('button', { name: /upgrade plan/i });
    fireEvent.click(upgradeBtn);
    expect(screen.getByText('Upgrade Plan')).toBeInTheDocument();

    // Upgrade Now -> alert + close
    fireEvent.click(screen.getByRole('button', { name: /upgrade now/i }));
    expect(alertSpy).toHaveBeenCalledWith(
      'Upgrading to Family plan for $29.99/month. Changes will take effect immediately.'
    );
    expect(screen.queryByText('Upgrade Plan')).not.toBeInTheDocument();

    // Reopen & Maybe Later -> close without alert
    fireEvent.click(upgradeBtn);
    expect(screen.getByText('Upgrade Plan')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /maybe later/i }));
    expect(screen.queryByText('Upgrade Plan')).not.toBeInTheDocument();

    // Reopen & close with X
    fireEvent.click(upgradeBtn);
    expect(screen.getByText('Upgrade Plan')).toBeInTheDocument();
    const dialogHeader = screen.getByText('Upgrade Plan').closest('div')!;
    const xBtn = within(dialogHeader.parentElement as HTMLElement).getByRole('button');
    fireEvent.click(xBtn);
    expect(screen.queryByText('Upgrade Plan')).not.toBeInTheDocument();
  });
})

