"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from "../app/context/authContext";
import { useRouter } from "next/navigation";
import { UserMenu } from "./UserMenu";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { trackEvent, trackError } from "@/src/lib/obs";

export const StripeCheckOutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingInfo, setBillingInfo] = useState({
    cardHolder: '',
  });
  const [isProcessing, setIsProcessing] = useState(false); // For loading state
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { user} = useAuth(); 
    
              useEffect(() => {
          if (typeof window !== "undefined" && !user) {
            router.push("/login");
          }
        }, [user, router]);

  const isPaymentValid = billingInfo.cardHolder.trim() !== ''; // Simple validation

  const handlePayment = async () => {
    if (!stripe || !elements) return;
  
    const cardNumberElement = elements.getElement('cardNumber');
    const cardExpiryElement = elements.getElement('cardExpiry');
    const cardCvcElement = elements.getElement('cardCvc');
  
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      console.error('Card elements not found');
      return;
    }
  
    setIsProcessing(true);
    setError(''); // Reset any previous errors
    trackEvent('payment.submit.start', { has_name: !!billingInfo.cardHolder });
  
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
        trackError('payment.submit.failure', { stage: 'createPaymentMethod', message: error.message || 'unknown' });
        setIsProcessing(false); // Reset loading state in case of error
        return;
      }
      // Send request to create customer on the backend
      const customerResponse = await fetch('/api/billing/customers', {
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
        trackError('payment.submit.failure', { stage: 'createCustomer', status: customerResponse.status });
        throw new Error('Failed to create customer');
      }

  const customerData = await customerResponse.json();

  if (customerData) {
    // Extract the customer ID
    const customerObject = JSON.parse(customerData.customer);

    // Extract the customer ID from the parsed object
    const customerId = customerObject.customer; // This will give you the value "cus_S6FTECPO0iJTpB"
  
    // Send request to process payment on the backend
    const paymentResponse = await fetch('/api/billing/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_id: customerId,  // Use the extracted customer ID here
        plan_id: "price_1QWXBTADdfkz5weOBz0VcbeW",
      }),
    });
  
    if (!paymentResponse.ok) {
      trackError('payment.submit.failure', { stage: 'createSubscription', status: paymentResponse.status });
      throw new Error('Payment processing failed');
    }
  }
  
      // Redirect after payment method creation (replace with success page)
      trackEvent('payment.submit.success', { next: 'home' });
      router.push('/');
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('An error occurred while processing the payment.');
      trackError('payment.submit.failure', { stage: 'unknown' });
    } finally {
      setIsProcessing(false); // Reset loading state
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 py-10">
          {/* Back Button */}
          <div className="mb-4">
            <Link
              href="/plan-selection"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Plans</span>
            </Link>
          </div>

          <div className="p-8 bg-transparent backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-30px_rgba(0,0,0,0.55)] border border-white/10 transform transition-all duration-500 hover:border-red-500/30 hover:shadow-red-500/20">
            <div className="h-1 w-20 bg-gradient-to-r from-red-500/60 to-red-600/60 rounded-full mx-auto mb-6" />
            {/* Header */}
            <header className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full mb-6 backdrop-blur-sm border border-green-500/20">
                <Lock className="w-10 h-10 text-green-400" />
              </div>

              <h2 className="font-bold text-xl mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Complete Your Subscription</h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">256-bit SSL encrypted</span>
              </div>
            </header>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Card Holder Name */}
            <div>
              <label htmlFor="cardHolder" className="block text-gray-300 text-sm font-medium mb-2">
                Card Holder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                placeholder="Enter name as it appears on card"
                className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                required
            value={billingInfo.cardHolder}
          onChange={(e) => setBillingInfo({ cardHolder: e.target.value })}
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Card Number 
              </label>
              <div className="relative">
                <CardNumberElement
                  className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 pr-12"
              
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Expiry Date */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <CardExpiryElement
                  className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                 
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  CVV
                </label>
                <CardCvcElement
                  className="w-full px-4 py-3 bg-gray-100 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Plan Summary (moved to Plan Selection link) */}
            <Link
              href="/plan-selection"
              aria-label="View or change plan on Plan Selection"
              className="mt-6 block p-4 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-semibold text-white">View plan and pricing</p>
                  <p className="text-xs text-gray-400">Go to Plan Selection to review details</p>
                </div>
                <div className="text-right text-red-400 font-semibold">Change</div>
              </div>
            </Link>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={!isPaymentValid || isProcessing}
                className={`group relative w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
                  !isPaymentValid || isProcessing
                    ? 'bg-gray-600 cursor-not-allowed'
                    : ' '}
                ${!(!isPaymentValid || isProcessing) ? 'bg-gradient-to-b from-red-600/35 via-red-600/25 to-red-700/30 hover:from-red-600/45 hover:via-red-600/35 hover:to-red-700/40 border border-red-500/35 backdrop-blur-md shadow-[0_10px_24px_-12px_rgba(239,68,68,0.45)] hover:shadow-[0_14px_32px_-10px_rgba(239,68,68,0.55)]' : ''}`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Complete Payment</span>
                  </>
                )}

                {!(!isPaymentValid || isProcessing) && (
                  <>
                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-colors duration-300"></div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                  </>
                )}
              </button>
              {error && <p className="text-red-500 mt-4 text-sm text-center" role="alert">{error}</p>}
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Your payment information is encrypted and secure. Cancel anytime.
              </p>
            </div>
          </form>
          </div>
    </div>
  );
};
