"use client";
import React, { useState } from "react";
import { useAuth } from "@/src/app/context/authContext";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";

interface InlineStripeFormProps {
  onSuccess: (label: string) => void;
}

export const InlineStripeForm: React.FC<InlineStripeFormProps> = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [cardHolder, setCardHolder] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const isValid = cardHolder.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !isValid || !user) return;

    const cardNumberElement = elements.getElement("cardNumber");
    const cardExpiryElement = elements.getElement("cardExpiry");
    const cardCvcElement = elements.getElement("cardCvc");
    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) return;

    setIsProcessing(true);
    setError("");

    try {
      const { paymentMethod, error: pmError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumberElement,
        billing_details: { name: cardHolder },
      });
      if (pmError || !paymentMethod) {
        setError(pmError?.message || "Failed to create payment method");
        setIsProcessing(false);
        return;
      }

      const customerResponse = await fetch('/api/billing/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cardHolder,
          email: user.email,
          payment_method_id: paymentMethod.id,
          profile_id: user.id,
        }),
      });
      if (!customerResponse.ok) throw new Error('Failed to create customer');

      const customerData = await customerResponse.json();
      const customerObject = JSON.parse(customerData.customer);
      const customerId = customerObject.customer;

      const paymentResponse = await fetch('/api/billing/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_id: customerId,
          plan_id: 'price_1QWXBTADdfkz5weOBz0VcbeW',
        }),
      });
      if (!paymentResponse.ok) throw new Error('Payment processing failed');

      const last4 = paymentMethod.card?.last4 || '****';
      onSuccess(`Visa ****-****-****-${last4}`);
    } catch (err) {
      setError('An error occurred while processing the payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-label="Update card details">
      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Cardholder Name</label>
        <input
          type="text"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Name as it appears on card"
          required
        />
      </div>

      <div>
        <label className="block text-gray-400 text-sm font-medium mb-2">Card Number</label>
        <CardNumberElement className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">Expiry Date</label>
          <CardExpiryElement className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" />
        </div>
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">CVV</label>
          <CardCvcElement className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white" />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={!isValid || isProcessing}
        className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
          isValid && !isProcessing ? 'bg-app-red text-white hover:bg-app-red/80' : 'bg-gray-600/40 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isProcessing ? 'Processing…' : 'Attach Card'}
      </button>
    </form>
  );
};

