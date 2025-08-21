import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  HelpCircle,
  LogOut,
  ChevronDown,
  Crown,
  Star
} from 'lucide-react';
import { useAuth } from '../app/context/authContext';
import { useRouter } from 'next/navigation';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if user is on registration flow pages
const pathname = location.pathname.split('?')[0].replace(/\/$/, '');
const isRegistrationPage = ['/register', '/plan-selection', '/payment'].includes(pathname);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  if (!user) return null;

  const getSubscriptionIcon = () => {
    switch (user.subscription) {
      case 'premium':
        return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'family':
        return <Star className="w-4 h-4 text-purple-400" />;
      default:
        return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSubscriptionLabel = () => {
    switch (user.subscription) {
      case 'premium':
        return 'Premium';
      case 'family':
        return 'Family';
      default:
        return 'Basic';
    }
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    if(!name || typeof name !='string') return'';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Simplified version for registration pages
  if (isRegistrationPage) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-800/20 to-gray-900/20 backdrop-blur-xl border border-gray-600/30 shadow-lg">
        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl object-cover ring-2 ring-gray-500/30 shadow-md"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-md ring-2 ring-gray-500/30">
              {getInitials(user.name)}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="hidden sm:flex flex-col items-start min-w-0">
          <span className="text-white text-xs sm:text-sm font-medium truncate max-w-[100px] sm:max-w-[120px] lg:max-w-[140px]">
            {user.name}
          </span>
          <span className="text-gray-400 text-xs truncate max-w-[100px] sm:max-w-[120px] lg:max-w-[140px]">
            {user.email}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 sm:space-x-2 text-gray-400 hover:text-red-400 bg-gray-700/30 hover:bg-red-900/20 px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 border border-gray-600/30 hover:border-red-500/50 group"
          title="Sign Out"
        >
          <LogOut className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
          <span className="hidden sm:inline text-xs font-medium">Logout</span>
        </button>
      </div>
    );
  }

  // Full dropdown version for other pages
  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 pr-2 sm:pr-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-white/10 hover:border-red-500/30 hover:bg-gradient-to-r hover:from-red-900/20 hover:to-gray-900/40 transition-all duration-500 group shadow-lg hover:shadow-red-500/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10 group-hover:ring-red-400/30 transition-all duration-300"
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg ring-2 ring-white/10 group-hover:ring-red-400/30 group-hover:shadow-red-500/30 transition-all duration-300">
              {getInitials(user.name)}
            </div>
          )}
        </div>

        {/* User Info & Chevron */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="flex flex-col items-start min-w-0">
            <span className="text-white text-xs sm:text-sm font-semibold truncate group-hover:text-red-100 transition-colors duration-300 max-w-[100px] sm:max-w-[120px] lg:max-w-[140px]">
              {user.name}
            </span>
            <span className="text-gray-400 text-xs truncate max-w-[100px] sm:max-w-[120px] lg:max-w-[140px]">
              {user.email}
            </span>
          </div>
          <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-red-400 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-3 sm:mt-4 w-80 sm:w-96 bg-gradient-to-br from-gray-900/98 to-slate-900/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-gray-700/30 shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-300"
        >
          {/* Decorative Header Background */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent"></div>

          {/* User Info Header */}
          <div className="relative p-6 border-b border-gray-700/20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-3 ring-white/10 shadow-xl"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-xl ring-3 ring-white/10">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center border-2 border-gray-800 shadow-lg">
                  {getSubscriptionIcon()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xl truncate bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                  {user.name}
                </h3>
                <p className="text-gray-400 text-sm truncate mt-1">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-red-600/20 to-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                    {getSubscriptionIcon()}
                    <span className="text-xs text-red-300 font-semibold">
                      {getSubscriptionLabel()} Member
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-4">
            {/* Menu Links */}
            <div className="px-4 space-y-2">
              <Link
                href="/profile"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/20"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/20 transition-all duration-300">
                  <User className="w-5 h-5 text-blue-400 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-lg">My Profile</span>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400">Account settings & preferences</p>
                </div>
              </Link>

              <Link
                href="/faqs"
                onClick={handleMenuItemClick}
                className="flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-red-600/20 hover:to-red-500/10 transition-all duration-300 group border border-transparent hover:border-red-500/20"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/20 transition-all duration-300">
                  <HelpCircle className="w-5 h-5 text-orange-400 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-lg">FAQ's</span>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400">Frequently asked questions</p>
                </div>
              </Link>
            </div>

            {/* Logout */}
            <div className="px-4 mt-6 pt-4 border-t border-gray-700/20">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-4 px-4 py-4 rounded-2xl text-gray-300 hover:text-red-400 hover:bg-gradient-to-r hover:from-red-600/30 hover:to-red-500/20 transition-all duration-300 group w-full text-left border border-transparent hover:border-red-500/30"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600/20 to-gray-700/10 rounded-xl flex items-center justify-center group-hover:from-red-500/30 group-hover:to-red-600/20 transition-all duration-300">
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-lg">Sign Out</span>
                  <p className="text-sm text-gray-500 group-hover:text-red-300">End your session</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
