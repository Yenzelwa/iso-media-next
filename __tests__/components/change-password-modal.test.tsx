// __tests__/components/change-password-modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangePasswordModal from '@/src/components/ChangePasswordModal';

// Mock Modal to keep logic focused and enable isOpen behavior
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

const setup = (override: Partial<React.ComponentProps<typeof ChangePasswordModal>> = {}) => {
  const onClose = jest.fn();
  const onSave = jest.fn();
  const utils = render(
    <ChangePasswordModal
      isOpen={true}
      onClose={onClose}
      onSave={onSave}
      {...override}
    />
  );
  const current = () => screen.getByPlaceholderText(/enter current password/i) as HTMLInputElement;
  const next = () => screen.getByPlaceholderText(/enter new password/i) as HTMLInputElement;
  const confirm = () => screen.getByPlaceholderText(/confirm new password/i) as HTMLInputElement;
  const show = () => screen.getByLabelText(/show passwords/i) as HTMLInputElement;
  const cancel = () => screen.getByRole('button', { name: /cancel/i });
  const update = () => screen.getByRole('button', { name: /update password/i });
  return { utils, onClose, onSave, current, next, confirm, show, cancel, update };
};

// --- tests ---

test('does not render when isOpen=false', () => {
  const { queryByTestId } = render(
    <ChangePasswordModal isOpen={false} onClose={jest.fn()} onSave={jest.fn()} />
  );
  expect(queryByTestId('modal')).not.toBeInTheDocument();
});

test('initial state disables update button', () => {
  const { update } = setup();
  expect(update()).toBeDisabled();
});

test('new password too short shows helper text and keeps disabled', () => {
  const { next, update } = setup();
  fireEvent.change(next(), { target: { value: 'short' } });
  expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
  expect(update()).toBeDisabled();
});

test('mismatched confirm shows error and prevents save', () => {
  const { current, next, confirm, update } = setup();
  fireEvent.change(current(), { target: { value: 'oldpass123!' } });
  fireEvent.change(next(), { target: { value: 'newpass123!' } });
  fireEvent.change(confirm(), { target: { value: 'different' } });
  expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  expect(update()).toBeDisabled();
});

test('show passwords toggles input types', () => {
  const { current, next, confirm, show } = setup();
  // default is password type
  expect(current().type).toBe('password');
  expect(next().type).toBe('password');
  expect(confirm().type).toBe('password');
  // toggle on
  fireEvent.click(show());
  expect(current().type).toBe('text');
  expect(next().type).toBe('text');
  expect(confirm().type).toBe('text');
  // toggle off
  fireEvent.click(show());
  expect(current().type).toBe('password');
});

test('valid inputs enable save, call onSave with args, onClose, and reset fields', () => {
  const { current, next, confirm, update, onSave, onClose } = setup();
  fireEvent.change(current(), { target: { value: 'oldpass123!' } });
  fireEvent.change(next(), { target: { value: 'newpass123!' } });
  fireEvent.change(confirm(), { target: { value: 'newpass123!' } });
  expect(update()).toBeEnabled();
  fireEvent.click(update());
  expect(onSave).toHaveBeenCalledWith('oldpass123!', 'newpass123!');
  expect(onClose).toHaveBeenCalled();
  // fields reset after save
  expect(current().value).toBe('');
  expect(next().value).toBe('');
  expect(confirm().value).toBe('');
});

test('cancel always triggers onClose', () => {
  const { cancel, onClose } = setup();
  fireEvent.click(cancel());
  expect(onClose).toHaveBeenCalled();
});
