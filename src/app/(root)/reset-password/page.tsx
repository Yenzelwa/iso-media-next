'use client'
import React, { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from 'lucide-react';
import { Input } from '@/src/components/Input';
import { password_register_validation } from '@/src/utils/inputValidations';

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const methods = useForm<FormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit, watch, setError, formState: { errors } } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const watchPassword = watch('password');
  const watchConfirmPassword = watch('confirmPassword');

  useEffect(() => {
    // Check if token exists
    if (!token) {
      setErrorMessage('Invalid or missing reset token. Please request a new password reset.');
      return;
    }

    // Enable button if both passwords match and meet requirements
    const isValidPassword = !!watchPassword && watchPassword.length >= 8;
    const passwordsMatch = watchPassword === watchConfirmPassword && !!watchConfirmPassword;
    setIsButtonEnabled(isValidPassword && passwordsMatch);
  }, [token, watchPassword, watchConfirmPassword]);

  const handleResetPassword = async (data: FormData) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    if (!token) {
      setErrorMessage('Invalid reset token. Please request a new password reset.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/password/reset/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          password
        }),
      });

      if (response.ok) {
        setPasswordReset(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to reset password. Please try again or request a new reset link.');
      }

    } catch (error: any) {
      console.error('Password reset error:', error);
      setErrorMessage('Failed to reset password. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (passwordReset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-green-950/20"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599456039-e5d9af20a5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>

        {/* Success Content */}
        <div className="relative z-10 bg-black/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl ring-4 ring-green-500/20">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Password Reset Successfully!
            </h1>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your password has been reset. You'll be redirected to login in a few seconds.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-300 rounded-xl shadow-lg hover:shadow-green-500/25 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Continue to Login
          </Link>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20"></div>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 bg-black/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4 text-center">
          <div className="text-red-400 mb-4">
            <Lock className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Invalid Reset Link</h1>
            <p className="text-gray-300 text-sm">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-300 rounded-xl"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-red-950/20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599456039-e5d9af20a5d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl ring-4 ring-red-500/20">
            <Lock className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            Reset Password
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Enter your new password to complete the reset process
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleResetPassword)}>
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm text-center">
                {errorMessage}
              </div>
            )}

            <div className="space-y-6">
              {/* New Password */}
              <div className="relative">
                <Input
                  {...password_register_validation}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-2">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-gray-400 text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    {...methods.register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === watchPassword || 'Passwords do not match'
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-2">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="my-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Password Requirements:</h4>
              <div className="grid grid-cols-1 gap-1 text-xs">
                <div className={`flex items-center ${watchPassword?.length >= 8 ? 'text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-2 ${watchPassword?.length >= 8 ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  At least 8 characters
                </div>
                <div className={`flex items-center ${watchPassword === watchConfirmPassword && watchConfirmPassword ? 'text-green-400' : 'text-gray-400'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-2 ${watchPassword === watchConfirmPassword && watchConfirmPassword ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  Passwords match
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {isLoading ? (
              <div className="flex items-center justify-center py-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30">
                <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="text-red-300 font-medium">Resetting password...</span>
              </div>
            ) : (
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 transform ${
                  isButtonEnabled
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gray-500/30 cursor-not-allowed text-gray-500'
                }`}
                disabled={!isButtonEnabled || isLoading}
              >
                Reset Password
              </button>
            )}

            <div className="mt-6 text-center">
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

export default ResetPasswordPage;
