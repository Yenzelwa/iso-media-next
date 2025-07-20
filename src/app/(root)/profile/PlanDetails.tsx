import { useState } from "react";
import { useAuth } from "../../context/authContext";
import PlanUpgradeModal from "@/src/components/PlanUpgradeModal";
interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
}

 interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: Plan;
  currentPlan: Plan;
  onConfirm: (planId: string) => void;
}

export default function PlanDetails({
  isOpen,
  onClose,
  selectedPlan,
  currentPlan,
  onConfirm,
}: PlanUpgradeModalProps) {
  debugger;
  if (!isOpen) return null;
  const { user } = useAuth();
  const [modals, setModals] = useState({
    planUpgrade: false,
  });
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] =
    useState<any>(null);

  if (!user) {
    return <div>Please log in to access plan details</div>;
  }

  // Modal handlers
  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handlePlanUpgrade = (plan: any) => {
    setSelectedPlanForUpgrade(plan);
    openModal("planUpgrade");
  };

  const handleConfirmPlanChange = (planId: string) => {
    // In a real app, this would call your API to change the plan
    console.log("Plan changed to:", planId);
    // You could update the user context or refresh the data here
  };

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      period: "month",
      features: [
        "HD streaming on 1 device",
        "Access to basic content library",
        "Limited offline downloads (10)",
        "Standard audio quality",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$19.99",
      period: "month",
      features: [
        "4K Ultra HD streaming on 4 devices",
        "Complete content library access",
        "Unlimited offline downloads",
        "Premium Dolby Atmos audio",
      ],
      current: true,
    },
    {
      id: "family",
      name: "Family",
      price: "$29.99",
      period: "month",
      features: [
        "4K Ultra HD streaming on 6 devices",
        "Complete content library + exclusive content",
        "Unlimited offline downloads",
        "Multiple user profiles (up to 6)",
      ],
    },
  ];


  return (

 <>
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Current Plan
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Your active subscription and plan details
              </p>

              {/* Current Plan Card */}
              <div className="bg-app-header/50 border border-app-red/30 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-1">
                      {currentPlan?.name} Plan
                    </h3>
                    <p className="text-app-gray text-sm">
                      Active since January 15, 2024
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-2xl font-bold">
                      {currentPlan?.price}
                    </div>
                    <div className="text-app-gray text-sm">per month</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    Active
                  </span>
                </div>

                <div className="space-y-2">
                  {currentPlan?.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-app-gray text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

         
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Available Plans
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Compare and upgrade your subscription plan
              </p>

              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative border rounded-xl p-6 transition-all duration-300 hover:border-app-red/40 ${
                      plan.current
                        ? "bg-app-red/10 border-app-red/30"
                        : "bg-app-header/30 border-app-border/30"
                    }`}
                  >
                    {plan.current && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-app-red text-white text-xs font-medium px-3 py-1 rounded-full">
                          Current Plan
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white text-lg font-bold">
                          {plan.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-app-gray text-sm">
                            / {plan.period}
                          </span>
                        </div>
                      </div>

                      {plan.current ? (
                        <span className="text-app-gray text-sm font-medium">
                          Current
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePlanUpgrade(plan)}
                          className="bg-app-red text-white text-sm px-4 py-2 rounded-lg font-medium hover:bg-app-red/80 transition-colors duration-200"
                        >
                          {parseFloat(plan.price.replace(/[^0-9.]/g, "")) > parseFloat((currentPlan?.price ?? "0").replace(/[^0-9.]/g, ""))
                            ? "Upgrade"
                            : "Downgrade"}
                        </button>
                      )}
                    </div>

                    <div className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="#10b981"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="text-app-gray text-xs">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-app-header/30 border border-app-border/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16H12.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-white font-medium text-sm">
                    Plan Changes
                  </span>
                </div>
                <p className="text-app-gray text-sm">
                  Plan changes take effect at the start of your next billing
                  cycle. Downgrades will be prorated and credited to your
                  account.
                </p>
              </div>
          
     

      {/* Modals */}
      {selectedPlanForUpgrade && (
        <PlanUpgradeModal
          isOpen={modals.planUpgrade}
          onClose={() => closeModal("planUpgrade")}
          selectedPlan={selectedPlanForUpgrade}
          currentPlan={{
            id: "premium",
            name: "Premium",
            price: "$19.99",
            period: "month",
            features: [
              "4K Ultra HD streaming on 4 devices",
              "Complete content library access",
              "Unlimited offline downloads",
              "Premium Dolby Atmos audio",
            ],
          }}
          onConfirm={handleConfirmPlanChange}
        />
      )}
      
</div>
  </>
  )};


