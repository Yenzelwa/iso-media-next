import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { AuthProvider } from '@/src/app/context/authContext';
import Register from '@/src/app/(account)/register/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

expect.extend(toHaveNoViolations);

describe('Register page accessibility', () => {
  it('has no obvious axe violations', async () => {
    const { container } = render(
      <AuthProvider>
        <Register />
      </AuthProvider>
    );

    const results = await axe(container, {
      rules: {
        // We visually hide labels; this should remain compliant.
        // Keep default rules; do not disable label-related rules.
      },
    });
    expect(results).toHaveNoViolations();
  });
});
