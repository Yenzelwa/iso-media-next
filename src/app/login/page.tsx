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

  // Effect to check if both fields are filled, enabling the button
  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { email, password } = methods.getValues();
    if (email && password) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-dark p-12 rounded-lg shadow-md max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <p className={`text-red ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
                {errorMessage}
              </p>

              <div className="mb-4">
                <Input
                  {...email_validation}
                //  onChange={onFieldChange} // Trigger onFieldChange when email is updated
                />
                <p className="text-red">{errors.email?.message}</p>
              </div>

              <div className="mb-4">
                <Input
                  {...password_register_validation}
               //   onChange={onFieldChange} // Trigger onFieldChange when password is updated
                />
                <p className="text-red">{errors.password?.message}</p>
              </div>

              {isLoading ? (
                <p>Laoding</p>
              ) : (
                <button
                  type="submit"
                  className={`w-full py-2 rounded-md text-white ${isLoading ? 'bg-gray cursor-not-allowed' : 'bg-red hover:bg-red'}`}
                  style={{
                    backgroundColor: isButtonEnabled ? '#EF4444' : '#E5E7EB',
                    cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
                  }}
                  /// Disable button when either field is empty
                >
                  <span className="items-center justify-center">Login</span>
                </button>
              )}
            </form>
          </FormProvider>

          <div className="mt-4">
            <Link href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="mt-4">
            <p className="text-left text-sm">
              Don't have an account?{' '}
              <Link className="text-red hover:underline" href="/account">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
