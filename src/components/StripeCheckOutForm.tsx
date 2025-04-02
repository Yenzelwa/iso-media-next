import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Link from "next/link";
import { useState } from "react";
import router from "next/router";

const StripeCheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingInfo, setBillingInfo] = useState({
    cardHolder: "",
  });

  const isPaymentValid = true; // Payment validation logic can be added
  const error = ""; // Handle error message from Stripe API

  const updateMemberPlan = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found");
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: billingInfo.cardHolder,
        },
      });

      console.log(paymentMethod, "Payment Method");

      if (error) {
        console.error("Payment Method Error:", error.message);
      } else {
        console.log("Payment Method Created:", paymentMethod);
        router.push("/"); // Redirect after payment method creation
        // Implement your logic for updating the plan here
      }
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  };

  return (
    <div className="p-6 bg-dark rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="font-bold text-2xl mb-4 text-white">Step 3 of 3</h1>
      <h2 className="font-bold text-3xl mb-4 text-white">Choose a Plan</h2>

      <form onSubmit={(e) => { e.preventDefault(); updateMemberPlan(); }} className="space-y-4">
        {/* Cardholder Name Field */}
        <input
          type="text"
          placeholder="Card Holder Name"
          value={billingInfo.cardHolder}
          onChange={(e) =>
            setBillingInfo({ ...billingInfo, cardHolder: e.target.value })
          }
          className="bg-gray-100 text-black placeholder-gray-400 p-3 rounded-lg w-full"
          required
        />

        {/* Card Element */}
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
                  backgroundColor: "#f3f4f6",
                  fontFamily: "'Inter', sans-serif",
                  "::placeholder": {
                    color: "#888",
                  },
                },
                invalid: {
                  color: "#e5424d",
                },
              },
            }}
            className="bg-gray-100 text-black placeholder-gray-400 p-3 rounded-lg"
          />
        </div>

        {/* Plan Info */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-gray-600 text-left">
            <p className="font-bold">R199/month</p>
            <p className="font-bold">Premium</p>
          </div>
          <Link href="/plan-selection/plans" className="btn btn-blue text-blue-600 hover:text-blue-800">
            Change
          </Link>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            disabled={!isPaymentValid || !stripe}
            className={`w-full bg-red-500 text-white px-4 py-2 hover:bg-red-600 rounded-md ${
              !isPaymentValid || !stripe ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Confirm Payment
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default StripeCheckOutForm;
