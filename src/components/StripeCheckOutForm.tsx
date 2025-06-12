"use client";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { useAuth } from '../app/context/authContext';
import Cookies from 'js-cookie';

export const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    cardHolder: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [userCookie, setUserCookie] = useState<any>(null);

  useEffect(() => {
    const userCookie = Cookies.get("auth_user");
    if (userCookie) {
      setUserCookie(userCookie);
    }
  }, [userCookie]);

  const isPaymentValid = formData.cardHolder.trim() !== '';

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      console.error('Card elements not found');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: formData.cardHolder,
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Create customer
      const customerResponse = await fetch('http://172.24.74.185:4000/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.cardHolder,
          email: user.email,
          payment_method_id: paymentMethod.id,
          profile_id: user.id
        }),
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to create customer');
      }

      const customerData = await customerResponse.json();

      if (customerData) {
        const customerObject = JSON.parse(customerData.customer);
        const customerId = customerObject.customer;

        // Process subscription
        const paymentResponse = await fetch('http://172.24.74.185:4000/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customerId,
            plan_id: "price_1QWXBTADdfkz5weOBz0VcbeW",
          }),
          credentials: 'include',
        });

        if (!paymentResponse.ok) {
          throw new Error('Payment processing failed');
        }
      }

      router.push('/');
    } catch (err: any) {
      console.error('Error processing payment:', err);
      setError(err.message || 'An error occurred while processing the payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#000',
        backgroundColor: '#f3f4f6',
        fontFamily: "'Inter', sans-serif",
        '::placeholder': {
          color: '#888',
        },
      },
      invalid: {
        color: '#e5424d',
      },
    },
  };

  return (
       <main className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 bg-dark-900">
      <div className="p-6 bg-dark rounded-lg shadow-md max-w-md mx-auto w-full">
        <header className="text-center mb-8">
          <h1 className="font-bold text-2xl mb-4 text-white">Step 3 of 3</h1>
          <h2 className="font-bold text-3xl mb-4 text-white">Choose a Plan</h2>
        </header>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Card Holder Name"
              value={formData.cardHolder}
              onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
              className="text-black bg-gray-100 rounded-lg"
              required
            />
          </div>

          <div className="p-3 bg-gray-100 rounded-lg">
            <CardNumberElement
              options={cardElementStyle}
              className="text-black placeholder-gray-400 bg-gray-100 rounded-lg"
            />
          </div> 

          <div className="bg-gray-100 p-3 rounded-lg mb-4">
            <CardExpiryElement
              options={cardElementStyle}
              className="text-black placeholder-gray-400 bg-gray-100 rounded-lg"
            />
          </div>

          <div className=" bg-gray-100 rounded-lg">
            <CardCvcElement
              options={cardElementStyle}
              className="bg-gray-100 text-black bg-gray-100 rounded-lg"
            />
          </div> 

          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-300 text-left">
              <p className="font-bold">R199/month</p>
              <p className="font-bold">Premium</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={!isPaymentValid || isProcessing || !stripe}
              className={`w-full bg-red-500 text-white px-4 py-2 hover:bg-red-600 rounded-md ${
                !isPaymentValid || isProcessing || !stripe ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? 'Processing...' : 'Confirm Payment'}
            </button>
            {error && <p className="text-red-500 mt-2" role="alert">{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
};

export default PaymentForm;
