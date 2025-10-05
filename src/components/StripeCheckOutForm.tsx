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
  // if (isSuccess) {
  //   return (
  //     <div className="min-h-screen bg-black text-white">
  //       {/* Netflix-style Navigation */}
  //       <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent">
  //         <div className="max-w-7xl mx-auto px-4 lg:px-8">
  //           <div className="flex items-center justify-between h-16 lg:h-20">
  //             {/* Logo Section */}
  //             <div className="flex items-center space-x-4">
  //               <Link href="/" className="flex items-center space-x-3 group">
  //                 <div className="relative">
  //                   <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/50 border border-red-400/30">
  //                     <div className="w-6 h-6 bg-white rounded-lg transition-all duration-500 group-hover:rounded-full group-hover:scale-90 shadow-inner"></div>
  //                   </div>
  //                   <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse blur-sm"></div>
  //                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
  //                 </div>
  //                 <div className="hidden sm:block">
  //                   <span className="text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
  //                     IsolaKwaMUNTU
  //                   </span>
  //                   <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75">
  //                     Premium Streaming
  //                   </div>
  //                 </div>
  //               </Link>
  //             </div>

  //             {/* Success Indicator */}
  //             <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
  //               <div className="flex items-center space-x-1">
  //                 <CheckCircle className="w-4 h-4 text-green-400" />
  //                 <span className="text-green-400">Account</span>
  //               </div>
  //               <div className="w-8 h-px bg-gray-600"></div>
  //               <div className="flex items-center space-x-1">
  //                 <CheckCircle className="w-4 h-4 text-green-400" />
  //                 <span className="text-green-400">Plan Selected</span>
  //               </div>
  //               <div className="w-8 h-px bg-gray-600"></div>
  //               <div className="flex items-center space-x-1">
  //                 <CheckCircle className="w-4 h-4 text-green-400" />
  //                 <span className="text-green-400 font-semibold">Payment Complete</span>
  //               </div>
  //             </div>

  //             {/* User Section */}
  //             <div className="flex items-center space-x-4">
  //               { user ? (
  //                 <UserMenu />
  //               ) : (
  //                 <Link
  //                   href="/login"
  //                   className="group relative bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-gray-300 hover:text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 mr-2 xl:mr-3 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm shadow-lg hover:shadow-gray-500/20 transform hover:scale-105"
  //                 >
  //                   Sign In
  //                 </Link>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </nav>

  //       {/* Dynamic Background */}
  //       <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
  //         <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
  //         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center opacity-10"></div>
  //         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
  //         <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
  //         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
  //       </div>

  //       <div className="flex items-center justify-center min-h-screen pt-24 pb-12">
  //         <div className="relative z-10 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-gray-700/40 max-w-md w-full mx-4 text-center">
  //           <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ring-4 ring-green-500/20">
  //             <CheckCircle className="w-12 h-12 text-white" />
  //           </div>
  //           <h2 className="text-4xl font-bold mb-4 text-white">Welcome Aboard!</h2>
  //           <p className="text-gray-400 mb-8 text-lg">
  //             Your subscription is now active. Get ready for unlimited streaming!
  //           </p>
  //           <div className="flex items-center justify-center space-x-2 text-green-400 animate-pulse">
  //             <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
  //             <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
  //             <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
  //             <span className="ml-2">Redirecting to your profile...</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/50 border border-red-400/30">
                    <div className="w-6 h-6 bg-white rounded-lg transition-all duration-500 group-hover:rounded-full group-hover:scale-90 shadow-inner"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse blur-sm"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    IsolaKwaMUNTU
                  </span>
                  <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75">
                    Premium Streaming
                  </div>
                </div>
              </Link>
            </div>

            {/* Step Indicator */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Account</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Plan Selected</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-1 text-red-400 font-semibold">
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Payment</span>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              { user ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  className="group relative bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-gray-300 hover:text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 mr-2 xl:mr-3 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm shadow-lg hover:shadow-gray-500/20 transform hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <main className="min-h-[100dvh] relative flex items-center justify-center py-12 px-4 sm:px-6 z-10 pt-24">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/plan-selection"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Plans</span>
            </Link>
          </div>

          <div className="p-8 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-700/40 transform transition-all duration-500 hover:shadow-red-500/20">
            {/* Header */}
            <header className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full mb-6 backdrop-blur-sm border border-green-500/20">
                <Lock className="w-10 h-10 text-green-400" />
              </div>

              <h1 className="font-bold text-4xl mb-4 text-white">Secure Payment</h1>
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
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl hover:shadow-green-500/50'
                }`}
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
                    <div className="absolute inset-0 rounded-2xl border-2 border-green-400/30 group-hover:border-green-300/50 transition-colors duration-300"></div>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
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
      </main>
    </div>
  );
};
