'use client'
import React, { useState, useEffect } from 'react';
import { User, Settings, Shield, CreditCard, Bell } from 'lucide-react';
import { MembershipBilling } from './membershipBilling';
import { PlanDetails } from './PlanDetails';
import { SecurityPrivacy } from './SecurityPrivacy';
import { useAuth } from '../../context/authContext';
import { ProfileSidebar } from './ProfileSidebar';

// Extended user data for profile functionality
interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'basic' | 'premium' | 'family';
  phone: string;
  paymentMethod: string;
  cardExpiry: string;
  cardholderName: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  cellPhone: string;
}

const ProfilePage = () => {
  const { user: authUser, login } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [extendedUser, setExtendedUser] = useState<ExtendedUser | null>(null);

  // Initialize extended user data when auth user changes
  useEffect(() => {
    if (authUser) {
      // If user is from auth context, extend with profile data
      const extended: ExtendedUser = {
        ...authUser,
        phone: "+1 (555) 123-4567",
        paymentMethod: "Visa ****-****-****-1234",
        cardExpiry: "12/26",
        cardholderName: authUser.name,
        billingAddress: {
          street: "123 Main Street",
          city: "Los Angeles",
          state: "CA",
          zipCode: "90210",
          country: "United States"
        },
        cellPhone: "+1 (555) 123-4567"
      };
      setExtendedUser(extended);
    } else {
      setExtendedUser(null);
    }
  }, [authUser]);

  const updateUser = (updates: any) => {
    if (extendedUser) {
      const updated = { ...extendedUser, ...updates };
      setExtendedUser(updated);

      // Also update the auth context with basic user info
      if (updates.name || updates.email) {
        login(authUser?.token || '', {
          ...authUser!,
          name: updates.name || authUser!.name,
          email: updates.email || authUser!.email
        });
      }
    }
  };

  const setFakeUser = () => {
    const fakeUser = {
      id: '1',
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: '',
      subscription: 'premium' as const
    };

    login('', fakeUser);
  };

  const tabs = [
    { id: 'account', label: 'Membership & Billing', icon: CreditCard },
    { id: 'subscription', label: 'Plan details', icon: Settings },
    { id: 'security', label: 'Security and Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  if (!authUser || !extendedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <main className="pt-24 pb-20">
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
              <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
                <p className="text-gray-400 mb-8">
                  Please sign in to access your profile and account settings
                </p>
                <button
                  onClick={setFakeUser}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Set Demo User
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      
      <main className="pt-24 pb-20">
        <div className="px-4 lg:px-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Profile Header */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar Navigation */}
              <ProfileSidebar
                user={extendedUser}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
              />

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-8">

                  {activeTab === 'account' && <MembershipBilling user={extendedUser} updateUser={updateUser} />}
                  {activeTab === 'subscription' && <PlanDetails />}
                  {activeTab === 'security' && <SecurityPrivacy />}

                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default ProfilePage;
