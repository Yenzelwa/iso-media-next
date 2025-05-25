"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../app/context/authContext';
import { Logo } from './Logo';

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loading, user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMobileMenu();
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="flex relative flex-wrap justify-between items-center p-4 -mt-0.5 w-full border-b border-solid bg-neutral-900 border-b-white border-b-opacity-10 max-md:p-3 max-sm:flex-col max-sm:gap-3 max-sm:items-start">
      <div className="flex shrink-0 items-center mr-8 text-base tracking-normal leading-6">
        <Link href="/" className="flex items-center">
          <Logo />
          <span className="text-xl font-semibold tracking-tight leading-7">
            IsolaKwaMUNTU
          </span>
        </Link>
      </div>

      <button
        className="hidden p-2 text-white bg-transparent transition-opacity cursor-pointer border-none duration-200 ease-in-out max-sm:block max-sm:absolute max-sm:top-4 max-sm:right-4"
        aria-label="Toggle mobile menu"
        aria-controls="mobile-menu"
        aria-expanded={mobileMenuOpen}
        onClick={toggleMobileMenu}
        onKeyDown={handleKeyPress}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        id="mobile-menu"
        role="navigation"
        className={`flex grow items-center transition-all duration-300 ease-in-out
          max-sm:flex-col max-sm:items-start max-sm:w-full
          ${mobileMenuOpen
            ? 'max-sm:max-h-[500px] max-sm:opacity-100 max-sm:visible max-sm:mt-12'
            : 'max-sm:max-h-0 max-sm:opacity-0 max-sm:invisible max-sm:mt-0'
          } max-sm:overflow-hidden`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="grow text-sm font-semibold leading-5 uppercase">
          <Link
            href="/browse"
            className="mr-6 text-white opacity-90 transition-opacity cursor-pointer duration-200 ease-in-out hover:opacity-100"
          >
            Browse
          </Link>
          <Link
            href="/series"
            className="mr-4 text-white opacity-90 hover:opacity-100"
          >
            Series
          </Link>
          <Link
            href="/documentary"
            className="text-white opacity-90 hover:opacity-100"
          >
            Documentary
          </Link>
        </div>

        <div className="flex items-center max-sm:mt-4">
          {loading ? (
            <span className="text-white">Loading...</span>
          ) : user ? (
            <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <span className="text-white mr-4 max-sm:mr-0">{user.email}</span>
              <Link
                href="/profile"
                className="px-4 py-2 text-sm font-semibold leading-4 text-white hover:text-red-500 transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 ml-4 max-sm:ml-0 text-sm font-semibold leading-4 text-white hover:text-red-500 transition-colors duration-200"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
              <Link
                href="/account"
                className="px-5 py-2 text-base font-medium leading-6 text-white bg-red rounded-md cursor-pointer duration-200 ease-in-out transition-colors hover:bg-red-800"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 ml-4 max-sm:ml-0 text-sm font-semibold leading-4 rounded border border-red text-white hover:bg-red-900 transition-colors duration-200"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const dynamic = "force-dynamic";
