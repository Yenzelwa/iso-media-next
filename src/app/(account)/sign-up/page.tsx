'use client'
import React, { useState } from 'react';

const PricingPlan = () => {
  const [pricing, setPricing] = useState('Monthly'); // Default pricing plan

  const pricingLists = [
    {
      id: 1,
      title: 'Billed Monthly',
      price: '$7.99',
      type: 'Monthly',
      features: [
        'Stream on 1 device',
        'Instant access to over 1500 unique videos',
        'Access 30+ years of David Icke\'s Content',
        'Watch on your phone and TV',
        '£1.99 for your first month',
        'Renews at £7.99',
      ],
    },
    {
      id: 2,
      title: 'Billed Yearly',
      price: '$99.99',
      type: 'Yearly',
      features: [
        'Stream on 4 devices',
        'All premium features included',
        'Save 17% with annual billing',
        '24/7 customer support',
      ],
    },
  ];

  const isupdateBtnValid = true; // Set your validation logic
  const error = ''; // Set your error message

  const updateMemberPlan = () => {
    // Implement your plan update logic here
  };

  const page = 'change'; // Set the page type ("change" or something else)

  return (
    <div className="bg-dark h-screen text-white">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-600 p-8 rounded-lg shadow-lg text-center">
          <div className="flex items-center mb-4">
            <img
              src="/your-logo.png" // Add your logo image path
              alt="Your Logo"
              className="h-10 w-10 mr-2"
              loading="lazy"
            />
            <h1 className="text-3xl font-bold">Choose a Plan</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {pricingLists.map((item) => (
              <div key={item.id}>
                <div
                  className={`iq-price-box ${pricing === item.type ? 'active' : ''} p-4 border rounded-lg hover:bg-red-500 cursor-pointer`}
                  onClick={() => setPricing(item.type)}
                >
                  <h3 className="iq-price-rate text-white">{item.price}</h3>
                  <span className="type">{item.type}</span>
                </div>
                {item.features.map((feature, index) => (
                  <p className="text-white my-2" key={index}>
                    {feature}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button
              disabled={!isupdateBtnValid}
              onClick={updateMemberPlan}
              className={`w-2/5 btn bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md mx-auto`}
            >
              {page === 'change' ? 'Update Plan' : 'Try Free Trial'}
            </button>
            <p className="error-msg mt-2">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
