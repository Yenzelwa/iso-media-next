'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Shield, Play } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { themeClasses } from '@/src/lib/theme';
import { PricingCard } from '@/src/components/PriceCard';
import { trackEvent } from '@/src/lib/obs';
import { AccountNav } from '@/src/components/AccountNav';

interface Plan {
  id: string;
  name: string;
  price_cents: number;
  interval: 'month' | 'year';
  devices: number;
  quality: 'HD' | '4K';
}

interface PricingPlan {
  id: number;
  title: string;
  price: string;
  type: string;
  features: string[];
}

const PlanSelection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [pricingLists, setPricingLists] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        if (response.ok) {
          const plansData = await response.json();
          setPlans(plansData);

          // Transform API data to UI format
          const transformedPlans = plansData.map((plan: Plan, index: number) => ({
            id: index + 1,
            title: `Billed ${plan.interval === 'month' ? 'Monthly' : 'Yearly'}`,
            price: `$${(plan.price_cents / 100).toFixed(2)}`,
            type: plan.interval === 'month' ? 'Monthly' : 'Yearly',
            features: [
              `Stream on ${plan.devices} device${plan.devices > 1 ? 's' : ''}`,
              `${plan.quality} Quality`,
              "Instant access to premium content",
              "Watch on your phone, tablet, and TV",
              "Cancel anytime",
              "24/7 customer support",
              ...(plan.interval === 'year' ? ['Save with annual billing'] : [])
            ],
          }));

          setPricingLists(transformedPlans);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
        // Fallback to default plans
        setPricingLists([
          {
            id: 1,
            title: "Billed Monthly",
            price: "$7.99",
            type: "Monthly",
            features: [
              "Stream on 1 device",
              "HD Quality",
              "Instant access to premium content",
              "Watch on your phone and TV",
              "Cancel anytime",
            ],
          },
          {
            id: 2,
            title: "Billed Yearly",
            price: "$79.99",
            type: "Yearly",
            features: [
              "Stream on 4 devices",
              "4K Quality",
              "All premium features included",
              "Save with annual billing",
              "24/7 customer support",
              "Cancel anytime",
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className={`min-h-[100dvh] ${themeClasses.pageBackground()} text-white overflow-x-hidden`}>
      <AccountNav step="plan" />

      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-20 overflow-hidden z-10">

        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/register"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back</span>
          </Link>
        </div>

        <header className="text-center relative mb-8">

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
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 animate-pulse">
                  <div className="h-6 bg-gray-700/50 rounded mb-4"></div>
                  <div className="h-8 bg-gray-700/50 rounded mb-6"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-700/50 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
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
          )}

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
          <Link id="payment-link"
            href="/payment"
            className={`group relative ${themeClasses.primaryCta()} px-12 py-4 rounded-2xl inline-flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 font-semibold text-lg min-w-[280px] justify-center`}
            onClick={() => trackEvent('plan-selection.continue', { selected_plan: selectedPlan })}
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
