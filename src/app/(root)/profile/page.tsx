"use client";

import AccountNavigation from "@/src/components/AccountNavigation";
import { useAuth } from "../../context/authContext";
import { MembershipSection } from "./membershipSection";

export default function AccountSettings() {
  const { user, updateUser } = useAuth();

  const setFakeUser = () => {
    updateUser({
      name: "Joe Doe",
      email: "email@test.com",
      phone: "0728956358",
      paymentMethod: "Visa ****-****-****-1234",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-app-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-app-gray mb-8">
            Please sign in to access your account settings
          </p>
          <button
            onClick={setFakeUser}
            className="bg-app-red text-white px-6 py-3 rounded-lg font-medium hover:bg-app-red/80 transition-colors duration-200"
          >
            Set Fake User
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-app-dark">
        {/* Main Content */}
        <main className="pt-8 md:pt-[61px] px-4 md:px-6 pb-0">
          {/* Page Title */}
          <h1 className="text-white text-2xl md:text-4xl font-bold leading-8 md:leading-10 mb-8 md:mb-[49px]">
            Account Settings
          </h1>

          {/* Content Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Left Sidebar Navigation */}
            <AccountNavigation />

            {/* Main Content Card */}
            <div className="w-full lg:w-[514px] rounded-xl bg-app-card border border-app-border/30 shadow-xl shadow-black/10 p-4 md:p-8">
              {/* Current Plan Section */}
              <MembershipSection />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
