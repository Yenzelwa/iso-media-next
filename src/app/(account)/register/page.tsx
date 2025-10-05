'use client'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { UserMenu } from '@/src/components/UserMenu';
import { Input } from '@/src/components/Input';
import { email_validation, firstName_validation, password_register_validation, termsAndConditions_validation } from '@/src/utils/inputValidations';
import { useRouter } from 'next/navigation';
import { themeClasses } from '@/src/lib/theme';
import { trackEvent, trackError } from '@/src/lib/obs';

type FormData = {
  first_name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const methods = useForm<FormData>();
  const { formState: { errors } } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const { login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const isFormValid = methods.formState.isValid;
    setLoginBtnEnable(!isFormValid);
  }, [methods.formState.isValid]);

  const onSubmit = methods.handleSubmit(async (data: FormData) => {
    setIsLoading(true);
    try {
      trackEvent('register.submit.start', { email: data.email });
      // Mock API call structure (commented for demo)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.first_name,
          email: data.email,
          password: data.password
        }),
      });
      if(response.ok){
      const authData = await response.json();
      const token = authData.access_token;
      login(token, authData.user)
      trackEvent('register.submit.success', { email: data.email });
      router.push('plan-selection')
    
      }
      else
      {
        const error = await response.json()
        setErrorMessage(error)
        trackError('register.submit.failure', { code: 'server_error' })
      }

    } catch  {
      setErrorMessage('Something went wrong');
      trackError('register.submit.exception', { reason: 'network_error' })
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden text-white">
      {/* Dynamic background to match Login */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599456039-e5d9af20a5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-red-300/25 rounded-full animate-ping delay-500"></div>
        </div>
      </div>
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
                  <span className="text-2xl font-black text-white tracking-tight transition-all duration-300 group-hover:text-red-400 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
                    IsolaKwaMUNTU
                  </span>
                  <div className="text-xs text-gray-400 tracking-widest uppercase font-semibold opacity-75">
                    Premium Streaming
                  </div>
                </div>
              </Link>
            </div>

            {/* Step Indicator */}
            <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
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
              { user ? (
                <UserMenu />
              ) : (
                <Link
                  href="/login"
                  className="group relative bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-gray-300 hover:text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 mr-2 xl:mr-3 border border-gray-600/30 hover:border-gray-500/50 backdrop-blur-sm shadow-lg hover:shadow-gray-500/20 transform hover:scale-105"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20"></div>

        {/* Cinematic background image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599456039-e5d9af20a5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>

        {/* Overlay with blur */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10 animate-pulse"></div>

        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-red-300/25 rounded-full animate-ping delay-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative pt-24 pb-12">
        <div className="relative z-10 bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-gray-700/40 max-w-lg w-full mx-4 transform transition-all duration-500 hover:shadow-red-500/20">
          {user ? (
            <div className="container">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-green-500/30 animate-pulse">
                    <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Welcome Aboard!
                  </h1>
                  <h3 className="text-lg text-gray-300 mb-4">
                    Your account has been created successfully
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Account verified and ready</span>
                  </div>
                </div>
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
            <div className="relative z-10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4 transform transition-all duration-700 hover:shadow-[0_25px_50px_rgba(239,68,68,0.15)] hover:border-red-500/30">
            <FormProvider {...methods}>
              <form
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
                className="container"
              >
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-red-500/20 backdrop-blur-sm border border-red-500/30">
                    <CheckCircle className="w-12 h-12 text-red-400 drop-shadow-lg" />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Create Your Account
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Join our community and start your streaming journey
                  </p>
                </div>
                {errorMessage && (
                  <p className="text-red-500 mb-6 transition-all duration-300 text-center bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    {errorMessage}
                  </p>
                )}
                <div className="space-y-6">
                  <div className="text-white">
                    <Input {...firstName_validation} hideLabel />
                  </div>
                  <div className="text-white">
                    <Input {...email_validation} hideLabel />
                  </div>
                  <div className="text-white">
                    <Input {...password_register_validation} hideLabel />
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                    <label className="flex items-start space-x-4 text-gray-300 cursor-pointer group">
                      <div className="mt-1 flex-shrink-0">
                        <Input {...termsAndConditions_validation} />
                      </div>
                      <div className="text-sm leading-relaxed">
                        <p className="mb-2 font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                          Terms & Conditions Agreement
                        </p>
                        <p>
                          I agree to the{' '}
                          <a
                            className="text-red-400 hover:text-red-400 font-medium hover:underline transition-colors duration-200"
                            href="/terms-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms of Use and Privacy Policy
                          </a>
                          {' '}and acknowledge that I have read and understood them.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-4">
                    <label className="flex items-start space-x-4 text-gray-300 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-600 text-red-400 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 mt-1 bg-gray-800 hover:border-red-400/50 transition-colors duration-200" 
                      />
                      <div className="text-sm leading-relaxed">
                        <p className="font-medium text-gray-200 group-hover:text-white transition-colors duration-200 mb-1">
                          Marketing Communications (Optional)
                        </p>
                        <p>
                          Yes, I would like to receive emails about IsolaKwaMUNTU's latest
                          releases, exclusive content, and news updates.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div aria-label="status" className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={`group relative w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-500 transform overflow-hidden inline-flex items-center justify-center space-x-3 ${
                        LoginBtnEnable
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-[0_8px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_35px_rgba(239,68,68,0.6)] hover:scale-[1.02] active:scale-[0.98]'
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
                    <Link href="/login" className="text-red-400 hover:text-red-300 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </FormProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
