import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock cn util
jest.mock('@/src/app/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock lucide-react X icon
jest.mock('lucide-react', () => ({
  X: (props: any) => <span data-icon="x" {...props} />,
}));

// Mock Radix Toast primitives -> simple passthroughs
jest.mock('@radix-ui/react-toast', () => {
  const React = require('react');
  return {
    Provider: ({ children }: any) => <div data-radix="provider">{children}</div>,
    Viewport: React.forwardRef((props: any, ref: any) => (
      <div ref={ref} data-radix="viewport" {...props} />
    )),
    Root: React.forwardRef((props: any, ref: any) => (
      <div ref={ref} data-radix="root" {...props} />
    )),
    Action: React.forwardRef((props: any, ref: any) => (
      <button ref={ref} data-radix="action" {...props} />
    )),
    Close: React.forwardRef((props: any, ref: any) => (
      <button ref={ref} data-radix="close" {...props} />
    )),
    Title: React.forwardRef((props: any, ref: any) => (
      <div ref={ref} data-radix="title" {...props} />
    )),
    Description: React.forwardRef((props: any, ref: any) => (
      <div ref={ref} data-radix="desc" {...props} />
    )),
  };
});

import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '@/src/components/ui/toast';

describe('Toast UI wrapper', () => {
  xit('renders provider & viewport with merged classes', () => {
    render(
      <ToastProvider>
        <ToastViewport className="extra" />
      </ToastProvider>
    );
    expect(screen.getByTestId('radix-provider')).not.toBeInTheDocument(); // ensure not auto-added
    const viewport = screen.getByRole('region', { hidden: true }) || screen.getByTestId?.(''); // fallback
    const el = screen.getByDataRadix
      ? screen.getByDataRadix('viewport')
      : document.querySelector('[data-radix="viewport"]')!;
    expect(el).toHaveClass('extra');
  });

  it('Toast variants and subcomponents behave', () => {
    const onAction = jest.fn();
    render(
      <ToastProvider>
        <ToastViewport />
        <Toast variant="destructive" className="custom">
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Desc</ToastDescription>
          <ToastAction onClick={onAction}>Do</ToastAction>
          <ToastClose aria-label="close" />
        </Toast>
      </ToastProvider>
    );

    // Title/Description appear
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();

    // Variant class is applied (we just look for "destructive" token)
    const root = document.querySelector('[data-radix="root"]')!;
    expect(root.className).toMatch(/destructive/);
    expect(root.className).toContain('custom');

    // Action callback
    fireEvent.click(screen.getByText('Do'));
    expect(onAction).toHaveBeenCalled();

    // Close present with icon
    const close = document.querySelector('[data-radix="close"]')!;
    expect(close).toBeInTheDocument();
    expect(close.querySelector('[data-icon="x"]')).toBeInTheDocument();
  });
});
