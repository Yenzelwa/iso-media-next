// __tests__/components/loader.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '@/src/components/Loader';

test('renders four animated bars with expected classes', () => {
  const { container } = render(<Loader />);
  const bars = [
    '.bg-lightred',
    '.bg-orange',
    '.bg-yellow',
    '.bg-green',
  ].map(sel => container.querySelector(sel));

  // All bars present
  bars.forEach((el) => expect(el).toBeTruthy());

  // Container has pulse animation
  const pulse = container.querySelector('.animate-pulse');
  expect(pulse).toBeTruthy();

  // Verify there are exactly 4 inner bars
  expect(container.querySelectorAll('[class*="animate-loader-bar"]').length).toBe(4);
});
