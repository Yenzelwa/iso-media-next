import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: 'isolakwamuntu forgot password  ',
    description: 'Browse all categories',
  }
const ForgotPasswordPassword = () =>{

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
            <h2 className="text-3xl font-bold mb-4">Forgot Password</h2>
            <p className="text-gray-600 mb-6">
              Enter your email address to reset your password.
            </p>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
              <button
                type="submit"
                className="bg-red text-white px-4 py-2 hover:bg-red-600 rounded-md"
              >
                Reset Password
              </button>
              <Link href="/login" className="text-blue-500 hover:underline">
               Login In
              </Link>
          </div>
            </form>
           
          </div>
        </div>
      );
}
export default ForgotPasswordPassword;