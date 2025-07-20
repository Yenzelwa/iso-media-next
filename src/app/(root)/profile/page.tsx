'use client'
import { useAuth } from "../../context/authContext";
import { MembershipSection } from "./membershipSection";
import PlanDetails from "./PlanDetails";
import SecurityPrivacy from "./SecurityPrivacy";

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
              <div className="w-full lg:w-60 lg:flex-shrink-0">
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                  <a
                    href="/account-settings"
                    className="group whitespace-nowrap lg:w-60 h-12 rounded-xl bg-app-header/50 border border-app-border/30 text-app-gray text-sm lg:text-base font-medium leading-6 flex items-center px-4 hover:border-app-red/30 hover:text-white transition-all duration-300 min-w-fit"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-app-border group-hover:bg-app-red rounded-full transition-colors duration-300"></div>
                      Membership &amp; Billing
                    </div>
                  </a>
                  <div className="group whitespace-nowrap lg:w-60 h-12 rounded-xl bg-app-red/20 border border-app-red/30 text-white text-sm lg:text-base font-semibold leading-6 flex items-center px-4 transition-all duration-300 min-w-fit">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-app-red rounded-full"></div>
                      Plan Details
                    </div>
                  </div>
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
                {/* Current Plan Section */}
            {/* <MembershipSection/> */}
               {/* <PlanDetails
          isOpen={true}
          onClose={() => {}}
          selectedPlan={{
            id: "default",
            name: "Default Plan",
            price: '45.99',
            period: 'Yearly',
            features: [],
          
          }}
          currentPlan={{
            id: "default",
            name: "Default Plan",
            price: '12.99',
            period: 'monthly',
            features: [],
          }}
          onConfirm={() => {}}
        /> */}
        <SecurityPrivacy/>
              </div>
            </div>
          </main>
    
          
        </div>
        </>
  );
}
