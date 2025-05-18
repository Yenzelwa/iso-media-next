import React from "react";
interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <nav className="w-60 max-md:w-full">
      <div className="flex flex-col gap-2 max-md:overflow-x-auto max-md:flex-row">
        <button
          className="px-4 py-3 text-base font-medium text-left rounded"
          onClick={() => onTabChange("membership")}
          style={{
            background: activeTab === "membership" ? "#333333" : "transparent",
          }}
          aria-selected={activeTab === "membership"}
          role="tab"
        >
          Membership & Billing
        </button>
        <button
          className="px-4 py-3 text-base font-medium text-left rounded"
          onClick={() => onTabChange("plan")}
          style={{
            background: activeTab === "plan" ? "#333333" : "transparent",
          }}
          aria-selected={activeTab === "plan"}
          role="tab"
        >
          Plan Details
        </button>
        <button
          className="px-4 py-3 text-base font-medium text-left rounded"
          onClick={() => onTabChange("security")}
          style={{
            background: activeTab === "security" ? "#333333" : "transparent",
          }}
          aria-selected={activeTab === "security"}
          role="tab"
        >
          Security & Privacy
        </button>
      </div>
    </nav>
  );
}
