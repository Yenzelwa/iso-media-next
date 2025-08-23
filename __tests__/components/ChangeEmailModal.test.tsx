// __tests__/components/change-email-modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangeEmailModal from '@/src/components/ChangeEmailModal';

// Minimal Modal mock that respects isOpen and exposes onClose
jest.mock('@/src/components/Modal', () => ({ __esModule: true, default: (props: any) => {
  const { isOpen, onClose, title, children } = props;
  if (!isOpen) return null;
  return (
    <div data-testid="modal-root">
      <h2>{title}</h2>
      {/* emulate a close control present in many modals */}
      <button aria-label="close" onClick={onClose}>×</button>
      {children}
    </div>
  );
}}));

const baseProps = {
  isOpen: true,
  currentEmail: 'old@example.com',
  onClose: jest.fn(),
  onSave: jest.fn(),
};

const setup = (override: Partial<typeof baseProps> = {}) => {
  const onClose = jest.fn();
  const onSave = jest.fn();
  const props = { ...baseProps, onClose, onSave, ...override };
  const utils = render(<ChangeEmailModal {...props} />);
  const getNew = () => screen.getByPlaceholderText(/enter new email address/i) as HTMLInputElement;
  const getConfirm = () => screen.getByPlaceholderText(/confirm new email address/i) as HTMLInputElement;
  const btnCancel = () => screen.getByRole('button', { name: /cancel/i });
  const btnSave = () => screen.getByRole('button', { name: /send verification/i });
  return { utils, props, onClose, onSave, getNew, getConfirm, btnCancel, btnSave };
};

// --- Tests ---

test('does not render when isOpen=false', () => {
  const { queryByTestId } = render(
    <ChangeEmailModal {...baseProps} isOpen={false} />
  );
  expect(queryByTestId('modal-root')).not.toBeInTheDocument();
});

test('initializes email with currentEmail and disables save', () => {
  const { getNew, btnSave } = setup();
  expect(getNew().value).toBe('old@example.com');
  expect(btnSave()).toBeDisabled();
});

test('shows mismatch helper text and keeps save disabled when emails differ', () => {
  const { getNew, getConfirm, btnSave } = setup();
  fireEvent.change(getNew(), { target: { value: 'new@example.com' } });
  fireEvent.change(getConfirm(), { target: { value: 'nope@example.com' } });
  expect(screen.getByText(/emails do not match/i)).toBeInTheDocument();
  expect(btnSave()).toBeDisabled();
});

test('same-as-current keeps button disabled and does not call onSave', () => {
  const { getNew, getConfirm, btnSave, onSave } = setup();
  fireEvent.change(getNew(), { target: { value: 'old@example.com' } });
  fireEvent.change(getConfirm(), { target: { value: 'old@example.com' } });
  expect(btnSave()).toBeDisabled();
  fireEvent.click(btnSave());
  expect(onSave).not.toHaveBeenCalled();
});

test('valid matching new email enables button and calls onSave + onClose', () => {
  const { getNew, getConfirm, btnSave, onSave, onClose } = setup();
  fireEvent.change(getNew(), { target: { value: 'new@example.com' } });
  fireEvent.change(getConfirm(), { target: { value: 'new@example.com' } });
  expect(btnSave()).toBeEnabled();
  fireEvent.click(btnSave());
  expect(onSave).toHaveBeenCalledWith('new@example.com');
  expect(onClose).toHaveBeenCalled();
});

test('Cancel button invokes onClose regardless of form validity', () => {
  const { btnCancel, onClose, getNew } = setup();
  fireEvent.change(getNew(), { target: { value: 'partial@example.com' } });
  fireEvent.click(btnCancel());
  expect(onClose).toHaveBeenCalled();
});
