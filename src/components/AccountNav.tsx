"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useAuth } from "@/src/app/context/authContext";
import { UserMenu } from "@/src/components/UserMenu";
import { themeClasses } from "@/src/lib/theme";

type Step = "account" | "plan" | "payment";

interface AccountNavProps {
  step: Step;
}

export function AccountNav({ step }: AccountNavProps) {
  const isActive = (s: Step) => step === s;
  const { user } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/50 border border-red-400/30">
                  <div className="w-6 h-6 bg-white rounded-lg transition-all duration-500 group-hover:rounded-full group-hover:scale-90 shadow-inner" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse blur-sm" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                  IsolaKwaMUNTU
                </span>
                <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75">Premium Streaming</div>
              </div>
            </Link>
          </div>

          {/* Stepper */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
            <div className={`flex items-center space-x-1 ${isActive("account") ? "text-red-400 font-semibold" : ""}`}>
              {isActive("account") ? (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                <CheckCircle className="w-4 h-4 text-green-400" />
              )}
              <span>Account</span>
            </div>
            <div className="w-8 h-px bg-gray-600" />
            <div className={`flex items-center space-x-1 ${isActive("plan") ? "text-red-400 font-semibold" : ""}`}>
              {isActive("plan") ? (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
              )}
              <span>Choose Plan</span>
            </div>
            <div className="w-8 h-px bg-gray-600" />
            <div className={`flex items-center space-x-1 ${isActive("payment") ? "text-red-400 font-semibold" : ""}`}>
              {isActive("payment") ? (
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
              )}
              <span>Payment</span>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu />
            ) : (
              <Link
                href="/login"
                className={`group relative ${themeClasses.primaryCta()} px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 mr-2 xl:mr-3 transform hover:scale-105`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
