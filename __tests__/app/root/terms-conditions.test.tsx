import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TermsConditionsPage from '@/src/app/(root)/terms-conditions/page';

describe('TermsConditionsPage', () => {
  beforeEach(() => {
    render(<TermsConditionsPage />);
  });

  it('renders the main Terms and Conditions heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/terms and conditions/i);
  });

  it('renders key terms section titles', () => {
    const sections = [
      '1. Agreement to Terms',
      '2. Intellectual Property',
      '3. User Responsibilities',
      '4. Subscription and Payments',
      '5. Termination',
      '6. Limitation of Liability',
      '7. Changes to Terms'
    ];

    sections.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });


  it('does not render any input elements', () => {
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});
