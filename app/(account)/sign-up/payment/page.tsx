'use client'
import React, { useState } from 'react';

const PaymentPage = () => {
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });

  const isPaymentValid = true; // Set your payment validation logic
  const error = ''; // Set your error message

  const updateMemberPlan = () => {
    // Implement your plan update logic here
  };

  return (
    <div className=" px-40 rounded-lg shadow-lg text-center">
        <h1 className="font-bold text-2xl mb-4">3 of 3 steps</h1>
        <h2 className="font-bold text-3xl">Choose a plan</h2>
         <div className="bg-red-600 p-8 rounded-lg shadow-lg text-center">
         
          <form>
            <input
              type="text"
              placeholder="Card Number"
              value={billingInfo.cardNumber}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, cardNumber: e.target.value })
              }
              className="bg-gray-800 text-white placeholder-gray p-2 rounded-lg mb-4"
            />
            <input
              type="text"
              placeholder="Card Holder Name"
              value={billingInfo.cardHolder}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, cardHolder: e.target.value })
              }
              className="bg-gray-800 text-white placeholder-gray p-2 rounded-lg mb-4"
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
                className="bg-gray-800 text-white placeholder-gray p-2 rounded-lg mb-4 flex-1 mr-2"
              />
              <input
                type="text"
                placeholder="CVV"
                value={billingInfo.cvv}
                onChange={(e) =>
                  setBillingInfo({ ...billingInfo, cvv: e.target.value })
                }
                className="bg-gray-800 text-white placeholder-gray p-2 rounded-lg mb-4 flex-1"
              />
            </div>
            <div className="mt-4">
              <button
                disabled={!isPaymentValid}
                onClick={updateMemberPlan}
                className={`w-2/5 btn bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md mx-auto`}
              >
                Confirm Payment
              </button>
              <p className="error-msg mt-2">{error}</p>
            </div>
          </form>
        </div>
      </div>
  );
};

export default PaymentPage;
