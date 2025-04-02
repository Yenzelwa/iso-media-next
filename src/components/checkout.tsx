'use client'

import React from 'react';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { fetchClientSecret } from '../app/actions/stripe'

interface LineItem {
  price: string;  // The Stripe Price ID
  quantity: number;
}

interface CheckoutProps {
  line_items: LineItem[];
  mode: 'payment' | 'subscription'; // Can be 'payment' for one-time payments or 'subscription'
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout({ line_items, mode }: CheckoutProps) {
  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret: () => fetchClientSecret(line_items, mode) }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
