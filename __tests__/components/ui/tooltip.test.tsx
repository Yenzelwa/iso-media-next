import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock cn
jest.mock('@/src/app/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

// Mock Radix Tooltip primitives
jest.mock('@radix-ui/react-tooltip', () => {
  const React = require('react');
  return {
    Provider: ({ children }: any) => <div data-radix="t-provider">{children}</div>,
    Root: ({ children }: any) => <div data-radix="t-root">{children}</div>,
    Trigger: React.forwardRef((props: any, ref: any) => (
      <button ref={ref} data-radix="t-trigger" {...props} />
    )),
    Content: React.forwardRef((props: any, ref: any) => {
      const { sideOffset, ...rest } = props;
      return <div ref={ref} data-radix="t-content" data-sideoffset={sideOffset} {...rest} />;
    }),
  };
});

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/src/components/ui/tooltip';

describe('Tooltip components', () => {
  it('renders provider/root/trigger/content and passes classes + sideOffset default', () => {
    const { container } = render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Open</TooltipTrigger>
          <TooltipContent className="extra">Hello</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    const content = container.querySelector('[data-radix="t-content"]') as HTMLElement;
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('extra');
    // sideOffset default = 4 should be forwarded to mock as data-sideoffset
    expect(content.getAttribute('data-sideoffset')).toBe('4');
    expect(content.textContent).toBe('Hello');

    expect(container.querySelector('[data-radix="t-provider"]')).toBeInTheDocument();
    expect(container.querySelector('[data-radix="t-root"]')).toBeInTheDocument();
    expect(container.querySelector('[data-radix="t-trigger"]')).toBeInTheDocument();
  });
});
