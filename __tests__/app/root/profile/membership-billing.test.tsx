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


// ---- tweak setup to return rerender ----
const setup = (userOverrides: Partial<any> = {}) => {
  const user = makeUser(userOverrides);
  const updateUser = jest.fn();
  const view = render(<MembershipBilling user={user} updateUser={updateUser} />);
  return { user, updateUser, rerender: view.rerender };
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



  test('change phone via prompt', () => {
    const { user, updateUser } = setup();
    const phoneChangeBtn = screen.getByRole('button', { name: /change/i });

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

  test('close modal with Cancel button', () => {
    setup();

    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /update card/i }));
    expect(screen.getByText('Update Payment Details')).toBeInTheDocument();

    // Click Cancel button at the bottom of the modal
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(screen.queryByText('Update Payment Details')).not.toBeInTheDocument();
  });

test('handleSave(name) — positive: saves edited value and exits edit mode', () => {
  const { user, updateUser, rerender } = setup();

  // Enter edit mode for "name"
  fireEvent.click(screen.getByRole('button', { name: /edit/i }));

  // Change the value and save
  const input = screen.getByDisplayValue('Jane Doe') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Janet Smith' } });
  fireEvent.click(screen.getByRole('button', { name: /save/i }));

  // Callback received with the new value
  expect(updateUser).toHaveBeenCalledWith({ name: 'Janet Smith' });

  // Simulate parent updating the prop
  const updatedUser = { ...user, name: 'Janet Smith' };
  rerender(<MembershipBilling user={updatedUser} updateUser={updateUser} />);

  // Edit mode should be closed and new name rendered
  expect(screen.queryByDisplayValue('Janet Smith')).not.toBeInTheDocument();
  expect(screen.getByText('Janet Smith')).toBeInTheDocument();
});


test('handleSave(name) — negative: cancel does not save and remains original display', () => {
  const { updateUser } = setup();

  // Enter edit mode and type a change
  fireEvent.click(screen.getByRole('button', { name: /edit/i }));
  const input = screen.getByDisplayValue('Jane Doe') as HTMLInputElement;
  fireEvent.change(input, { target: { value: 'Nope Nope' } });

  // Cancel instead of saving
  fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

  // Should NOT call updateUser and edit input disappears
  expect(updateUser).not.toHaveBeenCalled();
  expect(screen.queryByDisplayValue('Nope Nope')).not.toBeInTheDocument();
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
});

xtest('handleBillingUpdate — positive: new card number updates masked payment method, closes modal, clears sensitive fields', () => {
  const { user, updateUser } = setup();

  // Open modal
  fireEvent.click(screen.getByRole('button', { name: /update card/i }));
  expect(screen.getByText('Update Payment Details')).toBeInTheDocument();

  // Fill in fields including a NEW card number
  fireEvent.change(screen.getByLabelText(/cardholder name/i), { target: { value: 'Card Holder' } });
  fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '4111111111115678' } });
  fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '01/31' } });
  fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

  // Submit update
  fireEvent.click(screen.getByRole('button', { name: /update payment method/i }));

  // Expect updated masked payment method + other fields sent
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
    paymentMethod: 'Visa ****-****-****-5678',
  });

  // Modal should close
  expect(screen.queryByText('Update Payment Details')).not.toBeInTheDocument();

  // Re-open to ensure sensitive fields were cleared
  fireEvent.click(screen.getByRole('button', { name: /update card/i }));
  const cardNumberInput = screen.getByLabelText(/card number/i) as HTMLInputElement;
  const cvvInput = screen.getByLabelText(/cvv/i) as HTMLInputElement;
  expect(cardNumberInput.value).toBe('');
  expect(cvvInput.value).toBe('');
});

xtest('handleBillingUpdate — negative: no new card number keeps previous payment method and closes modal', () => {
  const { user, updateUser } = setup();

  // Open modal
  fireEvent.click(screen.getByRole('button', { name: /update card/i }));
  expect(screen.getByText('Update Payment Details')).toBeInTheDocument();

  // Do NOT set card number; change other fields
  fireEvent.change(screen.getByLabelText(/cardholder name/i), { target: { value: 'Card Holder' } });
  fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '01/31' } });

  // Submit update
  fireEvent.click(screen.getByRole('button', { name: /update payment method/i }));

  // Should keep previous payment method
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
    paymentMethod: user.paymentMethod,
  });

  // Modal should close
  expect(screen.queryByText('Update Payment Details')).not.toBeInTheDocument();
});


  // add test for below functionality, add both negetive and positive
  // 1. handleSave
  // 2.handleBillingUpdate
});