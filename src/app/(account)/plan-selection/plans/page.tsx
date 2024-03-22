'use client'
import React, { useState } from "react";

const PricingPlan = () => {
  const [pricing, setPricing] = useState("Monthly"); // Default pricing plan

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
      ],
    },
  ];

  return (
    <>
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-lg leading-6 font-semibold text-gray-900">Choose a plan</h2>
          </div>

          <div className="mt-20">
            <div className="flex justify-center">
              {pricingLists.map((item) => (
                <button
                  key={item.id}
                  className={`${
                    pricing === item.type ? "bg-red-600 text-white" : "bg-gray-800 text-white"
                  } text-sm font-medium rounded-full px-6 py-3 mx-4 focus:outline-none`}
                  onClick={() => setPricing(item.type)}
                >
                  {item.type}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
            {pricingLists.map((item) => (
              <div
                key={item.id}
                className="rounded-lg p-8 shadow-md"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-medium text-gray-900">{item.title}</h3>
                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-5xl font-extrabold tracking-tight text-gray-900">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <ul>
                    {item.features.map((feature, index) => (
                      <li key={index} className="flex items-start mt-2">
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-green-500"
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
                        <span className="ml-3 text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className={`${
                      pricing === item.type ? "bg-red-600" : "bg-gray-600"
                    } w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition duration-150 ease-in-out`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;
