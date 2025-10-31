import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { SecurityPrivacy } from '@/src/app/(root)/profile/SecurityPrivacy';

expect.extend(toHaveNoViolations);

describe('Security & Privacy accessibility', () => {
  it('has no obvious axe violations', async () => {
    const { container } = render(<SecurityPrivacy />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

