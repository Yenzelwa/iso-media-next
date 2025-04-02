"use client";
import React, { useState } from "react";

import Checkout from "@/src/components/checkout";


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
    <div id="checkout-page">
    <Checkout line_items={lineItems} mode={mode} />
  </div>
  );
};

export default PaymentPage;
