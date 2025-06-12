'use client'
import React, { useEffect, useState } from 'react';
import {Input} from '../../../../components/Input'
import {
  firstName_validation,  email_validation,  password_validation,  lastName_validation,
  password_register_validation,
  termsAndConditions_validation,
} from '../../../../utils/inputValidations'
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import * as https from 'https';
import Cookies from 'js-cookie';
import { User as NextAuthUser } from "next-auth";
import { useAuth } from '@/src/app/context/authContext';
import { method } from 'lodash';

const CreateAccount = () => {
  const router = useRouter();
  const methods = useForm();
  const { formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const { login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showSessionOpt, setShowSessionOpt] = useState(false);

  type FormData = {
    email: string;
    password: string;
  };
  
  useEffect(() => {
    if (registerError) {
      setErrorMessage(registerError);
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [registerError]);

  useEffect(() => {
    const isFormValid = methods.formState.isValid;
    setLoginBtnEnable(!isFormValid);
  }, [methods.formState.isValid]);

  const onSubmit = methods.handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'http://172.24.74.185:4002/profile',
        {
          method: 'POST',  // Ensure the method is POST (uppercase)
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: null,
            name: data.first_name,
            email: data.email,
            plan_id: 1,
            status: 'pending',
            stripe_customer_id: null,
            currency: "USD",
            phone: null,
            payment_method_id: null
          }),
          credentials: 'include',  // Equivalent to 'withCredentials: true'
        }
      );
    
      const user = await response.json();
      const token = "gdjfgudishfioshg24545ds4gsgsdg_fdag"; // Replace this with your actual token logic
    
      if (response.ok) {
        login(token, user);
        // Navigate to the next page
        router.push('/plan-selection');
      } else {
        // Handle unsuccessful response
        setRegisterError('Something went wrong');
      }
    } catch (error) {
      console.error('Error during account creation:', error);
      // setRegisterError(error?.message);
    } finally {
      setIsLoading(false);
    }
    
  });
  

  return (
 <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900 to-black animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-neutral-900 bg-opacity-80 p-12 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg border border-gray-800 max-w-md w-full mx-4 transform transition-all duration-500 hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]">
        {user ? (
          <div className="container">
            <div className="text-center">
              <div className="flex justify-center mb-8 transform transition-transform duration-500 hover:scale-110">
                <svg
                  className="h-[54px] w-[54px] text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                  viewBox="0 0 54 54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
              </div>
              <p className="text-gray-500 text-xs mb-2">STEP 1 OF 3</p>
              <h1 className="text-xl font-bold mb-3">Account created</h1>
              <h3 className="text-sm text-gray-300 mb-4">
                use below email to log in
              </h3>
              <div className="text-white font-medium mb-8">
                {user && user.email}
              </div>
              <a
                href="/plan-selection"
                className="block w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/50"
              >
                <span className="flex items-center justify-center">Continue</span>
              </a>
            </div>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              autoComplete="off"
              className="container"
            >
              
              <h1 className="text-3xl text-gray-600 mb-4">
                Sign Up
              </h1>
              {errorMessage && (
                <p className="text-red-500 mb-4 transition-all duration-300">
                  {errorMessage}
                </p>
              )}
              <div className="space-y-4">
                <div className="text-black">
                  <Input {...firstName_validation} />
                </div>
                <div className="text-black">
                  <Input {...email_validation} />
                </div>
                <div className="text-black">
                  <Input {...password_register_validation} />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <label className="flex items-center space-x-2 text-gray-300">
                  <div className="rounded border-gray-300 text-red-500 focus:ring-red-500">
                    <Input {...termsAndConditions_validation} />
                  </div>
                  <span className="text-xs">
                    To create an account, you must agree to the
                    <a
                      className="text-red-500 hover:text-red-400 ml-1 hover:underline"
                      href="/terms-privacy"
                      target="_blank"
                    >
                      Terms of Use and Privacy Policy
                    </a>
                  </span>
                </label>

                <label className="flex items-center space-x-2 text-gray-300">
                  <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
                  <span className="text-xs">
                    Yes, sign me up for emails about IsolaKwaMUNTUs latest
                    releases and news.
                  </span>
                </label>
              </div>

              <div className="mt-8">
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                      LoginBtnEnable
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-900 bg-gradient-to-r from-gray-500 to-red-600 hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-red-500/50'
                    }`}
                    disabled={LoginBtnEnable || isLoading}
                  >
                    <span className="flex items-center justify-center">
                      Continue
                    </span>
                  </button>
                )}
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
