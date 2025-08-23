// __tests__/components/edit-name-modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditNameModal from '@/src/components/EditNameModal';

// Mock Modal to respect isOpen
jest.mock('@/src/components//Modal', () => ({ __esModule: true, default: (props: any) => {
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

test('does not render when isOpen=false', () => {
  const { queryByTestId } = render(
    <EditNameModal isOpen={false} onClose={jest.fn()} currentName="John Doe" onSave={jest.fn()} />
  );
  expect(queryByTestId('modal')).not.toBeInTheDocument();
});

test('initializes with current name, allows change, save and cancel', () => {
  const onSave = jest.fn();
  const onClose = jest.fn();
  render(<EditNameModal isOpen={true} onClose={onClose} currentName="John Doe" onSave={onSave} />);

  const input = screen.getByPlaceholderText(/enter first name/i) as HTMLInputElement;
  expect(input.value).toBe('John Doe');

  fireEvent.change(input, { target: { value: 'Jane Smith' } });
  const save = screen.getByRole('button', { name: /save changes/i });
  fireEvent.click(save);
  expect(onSave).toHaveBeenCalledWith('Jane Smith');
  expect(onClose).toHaveBeenCalled();

  // Cancel path
  const cancel = screen.getByRole('button', { name: /cancel/i });
  fireEvent.click(cancel);
  expect(onClose).toHaveBeenCalledTimes(2);
});
