import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StarIcon from '@/src/components/shared/StarIcon';

describe('StarIcon', () => {
  it('renders with default class', () => {
    const { container } = render(<StarIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('inline-block');
    expect(container.querySelectorAll('path')).toHaveLength(1);
  });

  it('applies custom className', () => {
    const { container } = render(<StarIcon className="w-6 h-6 text-red-500" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-6', 'h-6', 'text-red-500');
  });
});
