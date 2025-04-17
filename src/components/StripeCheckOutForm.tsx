'use client'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuth } from '../app/context/authContext';
import Cookies from 'js-cookie';


const StripeCheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingInfo, setBillingInfo] = useState({
    cardHolder: '',
  });
  const [isProcessing, setIsProcessing] = useState(false); // For loading state
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { user} = useAuth(); 
      const [userCookie, setUserCookie] = useState<any>(null);
      useEffect(() => {
        const userCookie = Cookies.get("userProfile");
        if (userCookie) {
          setUserCookie(userCookie)
        }
      }, [userCookie]);
    
    
      if (!user) {
        // If no session is found, redirect to login
        router.push('/login');
      }

  const isPaymentValid = billingInfo.cardHolder.trim() !== ''; // Simple validation

  const updateMemberPlan = async () => {
    if (!stripe || !elements) return;
  
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
  
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      console.error('Card elements not found');
      return;
    }
  
    setIsProcessing(true);
    setError(''); // Reset any previous errors
  
    try {
      // Create a PaymentMethod with the individual elements
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement, // Using the CardNumberElement
        billing_details: {
          name: billingInfo.cardHolder,
        },
      });
  
      if (error) {
        console.error('Payment Method Error:', error.message);
        setError(error.message || 'An error occurred while processing the payment.');
        setIsProcessing(false); // Reset loading state in case of error
        return;
      }
      debugger;
    const email = user;
      // Send request to create customer on the backend
      const customerResponse = await fetch('http://172.24.74.185:4000/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: billingInfo.cardHolder,
          email: user.email,
          payment_method_id: paymentMethod.id,
          profile_id: user.id
        }),
      });
  
      if (!customerResponse.ok) {
        throw new Error('Failed to create customer');
      }
  debugger;
  const customerData = await customerResponse.json();

  if (customerData) {
    // Extract the customer ID
    
  debugger;
    const customerObject = JSON.parse(customerData.customer);

    // Extract the customer ID from the parsed object
    const customerId = customerObject.customer; // This will give you the value "cus_S6FTECPO0iJTpB"
  
  debugger;
    // Send request to process payment on the backend
    const paymentResponse = await fetch('http://172.24.74.185:4000/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customerId,  // Use the extracted customer ID here
        plan_id: "price_1QWXBTADdfkz5weOBz0VcbeW",
      }),
      credentials: 'include', // Equivalent to 'withCredentials: true'
    });
  
    if (!paymentResponse.ok) {
      throw new Error('Payment processing failed');
    }
  }
  
      console.log('Payment Method Created:', paymentMethod);
      // Redirect after payment method creation (replace with success page)
      router.push('/');
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('An error occurred while processing the payment.');
    } finally {
      setIsProcessing(false); // Reset loading state
    }
  };
  

  return (
    <div className="p-6 bg-dark rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="font-bold text-2xl mb-4 text-white">Step 3 of 3</h1>
      <h2 className="font-bold text-3xl mb-4 text-white">Choose a Plan</h2>

      <form onSubmit={(e) => { e.preventDefault(); updateMemberPlan(); }} className="space-y-4">
        {/* Cardholder Name Field */}
        <input
          type="text"
          placeholder="Card Holder Name"
          value={billingInfo.cardHolder}
          onChange={(e) =>
            setBillingInfo({ ...billingInfo, cardHolder: e.target.value })
          }
          className="text-black placeholder-gray-400 p-3 rounded-lg w-full"
          required
        />

        {/* Card Number Element */}
        <div className="p-3 rounded-lg mb-4">
          <CardNumberElement
            options={{
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
            }}
            className="text-black placeholder-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Card Expiry Element */}
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <CardExpiryElement
            options={{
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
            }}
            className="bg-gray-100 text-black placeholder-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Card CVC Element */}
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <CardCvcElement
            options={{
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
            }}
            className="bg-gray-100 text-black placeholder-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Plan Info */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-gray-600 text-left">
            <p className="font-bold">R199/month</p>
            <p className="font-bold">Premium</p>
          </div>
        </div>

        {/* Submit Button */}
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
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default StripeCheckOutForm;
