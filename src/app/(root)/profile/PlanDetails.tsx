import React, { useState } from 'react';
import { CreditCard, Settings, X } from 'lucide-react';
import { toCents } from '@/src/utils/cents';

export const PlanDetails: React.FC = () => {
  const [showManagePlan, setShowManagePlan] = useState(false);
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);
  const [showUpgradePlan, setShowUpgradePlan] = useState(false);
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      features: ['HD streaming on 1 device', 'Access to basic content library', 'Limited offline downloads'],
      color: 'from-blue-600 to-blue-800',
      devices: '1 Device',
      quality: 'HD 720p'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$29.99',
      period: 'month',
      features: ['4K Ultra HD streaming on 4 devices', 'Complete content library access', 'Unlimited offline downloads'],
      current: true,
      color: 'from-red-600 to-red-800',
      devices: '4 Devices',
      quality: '4K Ultra HD'
    },
    {
      id: 'family',
      name: 'Family',
      price: '$49.99',
      period: 'month',
      features: ['4K Ultra HD streaming on 6 devices', 'Complete library + exclusive content', 'Multiple user profiles'],
      color: 'from-purple-600 to-purple-800',
      devices: '6 Devices',
      quality: '4K Ultra HD'
    },
  ];

  const currentPlan = plans.find(plan => plan.current);
  console.log('currentplan', currentPlan);

  return (
    <div className="space-y-8">
      {/* Current Plan Details */}
      <div data-testid="current-plan" className="relative">
        <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <h2 id="currentPlan" className="text-3xl font-bold text-white mb-2">Current Plan</h2>
        <p className="text-gray-400 text-sm mb-6">Your active subscription and plan details</p>

        <div className="bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/30 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{currentPlan?.name} Plan</h3>
                </div>
                <p className="text-gray-400 text-sm mb-2">Active since January 15, 2024</p>
                <p className="text-gray-400 text-sm">Next billing: February 15, 2024</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white mb-1">{currentPlan?.price}</div>
                <div className="text-gray-400 text-sm">per month</div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Active Subscription</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <div className="text-gray-400 text-sm mb-1">Streaming Quality</div>
                <div className="text-white font-bold">{currentPlan?.quality}</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <div className="text-gray-400 text-sm mb-1">Simultaneous Streaming</div>
                <div className="text-white font-bold">{currentPlan?.devices}</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
                <div className="text-gray-400 text-sm mb-1">Downloads</div>
                <div className="text-white font-bold">Unlimited</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                <button data-testid="manage-plan"
                  onClick={() => setShowManagePlan(true)}
                  className="bg-red-600/20 text-red-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-600/30 transition-colors border border-red-500/30"
                >
                  Manage Plan
                </button>
                <button data-testid="cancel-subscription"
                  onClick={() => setShowCancelSubscription(true)}
                  className="bg-gray-600/20 text-gray-400 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-600/30 transition-colors border border-gray-500/30"
                >
                  Cancel Subscription
                </button>
              </div>
              <button data-testid="upgrade-popup"
                onClick={() => setShowUpgradePlan(true)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div data-testid="plan_summary" className="relative">
        <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <h2 className="text-3xl font-bold text-white mb-2">All Available Plans</h2>
        <p className="text-gray-400 text-sm mb-6">Compare features and choose the perfect plan for you</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative border rounded-3xl p-6 transition-all duration-300 hover:border-red-500/50 hover:scale-105 ${
                plan.current
                  ? "bg-gradient-to-br from-red-600/20 to-red-800/10 border-red-500/40 scale-105"
                  : "bg-gradient-to-br from-gray-800/40 to-gray-900/40 border-gray-700/30 hover:bg-gradient-to-br hover:from-gray-700/40 hover:to-gray-800/40"
              }`}
            >
              {plan.current && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    CURRENT PLAN
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">/ {plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="bg-gray-700/30 rounded-xl p-3">
                  <div className="text-gray-400 text-xs mb-1">Quality</div>
                  <div className="text-white text-sm font-medium">{plan.quality}</div>
                </div>
                <div className="bg-gray-700/30 rounded-xl p-3">
                  <div className="text-gray-400 text-xs mb-1">Devices</div>
                  <div className="text-white text-sm font-medium">{plan.devices}</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {plan.current ? (
                <button aria-label={currentPlan?.id} className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 rounded-xl font-medium cursor-not-allowed" disabled>
                  Current Plan
                </button>
              ) : (
                <button 
                  onClick={() => {
                    const action = Number(plan.price.replace(/[^0-9.]/g, '')) > Number((currentPlan?.price ?? '0').replace(/[^0-9.]/g, '')) ? 'upgrade' : 'downgrade';
                    alert(`${action === 'upgrade' ? 'Upgrading' : 'Downgrading'} to ${plan.name} plan for ${plan.price}/month`);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
                >
                  {toCents(plan.price) > toCents(currentPlan?.price ?? '') ? 'Upgrade Plan' : 'Downgrade Plan'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Plan Features Comparison */}
      <div className="relative">
        <div className="absolute -left-8 top-0 w-1 h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <h2 className="text-3xl font-bold text-white mb-2">Feature Comparison</h2>
        <p className="text-gray-400 text-sm mb-6">Detailed comparison of all plan features</p>

        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-700/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/30">
                  <th className="text-left p-6 text-white font-bold">Features</th>
                  <th className="text-center p-6 text-white font-bold">Basic</th>
                  <th className="text-center p-6 text-white font-bold">Premium</th>
                  <th className="text-center p-6 text-white font-bold">Family</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/20">
                  <td className="p-6 text-gray-300">Streaming Quality</td>
                  <td className="p-6 text-center text-gray-400">HD 720p</td>
                  <td className="p-6 text-center text-red-400 font-bold">4K Ultra HD</td>
                  <td className="p-6 text-center text-red-400 font-bold">4K Ultra HD</td>
                </tr>
                <tr className="border-b border-gray-700/20">
                  <td className="p-6 text-gray-300">Simultaneous Streams</td>
                  <td className="p-6 text-center text-gray-400">1 Device</td>
                  <td className="p-6 text-center text-red-400 font-bold">4 Devices</td>
                  <td className="p-6 text-center text-red-400 font-bold">6 Devices</td>
                </tr>
                <tr className="border-b border-gray-700/20">
                  <td className="p-6 text-gray-300">Offline Downloads</td>
                  <td className="p-6 text-center text-gray-400">Limited</td>
                  <td className="p-6 text-center text-green-400">Unlimited</td>
                  <td className="p-6 text-center text-green-400">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-6 text-gray-300">User Profiles</td>
                  <td className="p-6 text-center text-gray-400">1 Profile</td>
                  <td className="p-6 text-center text-green-400">4 Profiles</td>
                  <td className="p-6 text-center text-green-400">6 Profiles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Manage Plan Modal */}
      {showManagePlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Manage Plan</h3>
              <button
                onClick={() => setShowManagePlan(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-800/40 rounded-xl p-4">
                <h4 className="text-white font-medium mb-2">Plan Management Options</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Change billing cycle (monthly/yearly)</li>
                  <li>• Update payment method</li>
                  <li>• Modify plan features</li>
                  <li>• View usage statistics</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert('Plan management features are coming soon!');
                  setShowManagePlan(false);
                }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Continue
              </button>
              <button
                onClick={() => setShowManagePlan(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Subscription Modal */}
      {showCancelSubscription && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Cancel Subscription</h3>
              <button
                onClick={() => setShowCancelSubscription(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-4 mb-4">
                <h4 className="text-red-400 font-medium mb-2">⚠️ Are you sure?</h4>
                <p className="text-gray-300 text-sm">
                  Canceling your subscription will:
                </p>
                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                  <li>• End access to premium features</li>
                  <li>• Remove 4K streaming quality</li>
                  <li>• Limit simultaneous streams to 1 device</li>
                  <li>• Cancel on February 15, 2024</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert('Subscription canceled. You will retain access until February 15, 2024.');
                  setShowCancelSubscription(false);
                }}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Confirm Cancellation
              </button>
              <button
                onClick={() => setShowCancelSubscription(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Keep Subscription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Plan Modal */}
      {showUpgradePlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Upgrade Plan</h3>
              <button
                onClick={() => setShowUpgradePlan(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/10 border border-purple-500/30 rounded-xl p-4">
                <h4 className="text-purple-400 font-medium mb-2">🚀 Upgrade to Family Plan</h4>
                <p className="text-gray-300 text-sm mb-3">
                  Get more value with our Family plan:
                </p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Stream on 6 devices simultaneously</li>
                  <li>• Multiple user profiles</li>
                  <li>• Exclusive family content</li>
                  <li>• Only $10 more per month</li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  alert('Upgrading to Family plan for $29.99/month. Changes will take effect immediately.');
                  setShowUpgradePlan(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              >
                Upgrade Now
              </button>
              <button
                onClick={() => setShowUpgradePlan(false)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
