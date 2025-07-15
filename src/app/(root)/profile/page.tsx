'use client'
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import EditNameModal from "@/src/components/EditNameModal";
import ChangeEmailModal from "@/src/components/ChangeEmailModal";
import ChangePasswordModal from "@/src/components/ChangePasswordModal";
import ChangePhoneModal from "@/src/components/ChangePhoneModal";
import UpdatePaymentModal from "@/src/components/UpdatePaymentModal";

export default function AccountSettings() {
  const { user, updateUser } = useAuth();
   const setFakeUser = () => {
    updateUser({ name: 'Joe Doe', email: "email@test.com", cellPhone: "0728956358"});
  };

  if (!user) {
    return  <div>
      <h1>Welcome,</h1>
      <button onClick={setFakeUser}>Set Fake User</button>
    </div>
  }

  // Modal states
  const [modals, setModals] = useState({
    editName: false,
    changeEmail: false,
    changePassword: false,
    changePhone: false,
    updatePayment: false,
  });

  // Modal handlers
  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  // Data update handlers
  const handleNameUpdate = (newName: string) => {
    updateUser({ name: newName });
  };

  const handleEmailUpdate = (newEmail: string) => {
    updateUser({ email: newEmail });
  };

  const handlePasswordUpdate = (
    currentPassword: string,
    newPassword: string,
  ) => {
    // In a real app, you'd send this to your API
    console.log("Password updated");
  };

  const handlePhoneUpdate = (newPhone: string) => {
    updateUser({ phone: newPhone });
  };

  const handlePaymentUpdate = (paymentData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  }) => {
    // Format the card number for display
    const maskedCard = `****-****-****-${paymentData.cardNumber.slice(-4)}`;
    updateUser({ paymentMethod: `Visa ${maskedCard}` });
  };

  return (
    <div className="min-h-screen bg-app-dark">
      {/* Main Content */}
      <main className="pt-8 md:pt-[61px] px-4 md:px-6 pb-0">
        {/* Page Title */}
        <h1 className="text-white text-2xl md:text-4xl font-bold leading-8 md:leading-10 mb-8 md:mb-[49px]">
          Account Settings
        </h1>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-60 lg:flex-shrink-0">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              <button className="group whitespace-nowrap lg:w-60 h-12 rounded-xl bg-app-red/20 border border-app-red/30 text-white text-sm lg:text-base font-semibold leading-6 flex items-center px-4 hover:bg-app-red/30 hover:border-app-red/50 transition-all duration-300 min-w-fit">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-app-red rounded-full"></div>
                  Membership &amp; Billing
                </div>
              </button>
              <button className="group whitespace-nowrap lg:w-60 h-12 rounded-xl bg-app-header/50 border border-app-border/30 text-app-gray text-sm lg:text-base font-medium leading-6 flex items-center px-4 hover:border-app-red/30 hover:text-white transition-all duration-300 min-w-fit">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-app-border group-hover:bg-app-red rounded-full transition-colors duration-300"></div>
                  Plan Details
                </div>
              </button>
              <button className="group whitespace-nowrap lg:w-60 h-12 rounded-xl bg-app-header/50 border border-app-border/30 text-app-gray text-sm lg:text-base font-medium leading-6 flex items-center px-4 hover:border-app-red/30 hover:text-white transition-all duration-300 min-w-fit">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-app-border group-hover:bg-app-red rounded-full transition-colors duration-300"></div>
                  Security &amp; Privacy
                </div>
              </button>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="w-full lg:w-[514px] rounded-xl bg-app-card border border-app-border/30 shadow-xl shadow-black/10 p-4 md:p-8">
            {/* Membership Section */}
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Membership
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Manage your account information and preferences
              </p>

              {/* Name Field */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <span className="text-app-gray text-sm sm:text-base font-medium leading-6">
                      Name
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-white text-sm sm:text-base font-semibold leading-6">
                      {user?.name}
                    </span>
                    <button
                      onClick={() => openModal("editName")}
                      className="bg-app-red text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-app-red/80 transition-all duration-200 whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <span className="text-app-gray text-sm sm:text-base font-medium leading-6">
                      Email
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-white text-sm sm:text-base font-semibold leading-6 break-all">
                      {user?.email}
                    </span>
                    <button
                      onClick={() => openModal("changeEmail")}
                      className="bg-app-red text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-app-red/80 transition-all duration-200 whitespace-nowrap"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <span className="text-app-gray text-sm sm:text-base font-medium leading-6">
                      Password
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-app-gray text-sm sm:text-base font-medium leading-6">
                      ••••••••••
                    </span>
                    <button
                      onClick={() => openModal("changePassword")}
                      className="bg-app-red text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-app-red/80 transition-all duration-200 whitespace-nowrap"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone Field */}
              <div className="group bg-app-header/50 border border-app-border/30 rounded-xl p-4 mb-4 hover:border-app-red/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-app-red rounded-full"></div>
                    <span className="text-app-gray text-sm sm:text-base font-medium leading-6">
                      Phone
                    </span>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-white text-sm sm:text-base font-semibold leading-6">
                      {user?.phone}
                    </span>
                    <button
                      onClick={() => openModal("changePhone")}
                      className="bg-app-red text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-app-red/80 transition-all duration-200 whitespace-nowrap"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Details Section */}
            <div className="border-b border-app-border pb-8 mb-8 relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Billing Details
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Your payment information and billing schedule
              </p>

              {/* Payment Method */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4">
                <span className="text-app-gray text-sm sm:text-base font-normal leading-6">
                  Payment Method
                </span>
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="text-white text-sm sm:text-base font-normal leading-6">
                    {user?.paymentMethod}
                  </span>
                  <button
                    onClick={() => openModal("updatePayment")}
                    className="bg-app-red text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-app-red/80 transition-all duration-200 whitespace-nowrap"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Billing Day */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4">
                <span className="text-app-gray text-sm sm:text-base font-normal leading-6">
                  Billing Day
                </span>
                <span className="text-white text-sm sm:text-base font-normal leading-6">
                  Monthly on the 15
                </span>
              </div>

              {/* Next Billing Date */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 sm:gap-4">
                <span className="text-app-gray text-sm sm:text-base font-normal leading-6">
                  Next Billing Date
                </span>
                <span className="text-white text-sm sm:text-base font-normal leading-6">
                  February 15, 2024
                </span>
              </div>
            </div>

            {/* Billing History Section */}
            <div className="relative">
              <div className="absolute -left-4 md:-left-8 top-0 w-1 h-16 bg-app-red rounded-full"></div>
              <h2 className="text-white text-2xl font-bold leading-8 mb-2">
                Billing History
              </h2>
              <p className="text-app-gray text-sm mb-6">
                Your recent transactions and payments
              </p>

              {/* History Items */}
              <div className="space-y-3">
                <div className="group bg-app-header/50 border border-app-red/20 rounded-xl p-4 hover:border-app-red/40 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-app-red rounded-full"></div>
                      <div>
                        <div className="text-white text-base font-semibold leading-6">
                          January 15, 2024
                        </div>
                        <div className="text-app-gray text-sm font-medium leading-5">
                          Monthly subscription - Premium
                        </div>
                      </div>
                    </div>
                    <div className="text-white text-base font-bold leading-6 bg-app-red/20 px-3 py-1 rounded-lg">
                      $19.99
                    </div>
                  </div>
                </div>

                <div className="group bg-app-header/30 border border-app-border/30 rounded-xl p-4 hover:border-app-border/50 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-app-border rounded-full"></div>
                      <div>
                        <div className="text-white text-base font-semibold leading-6">
                          December 15, 2023
                        </div>
                        <div className="text-app-gray text-sm font-medium leading-5">
                          Monthly subscription - Premium
                        </div>
                      </div>
                    </div>
                    <div className="text-app-gray text-base font-bold leading-6 bg-app-header/50 px-3 py-1 rounded-lg">
                      $19.99
                    </div>
                  </div>
                </div>

                <div className="group bg-app-header/30 border border-app-border/30 rounded-xl p-4 hover:border-app-border/50 transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-app-border rounded-full"></div>
                      <div>
                        <div className="text-white text-base font-semibold leading-6">
                          November 15, 2023
                        </div>
                        <div className="text-app-gray text-sm font-medium leading-5">
                          Monthly subscription - Premium
                        </div>
                      </div>
                    </div>
                    <div className="text-app-gray text-base font-bold leading-6 bg-app-header/50 px-3 py-1 rounded-lg">
                      $19.99
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <EditNameModal
        isOpen={modals.editName}
        onClose={() => closeModal("editName")}
        currentName={user?.name}
        onSave={handleNameUpdate}
      />

      <ChangeEmailModal
        isOpen={modals.changeEmail}
        onClose={() => closeModal("changeEmail")}
        currentEmail={user?.email}
        onSave={handleEmailUpdate}
      />

      <ChangePasswordModal
        isOpen={modals.changePassword}
        onClose={() => closeModal("changePassword")}
        onSave={handlePasswordUpdate}
      />

      <ChangePhoneModal
        isOpen={modals.changePhone}
        onClose={() => closeModal("changePhone")}
        currentPhone={user?.phone}
        onSave={handlePhoneUpdate}
      />

      <UpdatePaymentModal
        isOpen={modals.updatePayment}
        onClose={() => closeModal("updatePayment")}
        currentPaymentMethod={user?.paymentMethod}
        onSave={handlePaymentUpdate}
      />
    </div>
  );
}
