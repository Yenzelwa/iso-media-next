'use client'
import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Input } from '@/src/components/Input';
import { email_validation } from '@/src/utils/inputValidations';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, watch, formState: { errors } } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Watch email input to enable the button
  const watchEmail = watch('email');

  useEffect(() => {
    // Enable button only if email is valid
    const isValidEmail = !!watchEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchEmail);
    setIsButtonEnabled(isValidEmail);
  }, [watchEmail]);

  // Handle form submission
  const handleResetPassword = async (data: FormData) => {
    const { email } = data;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to send reset email. Please check your email address and try again.');
      }

    } catch (error: any) {
      console.error('Password reset error:', error);
      setErrorMessage('Failed to send reset email. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden">
        {/* Enhanced Dynamic Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950/20"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599456039-e5d9af20a5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-950/10 via-transparent to-green-950/10 animate-pulse"></div>
        </div>

        {/* Success Content */}
        <div className="relative z-10 bg-black/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl ring-4 ring-green-500/20">
              <CheckCircle className="w-12 h-12 text-green-400 drop-shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Check Your Email
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              We've sent a password reset link to <span className="text-green-400 font-medium">{watchEmail}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-green-300 text-sm">
              <p className="mb-2">⚡ Reset instructions sent!</p>
              <p>Check your inbox and follow the link to create a new password. The link expires in 15 minutes.</p>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-300 rounded-xl shadow-lg hover:shadow-green-500/25 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599456039-e5d9af20a5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10 animate-pulse"></div>

        {/* Floating particles effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500/20 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-red-400/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-red-300/25 rounded-full animate-ping delay-500"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4 transform transition-all duration-700 hover:shadow-[0_25px_50px_rgba(239,68,68,0.15)] hover:border-red-500/30">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-red-500/20 backdrop-blur-sm border border-red-500/30">
              <Mail className="w-10 h-10 text-red-400 drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
            Reset Password
          </h1>
          <p className="text-gray-300 text-sm font-medium tracking-wide leading-relaxed">
            Enter your email address and we'll send you a secure link to reset your password
          </p>
          <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="relative">
                <Input
                  {...email_validation}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-2 ml-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30 backdrop-blur-sm mb-6">
                <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="text-red-300 font-medium">Sending reset link...</span>
              </div>
            ) : (
              <button
                type="submit"
                className={`group relative w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 transform overflow-hidden mb-6 ${
                  isLoading
                    ? 'bg-gray-600/50 cursor-not-allowed text-gray-400'
                    : isButtonEnabled
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-[0_8px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_35px_rgba(239,68,68,0.6)] hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-500/30 cursor-not-allowed text-gray-500'
                }`}
                disabled={!isButtonEnabled || isLoading}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Send Reset Link
                  <Mail className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                {isButtonEnabled && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
              </button>
            )}

            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600/50"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-black/40 px-4 text-gray-400 backdrop-blur-sm">or</span>
                </div>
              </div>

              <Link
                href="/login"
                className="inline-flex items-center text-gray-300 hover:text-red-400 transition-all duration-300 text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Login
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ForgotPassword;
