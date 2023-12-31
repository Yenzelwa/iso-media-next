import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'isolakwamuntu account  ',
    description: 'Browse all categories',
  }
const SignUpAccount = () =>{
    return (
   
      <div className="p-6 bg-gray rounded-lg shadow-md max-w-md">
        <h1 className="font-bold text-2xl mb-4">1 of 3 steps</h1>
        <h2 className="font-bold text-3xl">Create Account</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <input
              type="text"
              className="w-full py-2 px-3 rounded-lg bg-gray text-white placeholder-gray"
              placeholder="Email Address"
            />
            <input
              type="text"
              className="w-full mt-4 py-2 px-3 rounded-lg bg-gray-800 text-white placeholder-gray"
              placeholder="First Name"
            />
            <input
              type="password"
              className="w-full mt-4 py-2 px-3 rounded-lg bg-gray-800 text-white placeholder-gray"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="text"
              className="w-full mt-4 py-2 px-3 rounded-lg bg-gray-800 text-white placeholder-gray"
              placeholder="Last Name"
            />
            <input
              type="password"
              className="w-full mt-4 py-2 px-3 rounded-lg bg-gray-800 text-white placeholder-gray"
              placeholder="Confirm password"
            />
          </div>
        </div>
        <label className="text-left mt-4 flex items-center">
          <input type="checkbox" className="mr-2" />
          Please email me what's new on ISO
        </label>
        <label className="text-left mt-2 flex items-center">
          <input type="checkbox" className="mr-2" />
          You must agree to the Terms of Use and Privacy Policy
        </label>
        <div className="flex space-x-4 mt-4">
          <p className="text-left text-sm">
            Already have an account?{' '}
            <Link  className="text-red hover:underline" href="/login">
              Log In
            </Link>
          </p>
          
        </div>
        <div className='py-8'>
        <Link href="/sign-up/pricing"
            className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
          >
            Next
          </Link>
        </div>
       
      </div>
          );
        };
        
export default SignUpAccount;