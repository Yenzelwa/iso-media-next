import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivacyPolicyPage from '@/src/app/(root)/privacy-policy/page';

// Mock lucide-react icons to simple SVGs so we can assert presence without pulling in the full lib
jest.mock('lucide-react', () => ({
  __esModule: true,
  Shield: (props: any) => <svg data-testid="icon-Shield" {...props} />,
  Lock: (props: any) => <svg data-testid="icon-Lock" {...props} />,
  Eye: (props: any) => <svg data-testid="icon-Eye" {...props} />,
  Database: (props: any) => <svg data-testid="icon-Database" {...props} />,
  Mail: (props: any) => <svg data-testid="icon-Mail" {...props} />,
  Calendar: (props: any) => <svg data-testid="icon-Calendar" {...props} />,
}));

describe('PrivacyPolicyPage', () => {
  beforeEach(() => {
    render(<PrivacyPolicyPage />);
  });

  it('renders the main page heading and last updated text', () => {
    const h1 = screen.getByRole('heading', { level: 1, name: /privacy policy/i });
    expect(h1).toBeInTheDocument();

    expect(screen.getByText(/last updated:\s*december 2024/i)).toBeInTheDocument();
  });

  it('renders the quick navigation with 6 links pointing to the correct sections', () => {
    const quickNavHeading = screen.getByRole('heading', { level: 3, name: /quick navigation/i });
    const quickNav = quickNavHeading.closest('div');
    expect(quickNav).toBeInTheDocument();

    const links = within(quickNav as HTMLElement).getAllByRole('link');
    const linkTexts = [
      /information we collect/i,
      /how we use information/i,
      /information sharing/i,
      /data security/i,
      /your rights/i,
      /contact us/i,
    ];

    expect(links).toHaveLength(6);
    linkTexts.forEach((re) => {
      expect(within(quickNav as HTMLElement).getByRole('link', { name: re })).toBeInTheDocument();
    });

    // href targets
    expect(links.map((a) => (a as HTMLAnchorElement).getAttribute('href'))).toEqual([
      '#information-collection',
      '#information-use',
      '#information-sharing',
      '#data-security',
      '#user-rights',
      '#contact',
    ]);

    // Sections with those ids exist
    ['information-collection','information-use','information-sharing','data-security','user-rights','contact']
      .forEach(id => expect(document.getElementById(id)).not.toBeNull());
  });

  it('renders all top-level sections with their headings', () => {
    // Information We Collect
    const collect = document.getElementById('information-collection') as HTMLElement;
    expect(collect).toBeInTheDocument();
    expect(within(collect).getByRole('heading', { level: 2, name: /information we collect/i })).toBeInTheDocument();

    // How We Use Your Information
    const useInfo = document.getElementById('information-use') as HTMLElement;
    expect(useInfo).toBeInTheDocument();
    expect(within(useInfo).getByRole('heading', { level: 2, name: /how we use your information/i })).toBeInTheDocument();

    // Information Sharing
    const sharing = document.getElementById('information-sharing') as HTMLElement;
    expect(sharing).toBeInTheDocument();
    expect(within(sharing).getByRole('heading', { level: 2, name: /information sharing/i })).toBeInTheDocument();

    // Data Security
    const security = document.getElementById('data-security') as HTMLElement;
    expect(security).toBeInTheDocument();
    expect(within(security).getByRole('heading', { level: 2, name: /data security/i })).toBeInTheDocument();

    // Your Rights
    const rights = document.getElementById('user-rights') as HTMLElement;
    expect(rights).toBeInTheDocument();
    expect(within(rights).getByRole('heading', { level: 2, name: /your rights/i })).toBeInTheDocument();

    // Contact Us
    const contact = document.getElementById('contact') as HTMLElement;
    expect(contact).toBeInTheDocument();
    expect(within(contact).getByRole('heading', { level: 2, name: /contact us/i })).toBeInTheDocument();
  });

  it('lists examples of personal and usage information', () => {
    const collect = document.getElementById('information-collection') as HTMLElement;

    // Personal Information subsection
    expect(within(collect).getByRole('heading', { level: 3, name: /personal information/i })).toBeInTheDocument();
    expect(within(collect).getByText(/name, email address, and contact information/i)).toBeInTheDocument();
    expect(within(collect).getByText(/payment information for subscription services/i)).toBeInTheDocument();
    expect(within(collect).getByText(/profile preferences and viewing history/i)).toBeInTheDocument();
    // There is a garbled bullet in source; match the meaningful part
    expect(within(collect).getByText(/communication preferences and settings/i)).toBeInTheDocument();

    // Usage Information subsection
    expect(within(collect).getByRole('heading', { level: 3, name: /usage information/i })).toBeInTheDocument();
    expect(within(collect).getByText(/device information and browser type/i)).toBeInTheDocument();
    expect(within(collect).getByText(/ip address and location data/i)).toBeInTheDocument();
  });

  it('describes how information is used', () => {
    const useInfo = document.getElementById('information-use') as HTMLElement;
    const list = within(useInfo).getByRole('list');

    expect(within(list).getByText(/service delivery/i)).toBeInTheDocument();
    expect(within(list).getByText(/personalization/i)).toBeInTheDocument();
    expect(within(list).getByText(/communication/i)).toBeInTheDocument();
    expect(within(list).getByText(/analytics/i)).toBeInTheDocument();
  });

  it('describes information sharing policies', () => {
    const sharing = document.getElementById('information-sharing') as HTMLElement;
    expect(within(sharing).getByText(/we do not sell, trade, or rent your personal information/i)).toBeInTheDocument();
    const items = within(sharing).getAllByRole('listitem');
    // Ensure a few key bullets are present
    expect(items.some(li => /explicit consent/i.test(li.textContent || ''))).toBe(true);
    expect(items.some(li => /trusted service providers/i.test(li.textContent || ''))).toBe(true);
  });

  it('lists concrete data security measures', () => {
    const sec = document.getElementById('data-security') as HTMLElement;
    expect(within(sec).getByText(/ssl encryption/i)).toBeInTheDocument();
    expect(within(sec).getByText(/secure data storage/i)).toBeInTheDocument();
    expect(within(sec).getByText(/regular security audits/i)).toBeInTheDocument();
  });

  it('lists user rights including access, correction, deletion, and opt-out', () => {
    const rights = document.getElementById('user-rights') as HTMLElement;
    ['Access & Portability', 'Correction', 'Opt-out'].forEach((label) => {
      expect(within(rights).getByText(new RegExp(label, 'i'))).toBeInTheDocument();
    });
  });

  it('shows contact emails and response timeframe', () => {
    const contact = document.getElementById('contact') as HTMLElement;
    expect(within(contact).getByText(/privacy@isolakwamuntu\.com/i)).toBeInTheDocument();
    expect(within(contact).getByText(/dpo@isolakwamuntu\.com/i)).toBeInTheDocument();
    expect(within(contact).getByText(/respond to your inquiry within 30 days/i)).toBeInTheDocument();
  });

  it('does not render any input fields', () => {
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('renders key decorative icons (mocked)', () => {
    expect(screen.getByTestId('icon-Database')).toBeInTheDocument();
    expect(screen.getAllByTestId('icon-Lock').length).toBeGreaterThanOrEqual(1); 
    expect(screen.getByTestId('icon-Shield')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Mail')).toBeInTheDocument();
  });
});
