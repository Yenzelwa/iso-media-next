'use client';

import "@/src/globals.css";
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/src/components/Input';
import { email_validation, password_register_validation } from '@/src/utils/inputValidations';
import Link from 'next/link';
import React, { useState } from 'react';
const LoginPage = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const methods = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { register, handleSubmit, setError, formState: { errors } } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  type FormData = {
    email: string;
    password: string;
  };

  // Handle form submission and authentication
  const handleLogin = async (data: FormData) => {
    const { email, password } = data;
    setIsLoading(true);
    setErrorMessage(''); // Reset error message before each attempt

    try {
      const response = await fetch('http://172.24.74.185:4002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const user = await response.json();
      const token = "gdjfgudishfioshg24545ds4gsgsdg_fdag"; // Simulate token

      if (response.ok) {
        login(token, user);
        router.push('/');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
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
   <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-neutral-900 to-black animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-neutral-900 bg-opacity-80 p-12 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-lg border border-gray-800 max-w-md w-full mx-4 transform transition-all duration-500 hover:shadow-[0_8px_32px_rgba(239,68,68,0.2)]">
        <div className="flex justify-center mb-8 transform transition-transform duration-500 hover:scale-110">
          <svg
            className="h-[54px] w-[54px] text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Create Account</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleLogin)}>
            <p className={`text-red ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
              {errorMessage}
            </p>

            <div className="mb-4">
              <Input
                {...email_validation}
                //onChange={onFieldChange}
              />
              <p className="text-red">{errors.email?.message}</p>
            </div>

            <div className="mb-4">
              <Input
                {...password_register_validation}
                //onChange={onFieldChange}
              />
              <p className="text-red">{errors.password?.message}</p>
            </div>

            {isLoading ? (
              <p>Loading</p>
            ) : (
              <button
                type="submit"
                className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : isButtonEnabled
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-500/50'
                      : 'bg-gray-400 cursor-not-allowed'
                }`}
                style={{
                  cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
                }}
              >
                <span className="items-center justify-center">Log In</span>
              </button>
            )}
          </form>
        </FormProvider>

        <div className="mt-6 space-y-4">
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-gray-300 hover:text-red-500 transition-colors duration-300 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link
                className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-300"
                href="/account/create"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
