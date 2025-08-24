import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock theme
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark' }),
}));

// Mock "sonner" Toaster
const sonnerSpy = jest.fn();
jest.mock('sonner', () => ({
  Toaster: (props: any) => {
    sonnerSpy(props);
    return <div data-testid="sonner" data-theme={props.theme} data-class={props.className} />;
  },
}));

import { Toaster } from '@/src/components/ui/sooner';

describe('Toaster wrapper (sooner)', () => {
  it('passes theme from next-themes and forwards props', () => {
    render(<Toaster position="top-right" visibleToasts={3} />);
    const el = screen.getByTestId('sonner');
    expect(el).toHaveAttribute('data-theme', 'dark');

    // ensure props reached the mocked Sonner
    expect(sonnerSpy).toHaveBeenCalled();
    const calledProps = sonnerSpy.mock.calls[0][0];
    expect(calledProps.position).toBe('top-right');
    expect(calledProps.visibleToasts).toBe(3);

    // class with "toaster group" is forwarded
    expect(el).toHaveAttribute('data-class');
    expect(el.getAttribute('data-class')).toContain('toaster group');
  });

  it('falls back to "system" when theme hook returns no value', async () => {
    jest.resetModules();
    jest.doMock('next-themes', () => ({ useTheme: () => ({}) }));
    const { Toaster: LocalToaster } = await import('@/src/components/ui/sooner');
    render(<LocalToaster />);
    const el = screen.getByTestId('sonner');
    expect(el).toHaveAttribute('data-theme', 'system');
  });
});
