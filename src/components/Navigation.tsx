import React, { useState } from 'react';
import Link from 'next/link';
import { UserMenu } from './UserMenu';
import { useAuth } from '../app/context/authContext';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMobileMenu();
    }
  };

  // Helper function to check if current route is active
  const isActiveRoute = (path: string) => {
    if (path === "/") return true;
    if (path !== "/") return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out">
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-gray-900/90 to-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"></div>
      </div>

      {/* Navigation Container */}
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">

          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-4 z-10">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                {/* Logo Background with Enhanced Effects */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/50 border border-red-400/30">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-lg transition-all duration-500 group-hover:rounded-full group-hover:scale-90 shadow-inner"></div>
                </div>

                {/* Animated Ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse blur-sm"></div>

                {/* Status Indicator - Simplified */}
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Brand Text */}
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                  IsolaKwaMUNTU
                </span>
                <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75 hidden lg:block">
                  Premium Streaming
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10">
              <Link
                href="/"
                className={`px-3 xl:px-4 py-2 xl:py-2.5 rounded-lg font-bold text-xs xl:text-sm tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  isActiveRoute("/")
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 border border-red-400/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                BROWSE
              </Link>
              <Link
                href="/series"
                className={`px-3 xl:px-4 py-2 xl:py-2.5 rounded-lg font-bold text-xs xl:text-sm tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  isActiveRoute("/series")
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 border border-red-400/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                SERIES
              </Link>
              <Link
                href="/documentary"
                className={`px-3 xl:px-4 py-2 xl:py-2.5 rounded-lg font-bold text-xs xl:text-sm tracking-wide transition-all duration-300 transform hover:scale-105 ${
                  isActiveRoute("/documentary")
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 border border-red-400/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                DOCUMENTARY
              </Link>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/login"
                  className="group relative bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-gray-300 hover:text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 mr-2 xl:mr-3 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm shadow-lg hover:shadow-gray-500/20 transform hover:scale-105"
                >
                  <span className="relative z-10">Log In</span>
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Background glow */}
                  <div className="absolute inset-0 rounded-xl bg-gray-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30 border border-red-500/30"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Simplified */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              onKeyDown={handleKeyPress}
              className="p-2 sm:p-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300"
              aria-label="Toggle mobile menu"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative">
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2.5 sm:top-3' : 'top-1'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 top-2.5 sm:top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-full bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2.5 sm:top-3' : 'top-4 sm:top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100 pb-4 sm:pb-6'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-2xl mt-3 sm:mt-4 border border-white/10 shadow-2xl mx-2 sm:mx-0">

            {/* Mobile Navigation Links */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                    isActiveRoute("/")
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  BROWSE
                </Link>
                <Link
                  href="/series"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                    isActiveRoute("/series")
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  SERIES
                </Link>
                <Link
                  href="/documentary"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                    isActiveRoute("/documentary")
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  DOCUMENTARY
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 space-y-3 border-t border-white/10">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg border border-red-500/30"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg border border-red-500/30"
                    >
                      Get Started
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-gray-300 hover:text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
