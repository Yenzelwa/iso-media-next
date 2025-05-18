import { PlanDetails } from "@/typings";
import { PlanCard } from "./planCard";
import React from "react";

interface PlanDetailsSectionProps {
  planDetails: PlanDetails;
}

export function PlanDetailsSection({ planDetails }: PlanDetailsSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <section className="p-8 rounded-lg bg-zinc-800">
      <h2 className="mb-8 text-2xl font-bold">Plan Details</h2>
      <div className="mb-8">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4">
          <div>
            <p className="mb-2 text-lg font-medium">
              Current Plan: {planDetails.current.name}
            </p>
            <p className="text-sm text-neutral-400">
              {formatCurrency(planDetails.current.price)}/month
            </p>
          </div>
          <button className="px-6 py-3 font-medium bg-red-600 rounded">
            Change Plan
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
        {planDetails.options.map((plan, index) => (
          <PlanCard key={index} plan={plan} />
        ))}
      </div>
    </section>
  );
}
