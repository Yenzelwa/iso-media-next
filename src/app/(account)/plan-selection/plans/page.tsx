"use client";
import { PricingCard } from '@/src/components/PriceCard';
import { PricingPlan } from '@/typings';
import exp from 'constants';
import Link from 'next/link';
import React, { useState } from 'react';

const pricingLists: PricingPlan[] = [
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
 const PricingPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);

  return (
    <section className="relative w-full max-w-6xl mx-auto px-6 py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
      </div>

      <header className="text-center relative mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Choose Your Perfect Plan
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Select the plan that works best for you and start streaming today
        </p>

        {/* Decorative line */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </header>

      <div className="relative grid md:grid-cols-2 gap-8 mt-8">
        {pricingLists.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan === plan.id}
            onSelect={setSelectedPlan}
            isPopular={plan.id === 2}
          />
        ))}

        {/* Connecting line between cards */}
        <div className="absolute top-1/2 left-1/2 w-32 h-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-red-500/50 to-transparent md:block hidden"></div>
      </div>

      {/* Bottom decorative pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="flex justify-center">
            <Link href="/billing/payment" className="bg-red-900 text-white px-16 py-3 rounded-md inline-block hover:bg-red-600 transition duration-300">Continue to Payment </Link>
        </div>
    </section>
  );
};
 export default PricingPlans;