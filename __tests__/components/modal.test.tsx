import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Adjust the import path if your alias differs
import Modal from '@/src/components/Modal';

describe('Modal', () => {
  it('returns null when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Hidden">
        <p>Should not render</p>
      </Modal>
    );

    // Nothing is rendered
    expect(container.firstChild).toBeNull();
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    expect(screen.queryByText('Should not render')).not.toBeInTheDocument();
  });

  it('renders when open and closes via close button and backdrop', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Modal isOpen onClose={onClose} title="My Modal">
        <div>Body content</div>
      </Modal>
    );

    // Title and children visible
    expect(screen.getByText('My Modal')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();

    // Click the header close button (the only button in the modal)
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Click the backdrop (has the backdrop-blur-sm class)
    const backdrop = container.querySelector('.backdrop-blur-sm') as HTMLElement;
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
