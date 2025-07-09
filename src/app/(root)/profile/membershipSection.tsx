"use client";

import React from "react";
import { BillingRecord, Membership } from "@/typings";


interface MembershipSectionProps {
  membership: Membership;
  billingHistory: BillingRecord[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function MembershipSection({ membership, billingHistory }: MembershipSectionProps) {
  return (
    <section className="p-8 rounded-lg bg-zinc-800">
      <div className="pb-6 mb-8 border-b border-neutral-700">
        <h2 className="mb-6 text-2xl font-bold">Membership</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Name</span>
            <div className="flex gap-4 items-center">
              <span>{membership.full_name}</span>
              <button className="text-sm text-red-600">Edit name</button>
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Email</span>
            <div className="flex gap-4 items-center">
              <span>{membership.email}</span>
              <button className="text-sm text-red-600">Change email</button>
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Password</span>
            <button className="text-sm text-red-600">Change password</button>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Phone</span>
            <div className="flex gap-4 items-center">
              <span>{membership.phone}</span>
              <button className="text-sm text-red-600">Change</button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-6 mb-8 border-b border-neutral-700">
        <h2 className="mb-6 text-2xl font-bold">Billing Details</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Payment Method</span>
            <div className="flex gap-4 items-center">
              <span>{membership.cardType + " " + membership.cardNumber}</span>
              <button className="text-sm text-red-600">Update</button>
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Billing Day</span>
            <div className="flex gap-4 items-center">
              <span>
                {"Monthly on the " + new Date(membership.nextBilling).getDate()}
              </span>
            </div>
          </div>
          <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
            <span className="text-neutral-400">Next Billing Date</span>
            <span>{formatDate(membership.nextBilling)}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-2xl font-bold">Billing History</h2>
        <div className="flex flex-col gap-4">
          {billingHistory.map((bill, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 rounded bg-neutral-700 max-sm:flex-col max-sm:gap-2"
            >
              <div className="flex flex-col">
                <span>{formatDate(bill.date)}</span>
                <span className="text-sm text-neutral-400">{bill.description}</span>
              </div>
              <span className="font-medium">{formatCurrency(bill.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
