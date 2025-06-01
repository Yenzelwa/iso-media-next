'use client';

import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/authContext";

const AccountNav = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    // await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 bg-opacity-95 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <svg
                className="h-10 w-10 mr-3 text-red-500 transform transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                viewBox="0 0 54 54"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
              </svg>
              <span className="font-semibold text-xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-500 group-hover:to-red-300">
                IsolaKwaMUNTU
              </span>
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user && user.email ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-neutral-800 rounded-full px-4 py-2 border border-gray-700 transition-all duration-300 hover:border-red-500">
                  <span className="text-sm text-gray-300 mr-3">{user.email}</span>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-600 p-0.5">
                      <img
                        src={user.image || 'https://via.placeholder.com/40'}
                        alt={user.email}
                        width={40}
                        height={40}
                        className="rounded-full w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 hover:shadow-lg hover:shadow-red-500/25"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-white bg-red-500 rounded-lg group hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:ring-2 hover:ring-offset-2 hover:ring-red-500 hover:ring-offset-neutral-900 transition-all duration-300 ease-out"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <span className="relative font-medium">Log In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AccountNav;
