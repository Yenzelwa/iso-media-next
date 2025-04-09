'use client'
import "@/src/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import React, { useState } from 'react'; // Import the context hook
import { useAuth } from '../context/authContext';
import {useRouter} from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/src/components/Input';
import { email_validation, password_validation } from '@/src/utils/inputValidations';
import Loader from '@/src/components/Loader';
import Link from 'next/link';

const LoginPage = () => {
  const { login, logout, user } = useAuth(); // Destructure login, logout, and user from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const methods = useForm()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
  const [loginError, setLoginError] = useState('');
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  type FormData = {
    email: string,
    password: string
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const email= (e.target as HTMLFormElement).elements.namedItem('email') as HTMLInputElement;
    const password = (e.target as HTMLFormElement).elements.namedItem('password') as HTMLInputElement;
  
    try {
      const response = await fetch('http://172.24.74.185:4002/profile/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      const user = await response.json();
      const token = "gdjfgudishfioshg24545ds4gsgsdg_fdag"
      if (response.ok) {
        login(token, user);
        router.push('/');
      } else {
        setErrorMessage('Invalid email or password.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <>

      <div className="flex flex-col items-center justify-center">
      <div className="bg-dark p-12 rounded-lg shadow-md max-w-md">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleLogin}>
            <p className={`text-red ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
              {errorMessage}
            </p>
            <br />
            <div className="mb-4">

              <Input {...email_validation} />

              <p className="text-red">{errors.email?.message}</p>
            </div>
            <div className="mb-4">

              <Input {...password_validation} />
              <p className="text-red">{errors.password?.message}</p>
            </div>
       
            {isLoading ? <Loader /> :  <button
              type="submit"
              className={`w-full py-2 rounded-md text-white  ${isLoading ? 'bg-gray cursor-not-allowed' : 'bg-red hover:bg-red'}`}
              style={{ backgroundColor: LoginBtnEnable ? '#E5E7EB' : '#EF4444', cursor: LoginBtnEnable ? 'not-allowed' : 'pointer' }}
              disabled={isLoading}
            >
              <span className="items-center justify-center">Login</span>
            </button>}
       
          </form>
        </FormProvider>
        <div className="mt-4">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-left text-sm">
            Dont have an account?{' '}
            <Link className="text-red hover:underline" href="/account" >
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
