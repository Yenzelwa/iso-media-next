
interface NavigationTab {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const navigationTabs: NavigationTab[] = [
  {
    id: "membership",
    label: "Membership & Billing",
    path: "/account-settings",
  },
  {
    id: "plans",
    label: "Plan Details",
    path: "/plan-details",
  },
  {
    id: "security",
    label: "Security & Privacy",
    path: "/security-privacy",
  },
];

export default function AccountNavigation() {
  const currentPath = location.pathname;

  return (
    <div className="w-full lg:w-60 lg:flex-shrink-0">
      {/* Navigation Header */}
      <div className="mb-6 hidden lg:block">
        <h3 className="text-white text-lg font-semibold mb-2">
          Account Settings
        </h3>
        <p className="text-app-gray text-sm">
          Manage your account preferences and security
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
        {navigationTabs.map((tab) => {
          const isActive = currentPath === tab.path;

          return (
            <a
              key={tab.id}
              href={tab.path}
              className={`group relative whitespace-nowrap lg:w-60 h-12 rounded-xl text-sm lg:text-base font-medium leading-6 flex items-center px-4 transition-all duration-300 min-w-fit ${
                isActive
                  ? "bg-app-red/20 border border-app-red/40 text-white font-semibold shadow-lg shadow-app-red/10"
                  : "bg-app-header/50 border border-app-border/30 text-app-gray hover:border-app-red/30 hover:text-white hover:bg-app-header/70"
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-app-red rounded-r-full"></div>
              )}

              <div className="flex items-center gap-3 relative z-10">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-app-red shadow-lg shadow-app-red/50"
                      : "bg-app-border group-hover:bg-app-red"
                  }`}
                ></div>
                <span className="truncate">{tab.label}</span>
              </div>

              {/* Active background glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-app-red/10 to-transparent rounded-xl opacity-50"></div>
              )}

              {/* Hover effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-app-red/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </a>
          );
        })}
      </div>

      {/* Current Page Indicator */}
      <div className="mt-4 p-3 bg-app-header/30 border border-app-border/20 rounded-lg hidden lg:block">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-app-red rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">Current Page</span>
        </div>
        <p className="text-app-gray text-xs">
          {navigationTabs.find((tab) => tab.path === currentPath)?.label ||
            "Account Settings"}
        </p>
      </div>
    </div>
  );
}
