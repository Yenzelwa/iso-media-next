// __tests__/components/footer.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/src/components/Footer';

// Mock next/link to a plain anchor
jest.mock('next/link', () => ({ __esModule: true, default: ({ href, children, ...rest }: any) => <a href={href} {...rest}>{children}</a> }));

// Freeze year for deterministic assertion (optional)
const THIS_YEAR = new Date().getFullYear();

describe('Footer', () => {
  test('renders logo, resources, legal, social, and newsletter form', () => {
    render(<Footer />);

    // Logo / brand name
    expect(screen.getByText('IsolaKwaMUNTU')).toBeInTheDocument();

    // Resources links (4)
    const resourceLinks = ['About Us', 'Contact Us', 'FAQs', 'Blog'];
    resourceLinks.forEach((txt) => expect(screen.getByText(txt)).toBeInTheDocument());

    // Legal links (3)
    const legalLinks = ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy'];
    legalLinks.forEach((txt) => expect(screen.getByText(txt)).toBeInTheDocument());

    // Social icons (aria-labels)
    ;['Facebook', 'Twitter', 'Instagram', 'YouTube'].forEach((name) => {
      expect(screen.getByLabelText(name)).toBeInTheDocument();
    });

    // Newsletter form elements
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
    const subscribe = screen.getByRole('button', { name: /subscribe now/i });
    expect(subscribe).toBeInTheDocument();

    // Bottom section dynamic year
    expect(screen.getByText((t) => t.includes(`© ${THIS_YEAR} IsolaKwaMUNTU`))).toBeInTheDocument();

    // A couple of bottom links
    expect(screen.getByText('Sitemap')).toHaveAttribute('href', '/sitemap');
    expect(screen.getByText('Accessibility')).toHaveAttribute('href', '/accessibility');

    // Clicking social icons doesn't throw and has href
    fireEvent.click(screen.getByLabelText('Facebook'));
    expect((screen.getByLabelText('Facebook') as HTMLAnchorElement).getAttribute('href')).toBe('#');
  });
});
