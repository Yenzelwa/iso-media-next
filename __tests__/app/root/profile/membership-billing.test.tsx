/** @jest-environment jsdom */

import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MembershipBilling } from '@/src/app/(root)/profile/membershipBilling';

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
  const view = render(<MembershipBilling user={user} updateUser={updateUser} />);
  return { user, updateUser, rerender: view.rerender };
};

describe('MembershipBilling', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ items: [] }),
    }) as unknown as typeof fetch;
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  test('renders static account and billing info with formatted phone', () => {
    setup();

    expect(screen.getByText('Account Information')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('(123) 456-7890')).toBeInTheDocument();

    expect(screen.getByText('Billing Details')).toBeInTheDocument();
    expect(screen.getByText('Primary Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Visa ****-****-****-1234')).toBeInTheDocument();
  });

  test('phone edit flow formats digits and triggers updateUser', async () => {
    const { user, updateUser, rerender } = setup();

    const phoneSection = screen.getByTestId('phone-section');
    fireEvent.click(within(phoneSection).getByRole('button', { name: /change/i }));

    const input = within(phoneSection).getByLabelText(/phone number/i) as HTMLInputElement;
    expect(input.value).toBe('(123) 456-7890');

    const saveButton = within(phoneSection).getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();

    fireEvent.change(input, { target: { value: '9990001111' } });
    await waitFor(() => expect(saveButton).toBeEnabled());

    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    fireEvent.click(saveButton);

    expect(updateUser).toHaveBeenCalledWith({ phone: '(999) 000-1111' });
    expect(infoSpy).toHaveBeenCalledWith(
      'profile.phone.update',
      expect.objectContaining({ last4: '1111' }),
    );
    infoSpy.mockRestore();

    const updatedUser = { ...user, phone: '(999) 000-1111' };
    rerender(<MembershipBilling user={updatedUser} updateUser={updateUser} />);

    expect(screen.getByText('(999) 000-1111')).toBeInTheDocument();
    expect(screen.queryByLabelText(/phone number/i)).not.toBeInTheDocument();
  });

  test('cancel phone edit restores original value and skips update', async () => {
    const { updateUser } = setup();

    const phoneSection = screen.getByTestId('phone-section');
    fireEvent.click(within(phoneSection).getByRole('button', { name: /change/i }));

    const input = within(phoneSection).getByLabelText(/phone number/i) as HTMLInputElement;
    const saveButton = within(phoneSection).getByRole('button', { name: /save/i });

    fireEvent.change(input, { target: { value: '123' } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(input, { target: { value: '1234567890' } });
    expect(saveButton).toBeDisabled();

    fireEvent.change(input, { target: { value: '2223334444' } });
    await waitFor(() => expect(saveButton).toBeEnabled());

    fireEvent.click(within(phoneSection).getByRole('button', { name: /cancel/i }));

    expect(updateUser).not.toHaveBeenCalled();
    expect(screen.queryByLabelText(/phone number/i)).not.toBeInTheDocument();
    expect(screen.getByText('(123) 456-7890')).toBeInTheDocument();
  });

  test('does not enable save when digits are unchanged', async () => {
    setup();

    const phoneSection = screen.getByTestId('phone-section');
    fireEvent.click(within(phoneSection).getByRole('button', { name: /change/i }));

    const input = within(phoneSection).getByLabelText(/phone number/i) as HTMLInputElement;
    const saveButton = within(phoneSection).getByRole('button', { name: /save/i });

    fireEvent.change(input, { target: { value: '1234567890' } });
    await waitFor(() => expect(saveButton).toBeDisabled());
  });
});
