import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StripeCheckOutForm } from '@/src/components/StripeCheckOutForm';

// ---- Mocks ----

// next/link -> simple anchor
jest.mock('next/link', () => {
  return ({ href, children, ...props }: any) => (
    <a href={typeof href === 'string' ? href : '#'} {...props}>{children}</a>
  );
});

// Capture router.push calls
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock UserMenu to avoid unrelated rendering concerns
jest.mock('@/src/components/UserMenu', () => ({
  UserMenu: () => <div data-testid="user-menu" />,
}));

// Auth hook: we'll override return values per test
const useAuthMock = jest.fn();
jest.mock('@/src/app/context/authContext', () => ({
  useAuth: () => useAuthMock(),
}));

// Stripe Elements + hooks
const createPaymentMethodMock = jest.fn();
const elementsGetElementMock = jest.fn();

jest.mock('@stripe/react-stripe-js', () => ({
  // Components just render identifiable placeholders
  CardNumberElement: (props: any) => <div data-testid="card-number" {...props} />,
  CardExpiryElement: (props: any) => <div data-testid="card-expiry" {...props} />,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CardCvcElement: (props: any) => <div data-testid="card-cvc" {...props} />,
  // Hooks
  useStripe: () => ({ createPaymentMethod: createPaymentMethodMock }),
  useElements: () => ({ getElement: elementsGetElementMock }),
}));

// Helpers
const typeCardHolder = (value: string) => {
  const input = screen.getByLabelText(/card holder name/i) as HTMLInputElement;
  fireEvent.change(input, { target: { value } });
  return input;
};

const submit = () => {
  const btn = screen.getByRole('button', { name: /complete payment/i });
  fireEvent.click(btn);
  return btn;
};

describe('StripeCheckOutForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (global as any).fetch = jest.fn();
    // default: authenticated user
    useAuthMock.mockReturnValue({
      user: { id: 42, email: 'tester@example.com' },
    });
    // default: stripe elements present
    elementsGetElementMock.mockImplementation((which: string) => {
      if (which === 'cardNumber' || which === 'cardExpiry' || which === 'cardCvc') {
        return {}; // just a non-null sentinel
      }
      return null;
    });
  });

  it('redirects to /login if no user (auth guard effect)', async () => {
    useAuthMock.mockReturnValue({ user: null });

    render(<StripeCheckOutForm />);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/login');
    });
  });

  it('disables submit until card holder is provided; no-op if stripe/elements are not ready', async () => {
    // Override hooks to simulate null stripe/elements (early return)
    // We already mocked useStripe to return an object; simulate "not ready" by nulling both.
    jest.doMock('@stripe/react-stripe-js', () => ({
      CardNumberElement: (p: any) => <div data-testid="card-number" {...p} />,
      CardExpiryElement: (p: any) => <div data-testid="card-expiry" {...p} />,
      CardCvcElement: (p: any) => <div data-testid="card-cvc" {...p} />,
      useStripe: () => null,
      useElements: () => null,
    }));
    // Need to re-require component with this altered mock graph
    const { StripeCheckOutForm: Rewired } = await import('@/src/components/StripeCheckOutForm');

    render(<Rewired />);

    const btn = screen.getByRole('button', { name: /complete payment/i });
    expect(btn).toBeDisabled();

    typeCardHolder('Jane Cardholder');
    expect(btn).toBeEnabled();

    // No stripe/elements — handler returns immediately
    submit();

    expect(global.fetch).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('handles Stripe createPaymentMethod error and shows message', async () => {
    // restore default stripe/elements mock from top
    jest.isolateModules(() => {});
    createPaymentMethodMock.mockResolvedValue({
      error: { message: 'bad card' },
      paymentMethod: null,
    });

    render(<StripeCheckOutForm />);

    typeCardHolder('Jane Cardholder');
    submit();

    // Error should be displayed and we should not navigate
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/bad card/i);
    });
    expect(global.fetch).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('success flow: creates payment method, hits /customer and /subscription, then redirects home', async () => {
    createPaymentMethodMock.mockResolvedValue({
      error: null,
      paymentMethod: { id: 'pm_123' },
    });

    // Mock the two backend calls
    // 1) /customer returns a JSON with { customer: "<stringified payload>" }
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ customer: JSON.stringify({ customer: 'cus_123' }) }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

    render(<StripeCheckOutForm />);

    // Fill name and submit
    typeCardHolder('Jane Cardholder');
    const btn = submit();

    // Button becomes "Processing…" while in flight
    await waitFor(() => {
      // We can check either disabled state or the spinner copy
      expect(btn).toBeDisabled();
    });

    // Verify both backend calls and redirect
    await waitFor(() => {
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'http://172.24.74.185:4000/customer',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
      expect(global.fetch).toHaveBeenNthCalledWith(
        2,
        'http://172.24.74.185:4000/subscription',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        })
      );
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});
