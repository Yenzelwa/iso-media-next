import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TermsConditionsPage from '@/src/app/(root)/terms-conditions/page';

describe('TermsConditionsPage', () => {
  beforeEach(() => {
    render(<TermsConditionsPage />);
  });

  it('renders the main Terms & Conditions heading and last updated text', () => {
    const heading = screen.getByRole('heading', { level: 1, name: /terms & conditions/i });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText(/last updated:\s*december 2024/i)).toBeInTheDocument();
  });

  it('shows the Important Notice block and copy', () => {
    expect(screen.getByRole('heading', { level: 3, name: /important notice/i })).toBeInTheDocument();
    expect(
      screen.getByText(/legally binding agreement between you and IsolaKwaMUNTU/i)
    ).toBeInTheDocument();
  });

  it('renders all section headings (h2) with expected titles', () => {
    const expectedSections = [
      'Acceptance of Terms',
      'Our Services',
      'User Responsibilities',
      'Subscription & Payment',
      'Prohibited Activities',
      'Limitation of Liability',
      'Questions & Support',
    ];

    // Ensure each h2 exists with exact text
    expectedSections.forEach(title => {
      expect(screen.getByRole('heading', { level: 2, name: new RegExp(`^${title}$`, 'i') }))
        .toBeInTheDocument();
    });

    // Ensure there are exactly 7 section h2s
    const allH2s = screen.getAllByRole('heading', { level: 2 });
    expect(allH2s).toHaveLength(expectedSections.length);
  });

  it('renders representative content within key sections', () => {
    // Acceptance of Terms content
    expect(
      screen.getByText(/agree to be bound by these Terms & Conditions and our Privacy Policy/i)
    ).toBeInTheDocument();

    // Our Services bullet items
    expect(screen.getByText(/streaming access to our curated library/i)).toBeInTheDocument();
    expect(screen.getByText(/personalized recommendations/i)).toBeInTheDocument();

    // User Responsibilities subsections
    expect(screen.getByText(/account security/i)).toBeInTheDocument();
    expect(screen.getByText(/acceptable use/i)).toBeInTheDocument();
    expect(screen.getByText(/maintain confidentiality of login credentials/i)).toBeInTheDocument();

    // Subscription & Payment subsections and copy
    expect(screen.getByText(/subscription plans/i)).toBeInTheDocument();
    expect(screen.getByText(/payment terms/i)).toBeInTheDocument();
    //expect(screen.getByText(/free trial period/i)).toBeInTheDocument();

    // Prohibited Activities lead-in
    expect(
      screen.getByText(/activities are strictly prohibited and may result in immediate account termination/i)
    ).toBeInTheDocument();

    // Limitation of Liability key sentence
    expect(
      screen.getByText(/services "as is" without warranties of any kind/i)
    ).toBeInTheDocument();

    // Questions & Support response time
    expect(
      screen.getByText(/we will respond to your inquiry within 48 hours during business days/i)
    ).toBeInTheDocument();
  });

  it('displays support and legal email addresses', () => {
    expect(screen.getByText(/support@isolakwamuntu\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/legal@isolakwamuntu\.com/i)).toBeInTheDocument();
  });

  it('does not render any form inputs (this page is static content)', () => {
    // No textboxes, comboboxes, or form fields should exist
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
