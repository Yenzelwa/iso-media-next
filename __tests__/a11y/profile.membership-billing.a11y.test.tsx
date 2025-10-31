import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { MembershipBilling } from '@/src/app/(root)/profile/membershipBilling';

expect.extend(toHaveNoViolations);

describe('MembershipBilling accessibility', () => {
  it('has no obvious axe violations', async () => {
    // Provide a minimal fetch so the component's effects can run and fall back gracefully
    // without making real network requests.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).fetch = jest.fn(async () => ({ ok: false, json: async () => ({}) }));

    const user = {
      id: 'test-user',
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1 (555) 123-4567',
      paymentMethod: 'Visa ****-****-****-1234',
      cardExpiry: '12/26',
      cardholderName: 'Test User',
      billingAddress: {
        street: '123 Main St', city: 'LA', state: 'CA', zipCode: '90001', country: 'USA'
      },
      token: 'fake',
    };
    const updateUser = jest.fn();
    const { container } = render(<MembershipBilling user={user} updateUser={updateUser} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
