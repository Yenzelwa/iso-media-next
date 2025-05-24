"use client";
import React, {useEffect, useState } from "react";


import { NavigationTabs } from "./navigationTabs";
import { PlanDetailsSection } from "./planDetailsSection";
import { MembershipSection } from "./membershipSection";
import { BillingRecord, Membership, PlanDetails, SecuritySettings, TabType } from "@/typings";
import { Security } from "./securitySettings";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<TabType>("membership");
  const {user, loading} = useAuth();
  const router = useRouter()

  const [membership] = useState<Membership>(() => ({
    plan: "Premium",
    nextBilling: "2024-02-15",
    price: 19.99,
    email: "john.doe@example.com",
    cardType: "Visa",
    cardNumber: "****-****-****-4242",
    phone: "+1 (555) 123-4567",
  }));

    useEffect(() => {
    // Ensure this is only called on the client side
    if (typeof window !== "undefined" && !loading && !user) {
      // If no session is found, redirect to login page
      router.push("/login");
    }
  }, [user, loading, router]);


  const [billingHistory] = useState<BillingRecord[]>(() => [
    {
      date: "2024-01-15",
      amount: 19.99,
      description: "Monthly subscription - Premium",
    },
    {
      date: "2023-12-15",
      amount: 19.99,
      description: "Monthly subscription - Premium",
    },
    {
      date: "2023-11-15",
      amount: 19.99,
      description: "Monthly subscription - Premium",
    },
  ]);

  const [planDetails] = useState<PlanDetails>(() => ({
    current: {
      name: "Premium",
      price: 19.99,
      quality: "4K + HDR",
      devices: 4,
      resolution: "Ultra HD",
    },
    options: [
      {
        name: "Basic",
        price: 9.99,
        quality: "Good",
        devices: 1,
        resolution: "HD",
      },
      {
        name: "Standard",
        price: 15.99,
        quality: "Better",
        devices: 2,
        resolution: "Full HD",
      },
      {
        name: "Premium",
        price: 19.99,
        quality: "Best",
        devices: 4,
        resolution: "Ultra HD",
      },
    ],
  }));

  const [security] = useState<SecuritySettings>(() => ({
    twoFactor: true,
    lastAccess: "2024-01-20 14:30",
    location: "New York, USA",
    device: "Chrome on MacOS",
  }));

  return (
    <main className="w-screen text-white bg-neutral-900 min-h-[screen]">
      <div className="px-6 py-16 mx-auto max-w-[1200px]">
        <h1 className="mb-12 text-5xl font-bold max-sm:text-3xl">
          Account Settings
        </h1>
        <div className="flex gap-8 max-md:flex-col">
          <NavigationTabs
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabType)}
          />
          <div className="flex-[grow]">
            {activeTab === "membership" && (
              <MembershipSection
                membership={membership}
                billingHistory={billingHistory}
              />
            )}
            {activeTab === "plan" && (
              <PlanDetailsSection planDetails={planDetails} />
            )}
            {activeTab === "security" && (
              <Security security={security} />
            )}
          </div>
        </div>
      </div>
      <div>
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">',
          }}
        />
      </div>
    </main>
  );
}
