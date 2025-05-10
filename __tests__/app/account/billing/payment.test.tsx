import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/src/app/context/authContext';
import StripeCheckOutForm from '@/src/components/StripeCheckOutForm';

// Mocks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/app/context/authContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('@stripe/react-stripe-js', () => {
  const original = jest.requireActual('@stripe/react-stripe-js');
  return {
    ...original,
    useStripe: jest.fn(),
    useElements: jest.fn(),
    CardNumberElement: (props: any) => <div data-testid="CardNumberElement" {...props} />,
    CardExpiryElement: (props: any) => <div data-testid="CardExpiryElement" {...props} />,
    CardCvcElement: (props: any) => <div data-testid="CardCvcElement" {...props} />,
  };
});

// Stripe promise for Elements wrapper
const stripePromise = loadStripe('pk_test_123');

describe('StripeCheckOutForm Component', () => {
  const mockPush = jest.fn();
  const mockUseAuth = useAuth as jest.Mock;
  const mockUseStripe = require('@stripe/react-stripe-js').useStripe;
  const mockUseElements = require('@stripe/react-stripe-js').useElements;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (Cookies.get as jest.Mock).mockReturnValue('mockUserProfile');

    mockUseStripe.mockReturnValue({
      createPaymentMethod: jest.fn().mockResolvedValue({ paymentMethod: { id: 'pm_test123' } }),
    });

  });

  it('redirects to login if user is not authenticated', () => {
    mockUseAuth.mockReturnValue({ user: null });

    render(
      <Elements stripe={stripePromise}>
        <StripeCheckOutForm />
      </Elements>
    );

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders the form when user is authenticated', () => {
    mockUseAuth.mockReturnValue({ user: { email: 'test@example.com', id: 'user123' } });

    render(
      <Elements stripe={stripePromise}>
        <StripeCheckOutForm />
      </Elements>
    );

    expect(screen.getByPlaceholderText('Card Holder Name')).toBeInTheDocument();
    expect(screen.getByTestId('CardNumberElement')).toBeInTheDocument();
    expect(screen.getByTestId('CardExpiryElement')).toBeInTheDocument();
    expect(screen.getByTestId('CardCvcElement')).toBeInTheDocument();
  });

  it('disables submit button when card holder name is empty', () => {
    mockUseAuth.mockReturnValue({ user: { email: 'test@example.com', id: 'user123' } });

    render(
      <Elements stripe={stripePromise}>
        <StripeCheckOutForm />
      </Elements>
    );

    const submitButton = screen.getByRole('button', { name: /confirm payment/i });
    expect(submitButton).toBeDisabled();
  });

it('submits payment info when form is valid', async () => {
  const createPaymentMethodMock = jest.fn().mockResolvedValue({
    paymentMethod: { id: 'pm_test123' },
    error: null,
  });

  const getElementMock = jest.fn().mockImplementation((type) => {
    // Return dummy elements for all required Stripe elements
    return {};
  });

  mockUseAuth.mockReturnValue({
    user: { email: 'test@example.com', id: 'user123' },
  });

  mockUseStripe.mockReturnValue({
    createPaymentMethod: createPaymentMethodMock,
  });

  mockUseElements.mockReturnValue({
    getElement: getElementMock,
  });

  global.fetch = jest.fn().mockImplementation((url) => {
    if (url.includes('/customer')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            customer: JSON.stringify({ customer: 'cus_test123' }),
          }),
      });
    }
    if (url.includes('/subscription')) {
      return Promise.resolve({ ok: true });
    }
    return Promise.reject(new Error('Unknown endpoint'));
  });

  render(
    <Elements stripe={stripePromise}>
      <StripeCheckOutForm />
    </Elements>
  );

  const input = screen.getByPlaceholderText('Card Holder Name');
  fireEvent.change(input, { target: { value: 'John Doe' } });

  const submitButton = screen.getByRole('button', { name: /confirm payment/i });

  await act(async () => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});

});
