import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'isolakwamuntu account  ',
    description: 'Browse all categories',
  }
const AccountPage = () =>{
    return (
        <div className="bg-black h-screen text-white">
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-600 p-8 rounded-lg shadow-lg text-center">
            <div className="flex items-center mb-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2 text-red"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">
            IsolaKwaMUNTU
          </span>
        </div>
              <h1 className="text-3xl font-bold">Create Account</h1>
            </div>
            <hr className="border-b border-red-400 my-4" />
            <p className="text-sm mb-4">1 of 3 steps</p>
                  <div className="grid grid-cols-2 gap-4">
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
                
                  <p className=" text-left text-sm">
                    Already have an account?{' '}
                    <a className="text-red hover:underline" href="#">
                      Sign In
                    </a>
                  </p>
                  <button
                    className="bg-red  text-left text-white px-8 py-2 hover:bg-red-600 rounded-md "
                  >
                    Sign Up
                  </button>
                  </div>
                </div>
              </div>
            </div>
          );
        };
        
export default AccountPage;