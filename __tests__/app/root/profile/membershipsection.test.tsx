import React from 'react';
import { render, screen } from '@testing-library/react';
import { Membership, BillingRecord } from '@/typings';
import { MembershipSection } from '@/src/app/(root)/profile/membershipSection';

describe('MembershipSection', () => {
  const mockMembership: Membership = {
    full_name: 'john.doe',
    plan: 'Premium',
    nextBilling: '2024-02-15',
    price: 19.99,
    email: 'john.doe@example.com',
    cardType: 'Visa',
    cardNumber: '****-****-****-4242',
    phone: '+1 (555) 123-4567',
  };

  const mockBillingHistory: BillingRecord[] = [
    {
      date: '2024-01-15',
      amount: 19.99,
      description: 'Monthly subscription - Premium',
    },
    {
      date: '2023-12-15',
      amount: 19.99,
      description: 'Monthly subscription - Premium',
    },
  ];

  beforeEach(() => {
    render(
      <MembershipSection/>
    );
  });

  it('renders membership name, email and phone number', () => {
    expect(screen.getByText('john.doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
  });

  it('renders change buttons for name, email, password, and phone', () => {
    expect(screen.getByText('Edit name')).toBeInTheDocument();
    expect(screen.getByText('Change email')).toBeInTheDocument();
    expect(screen.getByText('Change password')).toBeInTheDocument();
     expect(screen.getByText('Change cellPhone')).toBeInTheDocument();
  });

  it('renders billing details section', () => {
    expect(screen.getByText('Visa ****-****-****-4242')).toBeInTheDocument();
    expect(screen.getByText('Monthly on the 15')).toBeInTheDocument();
    expect(screen.getByText('February 15, 2024')).toBeInTheDocument();
  });

  it('renders billing history records', () => {
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('December 15, 2023')).toBeInTheDocument();

    expect(
      screen.getAllByText('Monthly subscription - Premium').length
    ).toBe(2);

    expect(screen.getAllByText('$19.99').length).toBe(2);
  });

  it('renders section headers', () => {
    expect(screen.getByText('Membership')).toBeInTheDocument();
    expect(screen.getByText('Billing Details')).toBeInTheDocument();
    expect(screen.getByText('Billing History')).toBeInTheDocument();
  });
});
