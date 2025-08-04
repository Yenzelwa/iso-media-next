'use client'
import { useRouter } from 'next/navigation';import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { UserMenu } from '@/src/components/UserMenu';
import { email_validation, firstName_validation, password_register_validation, termsAndConditions_validation } from '@/src/utils/inputValidations';
import { Input } from '@/src/components/Input';

type FormData = {
  first_name: string;
  email: string;
  password: string;
};

const Register = () => {
  const rounter = useRouter();
  const methods = useForm<FormData>();
  const { formState: { errors } } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const { login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [registerError, setRegisterError] = useState('');

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

  const onSubmit = methods.handleSubmit(async (data: FormData) => {
    setIsLoading(true);
    try {
      // Mock API call structure (commented for demo)
      /*
      const response = await fetch(
        'http://172.24.74.185:4002/profile',
        {
          method: 'POST',
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
          credentials: 'include',
        }
      );
      const user = await response.json();
      const token = "gdjfgudishfioshg24545ds4gsgsdg_fdag";
      */

      // Mock successful registration for demo
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: data.first_name,
          email: data.email,
          avatar: '',
          subscription: 'basic' as const
        };

        const mockToken = "mock_token_for_demo";
        login(mockToken, mockUser);
        rounter.push('/plan-selection');
      }, 1500);

    } catch (error) {
      console.error('Error during account creation:', error);
      setRegisterError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Netflix-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-transparent">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-red-500/50 border border-red-400/30">
                    <div className="w-6 h-6 bg-white rounded-lg transition-all duration-500 group-hover:rounded-full group-hover:scale-90 shadow-inner"></div>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl opacity-0 group-hover:opacity-75 transition-all duration-500 animate-pulse blur-sm"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    IsolaKwaMUNTU
                  </span>
                  <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75">
                    Premium Streaming
                  </div>
                </div>
              </Link>
            </div>

            {/* Step Indicator */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-400">
              <div className="flex items-center space-x-1 text-red-400 font-semibold">
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span>Account</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
                <span>Choose Plan</span>
              </div>
              <div className="w-8 h-px bg-gray-600"></div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-full border-2 border-gray-600"></div>
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
                  className="text-gray-300 hover:text-white px-4 py-2 font-semibold text-sm transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Dynamic Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative pt-24 pb-12">
        <div className="relative z-10 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-gray-700/40 max-w-md w-full mx-4 transform transition-all duration-500 hover:shadow-red-500/20">
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
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl ring-4 ring-green-500/20">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold mb-4 text-white">Welcome Aboard!</h1>
                <h3 className="text-lg text-gray-300 mb-6">
                  Your account has been created successfully
                </h3>
                <div className="text-white font-medium mb-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  {user && user.email}
                </div>
                <Link
                  href="/plan-selection"
                  className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-2xl inline-flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-red-500/50 font-semibold text-lg w-full justify-center"
                >
                  <span>Continue to Plan Selection</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-colors duration-300"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          ) : (
            <FormProvider {...methods}>
              <form
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
                className="container"
              >
                <div className="flex justify-center mb-8 transform transition-transform duration-500 hover:scale-110">
                  <svg
                    className="h-[54px] w-[54px] text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                  </svg>
                </div>

                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-center">
                  Create Your Account
                </h1>
                {errorMessage && (
                  <p className="text-red-500 mb-6 transition-all duration-300 text-center bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    {errorMessage}
                  </p>
                )}
                <div className="space-y-6">
                  <div className="text-white">
                    <Input {...firstName_validation} />
                  </div>
                  <div className="text-white">
                    <Input {...email_validation} />
                  </div>
                  <div className="text-white">
                    <Input {...password_register_validation} />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <label className="flex items-start space-x-3 text-gray-300">
                    <div className="rounded border-gray-300 text-red-500 focus:ring-red-500 mt-1">
                      <Input {...termsAndConditions_validation} />
                    </div>
                    <span className="text-sm leading-relaxed">
                      To create an account, you must agree to the
                      <a
                        className="text-red-500 hover:text-red-400 ml-1 hover:underline"
                        href="/terms-conditions"
                        target="_blank"
                      >
                        Terms of Use and Privacy Policy
                      </a>
                    </span>
                  </label>

                  <label className="flex items-start space-x-3 text-gray-300">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-red-500 focus:ring-red-500 mt-1 bg-gray-800 border-gray-600" 
                    />
                    <span className="text-sm leading-relaxed">
                      Yes, sign me up for emails about IsolaKwaMUNTU's latest
                      releases and news.
                    </span>
                  </label>
                </div>

                <div className="mt-8">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div aria-label="status" className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={`group relative w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center space-x-3 ${
                        LoginBtnEnable
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl hover:shadow-red-500/50'
                      }`}
                      disabled={LoginBtnEnable || isLoading}
                    >
                      <span>Create Account</span>
                      {!LoginBtnEnable && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                      
                      {!LoginBtnEnable && (
                        <>
                          {/* Animated border */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-colors duration-300"></div>
                          
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-red-500 hover:text-red-400 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
