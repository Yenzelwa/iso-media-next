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
    <div className="flex flex-col items-center justify-center">
      {user ? (
         (
          <form className="container">
            <div className="p-6 bg-dark rounded-lg shadow-md max-w-md">
              <p className="text-gray-500">STEP 1 OF 3</p>
              <h1 className="text-2xl font-bold mb-4">Account created</h1>
              <h3 className="text-lg text-gray mb-6">
                use below email to log in
              </h3>
              <div className="grid grid-cols-2 text-black gap-4 mt-4">
                {user && user.email}
              </div>
              <div className="py-8">
                <a
                  href="/plan-selection"
                  className="w-full py-2 rounded-md text-white bg-red hover:bg-red"
                  style={{ backgroundColor: '#EF4444', cursor: 'pointer' }}
                >
                  <span className="items-center justify-center">Continue</span>
                </a>
              </div>
            </div>
          </form>
        )
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={(e) => e.preventDefault()}
            noValidate
            autoComplete="off"
            className="container"
          >
            <div className="p-6 bg-dark rounded-lg shadow-md max-w-md">
              <p className="text-gray-500">STEP 1 OF 3</p>
              <h1 className="text-2xl font-bold mb-4">
                Confirm your account details
              </h1>
              <h3 className="text-lg text-gray mb-6">
                IsolakwaMUNTU is committed to give you all you need to awaken
                your inner child.
              </h3>
              <p
                className={`text-red ${
                  errorMessage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorMessage}
              </p>
              <div className="text-black">
                <Input {...firstName_validation} />
              </div>
              <div className="text-black">
                <Input {...email_validation} />
              </div>
              <div className="text-black">
                <Input {...password_register_validation} />
              </div>
              <label className="text-left mt-2 flex items-center">
                <Input {...termsAndConditions_validation} />
                <span className="text-left text-sm">
                  To create an account, you must agree to the
                  <a
                    className="text-red hover:underline"
                    href="/terms-privacy"
                    target="_blank"
                  >
                    {' '}
                    Terms of Use and Privacy Policy
                  </a>{' '}
                  by checking this box.
                </span>
              </label>
              <label className="text-left mt-4 flex items-center">
                <input type="checkbox" className="mr-2" />
                Yes, sign me up for emails about IsolaKwaMUNTUs latest
                releases and news.
              </label>
              <div className="py-8">
                {isLoading ? (
                  <p>loading</p>
                ) : (
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className={`w-full py-2 rounded-md text-white ${
                      isLoading
                        ? 'bg-gray cursor-not-allowed'
                        : 'bg-red hover:bg-red'
                    }`}
                    style={{
                      backgroundColor: LoginBtnEnable
                        ? '#E5E7EB'
                        : '#EF4444',
                      cursor: LoginBtnEnable ? 'not-allowed' : 'pointer',
                    }}
                    disabled={isLoading}
                  >
                    <span className="items-center justify-center">
                      Continue
                    </span>
                  </button>
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default CreateAccount;
