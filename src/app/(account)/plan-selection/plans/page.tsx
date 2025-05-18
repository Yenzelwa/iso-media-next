// Ensure the page is always statically generated
'use client'


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";  // Import useSession from next-auth
import Cookies from "js-cookie";
import { useAuth } from "@/src/app/context/authContext";

// Type for the component props
interface PricingPlanProps {
  session: any;  // Session type is simplified here for client-side
}

const PricingPlan = () => {
  const {loading, user} = useAuth();  // Get session and its status
  const [selectedPlan, setSelectedPlan] = useState(1);
  const [userCookie, setUserCookie] = useState<any>(null);
  const router = useRouter();

  const pricingLists = [
    {
      id: 1,
      title: "Billed Monthly",
      price: "$7.99",
      type: "Monthly",
      features: [
        "Stream on 1 device",
        "Instant access to over 1500 unique videos",
        "Access 30+ years of David Icke's Content",
        "Watch on your phone and TV",
        "£1.99 for your first month",
        "Renews at £7.99",
      ],
    },
    {
      id: 2,
      title: "Billed Yearly",
      price: "$99.99",
      type: "Yearly",
      features: [
        "Stream on 4 devices",
        "All premium features included",
        "Save 17% with annual billing",
        "24/7 customer support",
        "£1.99 for your first month",
        "Renews at £7.99",
        "Instant access to over 1500 unique videos",
        "Access 30+ years of David Icke's Content",
      ],
    },
  ];

  useEffect(() => {
    const userCookie = Cookies.get("auth_user");
    if (userCookie) {
      const userProfile = JSON.parse(userCookie);
      setUserCookie(userProfile);
      setSelectedPlan(userProfile.plan.id); // Set the selected plan from user profile
    }
  }, []);

  useEffect(() => {
    if (userCookie) {
      const updatedUserProfile = { ...userCookie, plan: { ...userCookie.plan, id: selectedPlan } };
      Cookies.set("auth_user", JSON.stringify(updatedUserProfile)); // Update the user profile in the cookie
    }
  }, [selectedPlan, userCookie]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while session is being fetched
  }

  if (!user) {
    // If no session is found, redirect to login
    return (
      <div className="text-center">
        <h2>You need to be logged in to access this page.</h2>
        <button onClick={() => signIn()} className="px-6 py-3 bg-blue-500 text-white rounded-md">
          Log in
        </button>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="text-gray-500">STEP 2 OF 3</p>
          <h1 className="text-2xl font-bold mb-4">Choose your plan</h1>
          <h3 className="text-lg text-gray mb-6">
            IsolakwaMUNTU is committed to giving you all you need to awaken your inner child.
          </h3>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {pricingLists.map((item) => (
            <div
              key={item.id}
              className={`rounded-lg bg-dark p-8 shadow-md ${selectedPlan === item.id ? "border-2 border-red" : ""}`}
              onClick={() => setSelectedPlan(item.id)}
            >
              <div className="text-center">
                <h3 className="font-medium text-white">{item.title}</h3>
                <div className="mt-4 flex items-center justify-center">
                  <span className="text-5xl font-extrabold tracking-tight text-red">{item.price}</span>
                </div>
              </div>

              <div className="mt-8">
                <ul>
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-start mt-2">
                      <svg
                        className="flex-shrink-0 h-6 w-6 text-green"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-3 text-base text-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="w-1/2 flex justify-center items-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white bg-red hover:bg-red focus:outline-none focus:border-red focus:shadow-outline-red transition duration-150 ease-in-out"
            onClick={() => router.push("/billing/payment")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
