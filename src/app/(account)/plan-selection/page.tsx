'use client'
import React, { useState } from 'react';
import  Link  from 'next/link';
import { ArrowLeft, CheckCircle, Shield, Play } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { UserMenu } from '@/src/components/UserMenu';
import { PricingCard } from '@/src/components/PriceCard';

interface PricingPlan {
  id: number;
  title: string;
  price: string;
  type: string;
  features: string[];
}

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
      "$1.99 for your first month",
      "Renews at $7.99",
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
      "$1.99 for your first month",
      "Renews at $7.99",
      "Instant access to over 1500 unique videos",
      "Access 30+ years of David Icke's Content",
    ],
  },
];

const PlanSelection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/50 border border-red-400/30">
                    <div className="w-6 h-6 bg-white rounded-lg transition-all duration-500 group-hover:rounded-full group-hover:scale-90 shadow-inner"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse blur-sm"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    IsolaKwaMUNTU
                  </span>
                  <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75">
                    Premium Streaming
                  </div>
                </div>
              </Link>
            </div>

            {/* Step Indicator */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Account</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-1 text-red-400 font-semibold">
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Choose Plan</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                <span>Payment</span>
              </div>
            </div>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  className="group relative bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-gray-300 hover:text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 mr-2 xl:mr-3 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm shadow-lg hover:shadow-gray-500/20 transform hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <section className="relative w-full max-w-7xl mx-auto px-6 pt-32 pb-24 overflow-hidden z-10">

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/register"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back</span>
          </Link>
        </div>

        <header className="text-center relative mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full mb-8 backdrop-blur-sm border border-red-500/20">
            <Play className="w-10 h-10 text-red-400" />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Choose Your <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Plan</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Unlock unlimited access to premium content with crystal-clear streaming, multiple device support, and an ever-growing library of exclusive shows and documentaries.
            </p>
          </div>

          {/* Netflix-style features */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span>No ads or interruptions</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Shield className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Play className="w-5 h-5" />
              <span>Watch offline</span>
            </div>
          </div>
        </header>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {pricingLists.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={setSelectedPlan}
                isPopular={plan.id === 2}
              />
            ))}
          </div>

          {/* Selection Indicator */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Selected: <span className="text-white font-semibold">
                {pricingLists.find(p => p.id === selectedPlan)?.title}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-16 space-y-6">
          <Link
            href="/payment"
            className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-4 rounded-2xl inline-flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/50 font-semibold text-lg min-w-[280px] justify-center"
          >
            <span>Continue to Payment</span>
            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />

            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-colors duration-300"></div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
          </Link>

          <p className="text-gray-500 text-sm text-center max-w-md">
            By continuing, you agree to our terms of service and privacy policy. You can cancel your subscription at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PlanSelection;
