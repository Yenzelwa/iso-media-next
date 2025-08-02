import React from 'react';
import { User } from 'lucide-react';

interface ProfileSidebarProps {
  user: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Array<{
    id: string;
    label: string;
    icon: any;
  }>;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
  tabs
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gradient-to-br from-gray-900/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl p-6 sticky top-24">
        {/* User Avatar & Info */}
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <h3 className="text-xl font-bold text-white">{user.name}</h3>
          <p className="text-gray-400 text-sm">{user.email}</p>
          <div className="mt-3">
            <span className="bg-red-600/20 text-red-400 text-xs px-3 py-1 rounded-full border border-red-500/30">
              Premium Member
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
