// __tests__/components/change-phone-modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangePhoneModal from '@/src/components/ChangePhoneModal';

jest.mock('@/src/components/Modal', () => ({ __esModule: true, default: (props: any) => {
  const { isOpen, onClose, title, children } = props;
  if (!isOpen) return null;
  return (
    <div data-testid="modal">
      <h2>{title}</h2>
      <button aria-label="close" onClick={onClose}>×</button>
      {children}
    </div>
  );
}}));

const setup = (override: Partial<React.ComponentProps<typeof ChangePhoneModal>> = {}) => {
  const onClose = jest.fn();
  const onSave = jest.fn();
  const utils = render(
    <ChangePhoneModal
      isOpen={true}
      onClose={onClose}
      currentPhone="(555) 111-2222"
      onSave={onSave}
      {...override}
    />
  );
  const phoneInput = () => screen.getByPlaceholderText(/\(555\) 123-4567/i) as HTMLInputElement;
  const cancel = () => screen.getByRole('button', { name: /cancel/i });
  const send = () => screen.getByRole('button', { name: /send verification/i });
  return { utils, onClose, onSave, phoneInput, cancel, send };
};

// --- tests ---

test('does not render when isOpen=false', () => {
  const { queryByTestId } = render(
    <ChangePhoneModal isOpen={false} onClose={jest.fn()} currentPhone="(555) 111-2222" onSave={jest.fn()} />
  );
  expect(queryByTestId('modal')).not.toBeInTheDocument();
});

test('initializes with currentPhone and disables send', () => {
  const { phoneInput, send } = setup();
  expect(phoneInput().value).toBe('(555) 111-2222');
  expect(send()).toBeDisabled();
});

test('formats input as (XXX) XXX-XXXX and strips non-digits', () => {
  const { phoneInput } = setup({ currentPhone: '' });
  // type raw digits more than needed and some symbols
  fireEvent.change(phoneInput(), { target: { value: '123-45x67890!!' } });
  // After formatting: (123) 456-7890
  expect(phoneInput().value).toBe('(123) 456-7890');
  // maxLength attribute is 14
  expect(phoneInput().getAttribute('maxLength')).toBe('14');
});

test('keeps send disabled until length 14 and different from current', () => {
  const { phoneInput, send } = setup({ currentPhone: '' });
  fireEvent.change(phoneInput(), { target: { value: '12' } });
  expect(send()).toBeDisabled();
  fireEvent.change(phoneInput(), { target: { value: '1234567890' } });
  expect(phoneInput().value).toBe('(123) 456-7890');
  expect(send()).toBeEnabled();
});

test('does not save if value equals currentPhone', () => {
  const { send, onSave } = setup();
  // value equals current, button disabled by isValid rule
  expect(send()).toBeDisabled();
  fireEvent.click(send());
  expect(onSave).not.toHaveBeenCalled();
});

test('valid formatted phone triggers onSave and onClose', () => {
  const { phoneInput, send, onSave, onClose } = setup({ currentPhone: '' });
  fireEvent.change(phoneInput(), { target: { value: '9876543210' } });
  expect(phoneInput().value).toBe('(987) 654-3210');
  expect(send()).toBeEnabled();
  fireEvent.click(send());
  expect(onSave).toHaveBeenCalledWith('(987) 654-3210');
  expect(onClose).toHaveBeenCalled();
});

test('cancel invokes onClose', () => {
  const { cancel, onClose } = setup();
  fireEvent.click(cancel());
  expect(onClose).toHaveBeenCalled();
});
