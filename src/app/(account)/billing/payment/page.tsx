"use client";
import Link from "next/link";
import React, { useState } from "react";
import {  Elements } from "@stripe/react-stripe-js";
import StripeCheckOutForm from "@/src/components/StripeCheckOutForm"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QDJ79ADdfkz5weORdIser8G3UP1ier1YHnbOsVrdyLJ5MVCvuFfWmoHKWmK2jYytjYXRfN80xakBPevmNqzxkBB00aMw7Iqjs");

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckOutForm />
    </Elements>
  );
};

export default PaymentPage;
