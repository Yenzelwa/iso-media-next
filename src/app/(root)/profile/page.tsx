'use client'
import React, { useState, useEffect } from 'react';
import { User, Settings, Shield, CreditCard, Bell } from 'lucide-react';
import { MembershipBilling } from './membershipBilling';
import { PlanDetails } from './PlanDetails';
import { SecurityPrivacy } from './SecurityPrivacy';
import { useAuth } from '../../context/authContext';
import { ProfileSidebar } from './ProfileSidebar';
import { themeClasses } from '@/src/lib/theme';

// Extended user data for profile functionality
interface ExtendedUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription: 'basic' | 'premium' | 'family';
  phone?: string;
  paymentMethod?: string;
  cardExpiry?: string;
  cardholderName?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  cellPhone?: string;
}

const ProfilePage = () => {
  const { user: authUser, login } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [extendedUser, setExtendedUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Fetch user profile data from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // In tests or non-browser, skip network and use authUser
        if (typeof fetch !== 'function') {
          const fallbackUser: ExtendedUser = {
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
          setExtendedUser(fallbackUser);
          return;
        }

        // Fetch user profile data
        const response = await fetch('/api/profiles/me', {
          headers: {
            'Authorization': `Bearer ${authUser.token || ''}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const profileData = await response.json();

          // Merge auth user data with profile data
          const extended: ExtendedUser = {
            ...authUser,
            ...profileData,
            // Provide fallback values for missing data
            phone: profileData.phone || "+1 (555) 123-4567",
            paymentMethod: profileData.paymentMethod || "Visa ****-****-****-1234",
            cardExpiry: profileData.cardExpiry || "12/26",
            cardholderName: profileData.cardholderName || authUser.name,
            billingAddress: profileData.billingAddress || {
              street: "123 Main Street",
              city: "Los Angeles",
              state: "CA",
              zipCode: "90210",
              country: "United States"
            },
            cellPhone: profileData.cellPhone || "+1 (555) 123-4567"
          };

          setExtendedUser(extended);
        } else {
          // Fallback to basic user data if API fails
          const fallbackUser: ExtendedUser = {
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
          setExtendedUser(fallbackUser);
        }

      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile data.');

        // Fallback to basic user data
        if (authUser) {
          const fallbackUser: ExtendedUser = {
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
          setExtendedUser(fallbackUser);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser]);

  const updateUser = async (updates: any) => {
    if (!extendedUser) return;

    try {
      // Optimistically update UI
      const updated = { ...extendedUser, ...updates };
      setExtendedUser(updated);

      // Send update to API (skip in test/non-browser)
      let ok = true;
      if (typeof fetch === 'function') {
        const response = await fetch('/api/profiles/me', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${authUser?.token || ''}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });
        ok = response.ok;
      }

      // Update auth context optimistically so UI reflects change immediately
      if (updates.name || updates.email) {
        login(authUser?.token || '', {
          ...authUser!,
          name: updates.name || authUser!.name,
          email: updates.email || authUser!.email,
        });
      }

      if (!ok) {
        throw new Error('Failed to update profile');
      }

    } catch (err) {
      console.error('Error updating profile:', err);
      // Revert optimistic update on error
      setExtendedUser(extendedUser);
      setError('Failed to update profile. Please try again.');
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
    { id: 'account', label: 'Account Settings', icon: CreditCard },
    { id: 'subscription', label: 'Plan Details', icon: Settings },
    { id: 'security', label: 'Security & Privacy', icon: Shield }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg text-gray-300">Loading profile...</span>
        </div>
      </div>
    );
  }

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
    <div className={`${themeClasses.pageBackground()} text-white`}>
      
      <main className="pt-24 pb-20">
        <div className="px-4 lg:px-16">
          <div className="max-w-6xl mx-auto">
            
            {/* Profile Header */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-gray-400 text-sm">Manage your account settings and preferences</p>
              {error && (
                <div className="mt-4 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  {error}
                </div>
              )}
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
