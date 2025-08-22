import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';

import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/src/app/context/authContext';
import PaymentPage from '@/src/app/(account)/payment/page';
import { useElements, useStripe } from '@stripe/react-stripe-js';

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
  const mockUseStripe = useStripe as jest.Mock;
  const mockUseElements = useElements as jest.Mock;

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
      <PaymentPage/>
    );

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders the form when user is authenticated', () => {
    mockUseAuth.mockReturnValue({ user: { email: 'test@example.com', id: 'user123' , name: 'Joe Doe' } });

    render(
      <PaymentPage/>
    );

   expect(screen.getByText('Card Holder Name')).toBeInTheDocument();
    expect(screen.getByText('Card Number')).toBeInTheDocument();
    expect(screen.getByText('Expiry Date')).toBeInTheDocument();
    expect(screen.getByText('CVV')).toBeInTheDocument();
  });

  it('disables submit button when card holder name is empty', () => {
    mockUseAuth.mockReturnValue({ user: { email: 'test@example.com', id: 'user123' } });

    render(
      <PaymentPage/>
    );

    const submitButton = screen.getByRole('button', { name: /complete payment/i });
    expect(submitButton).toBeDisabled();
  });

it('submits payment info when form is valid', async () => {
    const mockCreatePaymentMethod = jest.fn().mockResolvedValue({
      paymentMethod: { id: 'pm_test123' },
      error: null,
    });

    const mockCardNumberElement = {};
    const mockCardExpiryElement = {};
    const mockCardCvcElement = {};

    mockUseStripe.mockReturnValue({
      createPaymentMethod: mockCreatePaymentMethod,
    });

    mockUseElements.mockReturnValue({
      getElement: (type: string) => {
        if (type === 'cardNumber') return mockCardNumberElement;
        if (type === 'cardExpiry') return mockCardExpiryElement;
        if (type === 'cardCvc') return mockCardCvcElement;
        return null;
      },
    });

    mockUseAuth.mockReturnValue({
      user: {
        email: 'test@example.com',
        id: 'user123',
        name: 'Joe Doe',
      },
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

    render(<PaymentPage />);

    // Fill in card holder input
    fireEvent.change(screen.getByLabelText(/card holder name/i), {
      target: { value: 'John Doe' },
    });

    const submitButton = screen.getByRole('button', { name: /complete payment/i });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockCreatePaymentMethod).toHaveBeenCalled();
     expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

});
