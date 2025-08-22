/** @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MembershipBilling } from '@/src/app/(root)/profile/membershipBilling';

// Helpers
const makeUser = (overrides: Partial<any> = {}) => ({
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '123-456-7890',
  paymentMethod: 'Visa ****-****-****-1234',
  cardholderName: 'Jane Doe',
  cardExpiry: '12/28',
  billingAddress: {
    street: '1 Main St',
    city: 'Durban',
    state: 'KZN',
    zipCode: '4001',
    country: 'South Africa',
  },
  ...overrides,
});

const setup = (userOverrides: Partial<any> = {}) => {
  const user = makeUser(userOverrides);
  const updateUser = jest.fn();
  render(<MembershipBilling user={user} updateUser={updateUser} />);
  return { user, updateUser };
};

describe('MembershipBilling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders static account and billing info', () => {
    const { user } = setup();

    // Account Information
    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText('Email Address')).toBeInTheDocument();
    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText(user.phone)).toBeInTheDocument();

    // Billing Details
    expect(screen.getByText('Billing Details')).toBeInTheDocument();
    expect(screen.getByText('Primary Payment Method')).toBeInTheDocument();
    expect(screen.getByText(user.paymentMethod)).toBeInTheDocument();
    expect(screen.getByText(`Expires ${user.cardExpiry}`)).toBeInTheDocument();
    expect(screen.getByText(`Cardholder: ${user.cardholderName}`)).toBeInTheDocument();

    // Billing Address
    expect(screen.getByText(user.billingAddress.street)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${user.billingAddress.city}, ${user.billingAddress.state} ${user.billingAddress.zipCode}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(user.billingAddress.country)).toBeInTheDocument();

    // Billing History header
    expect(screen.getByText('Billing History')).toBeInTheDocument();
    // Default shows "Recent Transactions" and 5 rows
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
    const rows = screen.getAllByText(/Premium Monthly Subscription/);
    expect(rows.length).toBe(5);
  });

  xtest('edit name: enter, save and cancel', () => {
    const { updateUser } = setup();

    // Click "Edit" for name
    const editBtn = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editBtn);

    // Input appears
    const input = screen.getByDisplayValue('Jane Doe') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Janet Smith' } });

    // Save triggers updateUser with new name
    const saveBtn = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveBtn);
    expect(updateUser).toHaveBeenCalledWith({ name: 'Janet Smith' });

    // Enter edit mode again then cancel (to hit that branch)
    const editBtn2 = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editBtn2);
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    // Input should be gone; name text is visible again
    expect(screen.queryByDisplayValue('Janet Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Janet Smith')).toBeInTheDocument();
  });

test('change email via prompt', () => {
  const { user, updateUser } = setup();
  const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('new@example.com');

  const [emailChangeBtn] = screen.getAllByRole('button', { name: /change/i });
  fireEvent.click(emailChangeBtn);

  expect(promptSpy).toHaveBeenCalledWith('Enter new email address:', user.email);
  expect(updateUser).toHaveBeenCalledWith({ email: 'new@example.com' });

  // Same value → no update
  updateUser.mockClear();
  promptSpy.mockReturnValue(user.email);
  fireEvent.click(emailChangeBtn);
  expect(updateUser).not.toHaveBeenCalled();

  promptSpy.mockRestore();
});


  test('change phone via prompt', () => {
    const { user, updateUser } = setup();
    const buttons = screen.getAllByRole('button', { name: /change/i }); // [emailChange, phoneChange]
    const phoneChangeBtn = buttons[1];

    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('999-000-1111');
    fireEvent.click(phoneChangeBtn);
    expect(promptSpy).toHaveBeenCalledWith('Enter new phone number:', user.phone);
    expect(updateUser).toHaveBeenCalledWith({ phone: '999-000-1111' });

    // null / cancel should not update
    updateUser.mockClear();
    promptSpy.mockReturnValue(null);
    fireEvent.click(phoneChangeBtn);
    expect(updateUser).not.toHaveBeenCalled();

    promptSpy.mockRestore();
  });

  xtest('toggle card details eye button shows/hides details', () => {
    setup();

    // The first button in the "Current Payment Method" actions is the eye toggle
    const currentSection = screen.getByText('Primary Payment Method').closest('div')!.parentElement!;
    const buttons = within(currentSection).getAllByRole('button');
    const eyeToggle = buttons[0];

    // Show
    fireEvent.click(eyeToggle);
    expect(screen.getByText('Card Details')).toBeInTheDocument();
    expect(screen.getByText(/Card Type: Visa/i)).toBeInTheDocument();

    // Hide
    fireEvent.click(eyeToggle);
    expect(screen.queryByText('Card Details')).not.toBeInTheDocument();
  });

    xtest('update payment without new card number keeps previous paymentMethod', () => {
    const { user, updateUser } = setup();

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /update card/i }));

    // Do not set card number; set only name/expiry/address to hit the "no new card" branch
    fireEvent.change(screen.getByLabelText(/cardholder name/i), { target: { value: 'Card Holder' } });
    fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '01/31' } });

    // Update (no card number provided)
    fireEvent.click(screen.getByRole('button', { name: /update payment method/i }));

    expect(updateUser).toHaveBeenCalledWith({
      cardholderName: 'Card Holder',
      cardExpiry: '01/31',
      billingAddress: {
        street: user.billingAddress.street,
        city: user.billingAddress.city,
        state: user.billingAddress.state,
        zipCode: user.billingAddress.zipCode,
        country: user.billingAddress.country,
      },
      paymentMethod: user.paymentMethod, // same as before
    });
  });

  test('toggle billing history between recent (5) and all (10)', () => {
    setup();

    // Initially 5
    let rows = screen.getAllByText(/Premium Monthly Subscription/);
    expect(rows.length).toBe(5);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();

    // Toggle to View All (10)
    const toggleBtn = screen.getByRole('button', { name: /view all/i });
    fireEvent.click(toggleBtn);
    rows = screen.getAllByText(/Premium Monthly Subscription/);
    expect(rows.length).toBe(10);
    expect(screen.getByText('All Transactions')).toBeInTheDocument();

    // Toggle back to Recent (5)
    const showRecentBtn = screen.getByRole('button', { name: /show recent/i });
    fireEvent.click(showRecentBtn);
    rows = screen.getAllByText(/Premium Monthly Subscription/);
    expect(rows.length).toBe(5);
    expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
  });

  xtest('close modal with X icon', () => {
    setup();

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /update card/i }));
    expect(screen.getByText('Update Payment Details')).toBeInTheDocument();

    // Click X icon button (no name, but it is the button next to the heading)
    const dialogHeader = screen.getByText('Update Payment Details').closest('div')!;
    const xButton = within(dialogHeader.parentElement as HTMLElement).getByRole('button');
    fireEvent.click(xButton);

    expect(screen.queryByText('Update Payment Details')).not.toBeInTheDocument();
  });
});