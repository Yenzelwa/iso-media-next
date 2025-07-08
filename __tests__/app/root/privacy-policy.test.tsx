import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivacyPolicyPage from '@/src/app/(root)/privacy-policy/page';

describe('PrivacyPolicyPage', () => {
  beforeEach(() => {
    render(<PrivacyPolicyPage />);
  });

  it('renders the main page heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/privacy policy/i);
  });

  it('renders key policy sections', () => {
    const sections = [
      '1. Introduction',
      '2. What Information We Collect',
      '3. How We Use Your Information',
      '4. Sharing and Disclosure',
      '5. Your Rights',
      '6. Changes to This Policy',
      '7. Contact Us'
    ];

    sections.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });


  it('does not render any input fields', () => {
    const input = screen.queryByRole('textbox');
    expect(input).not.toBeInTheDocument();
  });
});
