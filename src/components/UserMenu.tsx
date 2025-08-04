'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link  from 'next/link';
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
  const rounter = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    rounter.push('/');
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
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 pr-4 rounded-2xl bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-white/10 hover:border-red-500/30 hover:bg-gradient-to-r hover:from-red-900/20 hover:to-gray-900/40 transition-all duration-500 group shadow-lg hover:shadow-red-500/20"
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
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 ring-white/10 group-hover:ring-red-400/30 group-hover:shadow-red-500/30 transition-all duration-300">
              {getInitials(user.name)}
            </div>
          )}
        </div>

        {/* User Info & Chevron */}
        <div className="hidden sm:flex items-center space-x-2">
          <div className="flex flex-col items-start">
            <span className="text-white text-sm font-semibold truncate group-hover:text-red-100 transition-colors duration-300">
              {user.name}
            </span>
            <span className="text-gray-400 text-xs truncate">
              {user.email}
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-red-400 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-4 w-96 bg-gradient-to-br from-gray-900/98 to-slate-900/98 backdrop-blur-2xl rounded-3xl border border-gray-700/30 shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-300"
        >
          {/* Decorative Header Background */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent"></div>

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
