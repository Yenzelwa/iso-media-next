import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useState } from "react";

const StripeCheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [billingInfo, setBillingInfo] = useState({
      cardHolder: "",
    });
  
    const isPaymentValid = true; // Set your payment validation logic
    const error = ""; // Set your error message
  
    const updateMemberPlan = async () => {
      if (!stripe || !elements) return;
      
      const cardElement = elements.getElement(CardElement);
  
    if (!cardElement) {
      console.error("CardElement not found");
      return;
    }
  
      try {
  
        const {paymentMethod, error} = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: 'Jenny Rosen',
          },
        });
  console.log(paymentMethod, "Pyame")
  
        if (error) {
          console.error("Payment Method Error:", error.message);
        } else {
          console.log("Payment Method Created:", paymentMethod);
          // Implement your plan update logic with paymentMethod.id here
        }
      } catch (err) {
        console.error("Error processing payment:", err);
      }
    };
  
    return (
      <div className="p-6 bg-dark rounded-lg shadow-md max-w-md">
        <h1 className="font-bold text-2xl mb-4">Step 3 of 3</h1>
        <h2 className="font-bold text-3xl mb-4">Choose a Plan</h2>
        <div className="p-6">
          <form onSubmit={(e) => { e.preventDefault(); updateMemberPlan(); }}>
            <input
              type="text"
              placeholder="Card Holder Name"
              value={billingInfo.cardHolder}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, cardHolder: e.target.value })
              }
              className="bg-gray-100 text-black placeholder-gray-400 p-3 rounded-lg mb-4 w-full"
              required
            />
            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <CardElement
             options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#000",
                    backgroundColor: "#f3f4f6", // Light gray background to match other fields
                    fontFamily: "'Inter', sans-serif",
                    "::placeholder": {
                      color: "#888", // Placeholder color
                    },
                  },
                  invalid: {
                    color: "#e5424d", // Red for invalid input
                  },
                },
              }}
              className="bg-gray-100 text-black placeholder-gray-400 p-3 rounded-lg"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-gray-600 text-left">
                <p className="font-bold">R199/month</p>
                <p className="font-bold">Premium</p>
              </div>
              <Link href="/plan-selection/plans" className="btn btn-blue">
                Change
              </Link>
            </div>
  
            <div className="mt-6">
              <button
                type="submit"
                disabled={!isPaymentValid || !stripe}
                className={`w-full bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md ${
                  !isPaymentValid || !stripe ? "opacity-50 cursor-not-allowed" : ""
                }`}
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

  export default StripeCheckOutForm