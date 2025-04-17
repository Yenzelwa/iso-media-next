'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import Cookies from "js-cookie";


declare global {
  interface Window {
    paypal?: any;
  }
}
const BillingPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
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

  interface PayPalCheckoutInstanceActions {
    subscription: {
      create: (options: { plan_id: string }) => any;
    };
  }

  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=sb&vault=true&intent=subscription";
      script.addEventListener("load", () => {
        initializePayPalButton();
      });
      document.body.appendChild(script);
    };
  
    const initializePayPalButton = () => {
      if (selectedPaymentMethod === "paypal") {
        window.paypal
          .Buttons({
            style: {
              shape: "rect",
              color: "gold",
              layout: "vertical",
              label: "subscribe"
            },
            createSubscription: function(actions: PayPalCheckoutInstanceActions) {
              return actions.subscription.create({
                plan_id: "P-0LM29224KR7996825MZV5OEA"
              });
            },
            onApprove: function(data: any, actions: PayPalCheckoutInstanceActions) {
              alert(actions.subscription); // Optional: Success message for the subscriber
            }
          })
          .render("#paypal-button-container-P-0LM29224KR7996825MZV5OEA"); // Render the PayPal button
      }
    };
  
    loadPayPalScript();
  }, [selectedPaymentMethod]);
  

  const handlePaymentMethodChange = (e: any) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleContinue = () => {
    if (selectedPaymentMethod === "creditCard") {
      // Navigate to /billing/payment
      window.location.href = "/billing/payment";
    }
  };

  return (
    <>
      <div className="p-6 bg-dark rounded-lg shadow-md max-w-md">
        <p className="text-gray">STEP 3 OF 3</p>
        <h1 className="text-2xl font-bold mb-4">Select payment option</h1>
        <h3 className="text-lg text-gray mb-6">
          All payment details are encrypted and can be changed. Cancel anytime
        </h3>
        <div>
          <div className="relative">
            <div className="border border-gray rounded-lg p-4">
              <p className="absolute top-0 left-0 mt-[-0.5rem] ml-4 text-sm font-medium text-gray">
                Pay with
              </p>
              <ul className="flex flex-col space-y-2">
                <li className="bg-white shadow-md p-2 rounded-lg">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    className="sr-only"
                    value="paypal"
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="paypal"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-10 h-10 flex justify-center items-center bg-gray rounded-lg">
                      <img
                        src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/paypal.svg"
                        alt="PayPal"
                        className="w-6 h-6"
                      />
                    </span>
                    <span className="text-base font-medium text-gray ml-2">
                      PayPal
                    </span>
                  </label>
                </li>
                <li className="bg-white shadow-md p-2 rounded-lg">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    className="sr-only"
                    value="creditCard"
                    onChange={handlePaymentMethodChange}
                  />
                  <label
                    htmlFor="creditCard"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="w-10 h-10 flex justify-center items-center bg-gray rounded-lg">
                      <img
                        src="https://checkoutshopper-live.adyen.com/checkoutshopper/images/logos/card.svg"
                        alt="Credit Card"
                        className="w-6 h-6"
                      />
                    </span>
                    <span className="text-base font-medium text-gray ml-2">
                      Credit or Debit Card
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-8">
          {selectedPaymentMethod === "creditCard" ? (
            <Link
              href="/billing/payment"
              className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
            >
              Continue
            </Link>
          ) : (
            <button
              onClick={handleContinue}
              className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BillingPage;
