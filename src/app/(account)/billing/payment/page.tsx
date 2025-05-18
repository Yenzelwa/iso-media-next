"use client";
import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckOutForm from "@/src/components/StripeCheckOutForm";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


const lineItems = [
  {
    price: 'price_1QWXBTADdfkz5weOBz0VcbeW', // Stripe Price ID
    quantity: 1,
  },
  // Add more line items as needed
];

const mode = 'subscription'; // Or 'subscription' depending on your needs


const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
    <StripeCheckOutForm />
  </Elements>
  );
};

export default PaymentPage;
