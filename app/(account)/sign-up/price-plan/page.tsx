'use client'
import Link from 'next/link';
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

  return (
    <div className=" px-40 rounded-lg shadow-lg text-center">
        <h1 className="font-bold text-2xl mb-4">3 of 3 steps</h1>
        <h2 className="font-bold text-3xl">Choose a plan</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
            {pricingLists.map((item) => (
              <Link href="/sign-up/payment" key={item.id} className=" px-10  rounded-lg bg-dark text-left">
                <div
                  className={`iq-price-box py-4 ${pricing === item.type ? 'active' : ''} p-4 border rounded-lg hover:bg-red-500 cursor-pointer`}
                  onClick={() => setPricing(item.type)}
                >
                  <h3 className="iq-price-rate text-white">{item.price}</h3>
                  <span className="type">{item.type}</span>
                </div>
                {item.features.map((feature, index) => (
                  <p className="text-align-left text-white my-2 pb-6" key={index}>
                    {feature}
                  </p>
                ))}
              </Link>
            ))}
          </div>
        </div>
  );
};

export default PricingPlan;
