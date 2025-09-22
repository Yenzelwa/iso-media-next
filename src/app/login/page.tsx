'use client'
import "@/src/globals.css";
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { email_validation, password_register_validation } from '@/src/utils/inputValidations';
import { useAuth } from '../context/authContext';
import { Input } from '@/src/components/Input';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, setError, formState: { errors }, watch } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    // Watch inputs to enable the button
  const watchEmail = watch('email');
  const watchPassword = watch('password');

  useEffect(() => {
    // Enable button only if email is valid and password is at least 6 characters
    const isValidEmail = watchEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchEmail);
    const isValidPassword = watchPassword && watchPassword.length >= 6;
    setIsButtonEnabled(isValidEmail && isValidPassword);
  }, [watchEmail, watchPassword]);

  // Handle form submission and authentication
  const handleLogin = async (data: FormData) => {
    const { email, password } = data;
    setIsLoading(true);
    setErrorMessage(''); // Reset error message before each attempt

    try {
      // For demo purposes, we'll use mock authentication
      // In production, replace with actual API call
        try {

          const response = await fetch('/api/auth/login', {  
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          if(response.ok){
          const authData = await response.json();
          const token = authData.access_token;
            login(token, authData.user);
          if(authData.user){
          router.push('/');
          }    
          }
          else{
            const error = await response.json();
            setErrorMessage(error)
          }
        } catch (error: any) {
      if (error?.response?.status === 401) {
        setError('email', { type: 'manual', message: 'Invalid credentials' });
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
      
    } catch {
      setErrorMessage('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { email, password } = methods.getValues();
    if (email && password) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 relative overflow-hidden">
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
      <div className="relative z-10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg w-full mx-4 transform transition-all duration-700 hover:shadow-[0_25px_50px_rgba(239,68,68,0.15)] hover:border-red-500/30">
        {/* Welcome Section */}
        <div className="text-center mb-6">
          <div className="mb-3 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-red-500/20 backdrop-blur-sm border border-red-500/30 hover:ring-red-500/40 transition-all duration-500 hover:scale-110">
              <CheckCircle className="w-10 h-10 text-red-400 drop-shadow-lg" />
            </div>
          </div>
          <p className="text-gray-300 text-sm font-medium tracking-wide">
            Sign in to continue your journey
          </p>
          <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <p aria-label="error-msg" className={`text-red text-sm mb-4 ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
              {errorMessage || 'No error'}
            </p>

            <div className="space-y-4 mb-6">
              <div className="relative">
        
                <Input
                  {...email_validation}
                />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="relative">
                <Input
                  {...password_register_validation}
                />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border border-red-500/30 backdrop-blur-sm">
                <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                <span className="text-red-300 font-medium">Signing you in...</span>
              </div>
            ) : (
                <button
        type="submit"
        className={`group relative w-full py-4 rounded-xl font-bold text-lg transition-all duration-500 transform overflow-hidden ${
          isLoading
            ? 'bg-gray-600/50 cursor-not-allowed text-gray-400'
            : isButtonEnabled
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-[0_8px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_35px_rgba(239,68,68,0.6)] hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-gray-500/30 cursor-not-allowed text-gray-500'
        }`}
        style={{
          cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
        }}
        disabled={!isButtonEnabled || isLoading}
      >
        <span className="relative z-10 flex items-center justify-center">
          Log In
          <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        {isButtonEnabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </button>
            )}
          </form>
        </FormProvider>

        <div className="mt-6 space-y-4">
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="inline-flex items-center text-gray-300 hover:text-red-400 transition-all duration-300 text-sm font-medium group"
            >
              <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-3m-3 7h3m-3 0a2 2 0 01-2-2m0 0a2 2 0 01-2-2m2 2h3m-3 0h3" />
              </svg>
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black/40 px-4 text-gray-400 backdrop-blur-sm">or</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              New to our platform?
            </p>
            <Link
              className="inline-flex items-center justify-center w-full py-3 px-4 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 font-semibold transition-all duration-300 rounded-xl bg-red-500/5 hover:bg-red-500/10 backdrop-blur-sm group"
              href="/register"
            >
              Create Account
              <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
