import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ContactUsPage from '@/src/app/(root)/contact-us/page';

describe('ContactUsPage', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('displays the Contact Us page heading', () => {
    render(<ContactUsPage />);
    const heading = screen.getByRole('heading', { level: 1, name: /contact us/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders labels/inputs and marks them as required', () => {
    render(<ContactUsPage />);

    const nameInput = screen.getByLabelText(/full name \*/i);
    const emailInput = screen.getByLabelText(/email address \*/i);
    const subjectSelect = screen.getByRole('combobox', { name: /subject \*/i });
    const messageTextarea = screen.getByLabelText(/message \*/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(subjectSelect).toBeRequired();
    expect(messageTextarea).toBeRequired();

    // Key copy present
    expect(screen.getByText(/please email support@isolakwamuntu\.com directly for faster response/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows typing/selecting and submits with the correct payload', async () => {
    const user = userEvent.setup();
    render(<ContactUsPage />);

    const nameInput = screen.getByLabelText(/full name \*/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address \*/i) as HTMLInputElement;
    const subjectSelect = screen.getByRole('combobox', { name: /subject \*/i }) as HTMLSelectElement;
    const messageTextarea = screen.getByLabelText(/message \*/i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await user.type(nameInput, 'Ada Lovelace');
    await user.type(emailInput, 'ada@example.com');
    await user.selectOptions(subjectSelect, 'technical');
    await user.type(messageTextarea, 'Having trouble with streaming.');

    expect(nameInput.value).toBe('Ada Lovelace');
    expect(emailInput.value).toBe('ada@example.com');
    expect((subjectSelect as HTMLSelectElement).value).toBe('technical');
    expect(messageTextarea.value).toBe('Having trouble with streaming.');

    // Submit
    await user.click(submitButton);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'technical',
      message: 'Having trouble with streaming.',
    });
  });

  it('displays contact info blocks and their details', () => {
    render(<ContactUsPage />);

    // Email Us
    expect(screen.getByText(/email us/i)).toBeInTheDocument();
    expect(screen.getByText(/general inquiries and support/i)).toBeInTheDocument();
    const helloLink = screen.getByRole('link', { name: /hello@isolakwamuntu\.com/i });
    expect(helloLink).toHaveAttribute('href', 'mailto:hello@isolakwamuntu.com');

    // Technical Support
    expect(screen.getByText(/technical support details/i)).toBeInTheDocument();
    expect(screen.getByText(/platform and streaming issues/i)).toBeInTheDocument();
    const supportLink = screen.getByRole('link', { name: /support@isolakwamuntu\.com/i });
    expect(supportLink).toHaveAttribute('href', 'mailto:support@isolakwamuntu.com');

    // Business Inquiries
    expect(screen.getByText(/business inquiries/i)).toBeInTheDocument();
    expect(screen.getByText(/partnerships and collaborations/i)).toBeInTheDocument();
    const partnershipsLink = screen.getByRole('link', { name: /partnerships@isolakwamuntu\.com/i });
    expect(partnershipsLink).toHaveAttribute('href', 'mailto:partnerships@isolakwamuntu.com');

    // Response time
    expect(screen.getByText(/we typically respond within 24 hours/i)).toBeInTheDocument();
    expect(screen.getByText(/business hours: 9 am - 6 pm est/i)).toBeInTheDocument();
  });

  it('renders social section and links', () => {
    render(<ContactUsPage />);
    expect(screen.getByText(/follow our journey/i)).toBeInTheDocument();

    // There are 3 "#" links in the social block
    const socialLinks = screen.getAllByRole('link', { name: '' }).filter(a => a.getAttribute('href') === '#');
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('renders FAQ CTA with correct link', () => {
    render(<ContactUsPage />);
    const faqCta = screen.getByRole('link', { name: /view faqs/i });
    expect(faqCta).toHaveAttribute('href', '/faqs');
  });

  it('prevents default form submission navigation (no page reload)', () => {
    render(<ContactUsPage />);
    const button = screen.getByRole('button', { name: /send message/i });

    // Intercept the form submit event to assert preventDefault gets called
    const form = button.closest('form')!;
    const preventDefault = jest.fn();
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    Object.defineProperty(submitEvent, 'preventDefault', { value: preventDefault });

    form.dispatchEvent(submitEvent);
    expect(preventDefault).toHaveBeenCalled();
  });
});
