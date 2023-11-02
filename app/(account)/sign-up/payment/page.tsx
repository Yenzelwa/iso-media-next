"use client";
import Link from "next/link";
import React, { useState } from "react";

const PaymentPage = () => {
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expirationDate: "",
    cvv: "",
  });

  const isPaymentValid = true; // Set your payment validation logic
  const error = ""; // Set your error message

  const updateMemberPlan = () => {
    // Implement your plan update logic here
  };

  return (
    <div className="p-6 bg-gray rounded-lg shadow-md max-w-md">
      <h1 className="font-bold text-2xl mb-4">Step 3 of 3</h1>
      <h2 className="font-bold text-3xl mb-4">Choose a Plan</h2>
      <div className="p-6">
        <form>
          <input
            type="text"
            placeholder="Card Number"
            value={billingInfo.cardNumber}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, cardNumber: e.target.value })
            }
            className="bg-gray-100 text-gray-800 placeholder-gray-400 p-3 rounded-lg mb-4 w-full"
          />
          <input
            type="text"
            placeholder="Card Holder Name"
            value={billingInfo.cardHolder}
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, cardHolder: e.target.value })
            }
            className="bg-gray-100 text-gray-800 placeholder-gray-400 p-3 rounded-lg mb-4 w-full"
          />
          <div className="flex">
            <input
              type="text"
              placeholder="Expiration Date (MM/YY)"
              value={billingInfo.expirationDate}
              onChange={(e) =>
                setBillingInfo({
                  ...billingInfo,
                  expirationDate: e.target.value,
                })
              }
              className="bg-gray-100 text-gray-800 placeholder-gray-400 p-3 rounded-lg mb-4 flex-1 mr-2"
            />
            <input
              type="text"
              placeholder="CVV"
              value={billingInfo.cvv}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, cvv: e.target.value })
              }
              className="bg-gray-100 text-gray-800 placeholder-gray-400 p-3 rounded-lg mb-4 flex-1"
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-600 text-left ">
            <p className="font-bold">R199/month</p>
    <p className="font-bold">Premium</p>
            </div>
            <Link href="/sign-up/pricing" className="btn btn-blue">
              Change
            </Link>
          </div>

          <div className="mt-6">
            <button
              disabled={!isPaymentValid}
              onClick={updateMemberPlan}
              className={`w-full bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md `}
            >
              Confirm Payment
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
