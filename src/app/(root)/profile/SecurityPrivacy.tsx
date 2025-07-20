import { useState } from "react";
import { useAuth } from "../../context/authContext";

export default function SecurityPrivacy() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    pushNotifications: false,
    viewingHistoryEnabled: true,
    dataCollection: true,
    personalizedAds: false,
    shareWatchHistory: false,
    autoLogout: "30",
  });

  if (!user) {
    return <div>Please log in to access security & privacy settings</div>;
  }

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSelectChange = (
    setting: keyof typeof settings,
    value: string,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const activeSessions = [
    {
      id: "1",
      device: "MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "iPhone 15 Pro",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Samsung Smart TV",
      location: "San Francisco, CA",
      lastActive: "1 day ago",
      current: false,
    },
  ];

  return (
  <>
            {/* Security Settings Section */}
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Security Settings
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Manage your account security and authentication preferences
              </p>

              {/* Two-Factor Authentication */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Two-Factor Authentication
                      </span>
                      <span className="text-app-gray text-xs">
                        Add an extra layer of security to your account
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-sm ${settings.twoFactorEnabled ? "text-green-400" : "text-app-gray"}`}
                    >
                      {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </span>
                    <button
                      onClick={() => handleToggle("twoFactorEnabled")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.twoFactorEnabled
                          ? "bg-app-red"
                          : "bg-app-border"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.twoFactorEnabled
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Auto Logout */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Auto Logout
                      </span>
                      <span className="text-app-gray text-xs">
                        Automatically logout after inactivity
                      </span>
                    </div>
                  </div>
                  <select
                    value={settings.autoLogout}
                    onChange={(e) =>
                      handleSelectChange("autoLogout", e.target.value)
                    }
                    className="bg-app-header border border-app-border/30 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-app-red/50"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="240">4 hours</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Sessions Section */}
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Active Sessions
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Manage devices that are currently signed in to your account
              </p>

              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-app-header/50 border border-app-border/30 rounded-xl p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${session.current ? "bg-green-500 animate-pulse" : "bg-app-border"}`}
                        ></div>
                        <div>
                          <div className="text-white font-medium">
                            {session.device}
                            {session.current && (
                              <span className="text-green-400 text-xs ml-2">
                                (This device)
                              </span>
                            )}
                          </div>
                          <div className="text-app-gray text-sm">
                            {session.location}
                          </div>
                          <div className="text-app-gray text-xs">
                            {session.lastActive}
                          </div>
                        </div>
                      </div>
                      {!session.current && (
                        <button className="text-app-error text-sm hover:underline">
                          Sign Out
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full bg-app-header border border-app-border/30 text-app-gray py-3 rounded-lg font-medium hover:text-white hover:border-app-border/50 transition-all duration-200">
                Sign Out All Other Devices
              </button>
            </div>

            {/* Privacy Settings Section */}
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Privacy Settings
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Control how your data is used and what information is shared
              </p>

              {/* Viewing History */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Save Viewing History
                      </span>
                      <span className="text-app-gray text-xs">
                        Allow us to save what you watch for recommendations
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("viewingHistoryEnabled")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.viewingHistoryEnabled
                        ? "bg-app-red"
                        : "bg-app-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.viewingHistoryEnabled
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Data Collection */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Analytics & Performance Data
                      </span>
                      <span className="text-app-gray text-xs">
                        Help improve our service by sharing usage data
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("dataCollection")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.dataCollection ? "bg-app-red" : "bg-app-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.dataCollection
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Personalized Ads */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Personalized Advertisements
                      </span>
                      <span className="text-app-gray text-xs">
                        Show ads based on your interests and viewing habits
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("personalizedAds")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.personalizedAds ? "bg-app-red" : "bg-app-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.personalizedAds
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Preferences Section */}
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Notification Preferences
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Choose how you want to be notified about updates and new content
              </p>

              {/* Email Notifications */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Email Notifications
                      </span>
                      <span className="text-app-gray text-xs">
                        Receive updates about new content and account changes
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("emailNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications
                        ? "bg-app-red"
                        : "bg-app-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.emailNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Push Notifications */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <div>
                      <span className="text-white text-sm sm:text-base font-medium leading-6 block">
                        Push Notifications
                      </span>
                      <span className="text-app-gray text-xs">
                        Get notified on your devices about new releases
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("pushNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.pushNotifications
                        ? "bg-app-red"
                        : "bg-app-border"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.pushNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Data Management Section */}
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Data Management
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Download your data or delete your account
              </p>

              <div className="space-y-4">
                {/* Download Data */}
                <div className="bg-app-header/50 border border-app-border/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        Download Your Data
                      </h3>
                      <p className="text-app-gray text-sm">
                        Get a copy of all your account data, viewing history,
                        and preferences
                      </p>
                    </div>
                    <button className="bg-app-header border border-app-border/30 text-white px-4 py-2 rounded-lg font-medium hover:border-app-red/30 transition-all duration-200">
                      Download
                    </button>
                  </div>
                </div>

                {/* Clear Viewing History */}
                <div className="bg-app-header/50 border border-app-border/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        Clear Viewing History
                      </h3>
                      <p className="text-app-gray text-sm">
                        Remove all your viewing history and reset
                        recommendations
                      </p>
                    </div>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors duration-200">
                      Clear
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        Delete Account
                      </h3>
                      <p className="text-app-gray text-sm">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                      Delete
                    </button>
                  </div>
                </div>
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
                    Data Protection
                  </span>
                </div>
                <p className="text-app-gray text-sm">
                  Your privacy is important to us. We follow industry standards
                  to protect your data and give you control over your
                  information.
                  <a href="#" className="text-app-red hover:underline ml-1">
                    Learn more about our privacy policy
                  </a>
                  .
                </p>
              </div>
            </div>
         </>
  );
}
