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
import Loader from '@/src/components/Loader';
import Cookies from 'js-cookie';
import { User as NextAuthUser } from "next-auth";

const CreateAccount = () => {
  const router = useRouter();
  const methods = useForm();
  const { formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [showSessionOpt, setShowSessionOpt] = useState(false);

  type FormData = {
    email: string;
    password: string;
  };
  
  interface CustomUser extends NextAuthUser {
  id: string; // Ensure ID is a string to match next-auth's expected type
  subscriptionPlan: {
    id: number;
    name: string;
  };
  status: string;
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

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //       setShowSessionOpt(true);
      
  //   }
  // }, [status]);

  useEffect(() => {
    const isFormValid = methods.formState.isValid;
    setLoginBtnEnable(!isFormValid);
  }, [methods.formState.isValid]);

  const onSubmit = methods.handleSubmit(async (data) => {
    setIsLoading(true);
    debugger;
    const userProfile = {
      token:"dsjdhsds63842fn3586436%77434",
      profile:{
        firstname:data.first_name,
        lastname:data.lastname,
        email:data.email,
        plan : {
          id:1,
          name:"Monthly"
        },
        status:"Pending"
      }
    };
    debugger;
    const profile = JSON.stringify(userProfile.profile);
    const user: CustomUser = {
      id: '1', // Ensure ID is a string
      name: data.first_name,
      email: data.email,
      subscriptionPlan: {
        id: 1,
        name: "Monthly"
      },
      status: "Pending"
    };
  //  Cookies.set('userProfile', JSON.stringify(user), { expires: 7 });
    Cookies.set('userProfile', profile, { expires: 7 });
    setIsLoading(false);
    router.push('/plan-selection');
    // const response = await axios.post(
    //   'https://yenzelwa.github.io/IsolakwamuNTU.WebAPI/api/Account/register',
    //   {
    //     firstName: data.first_name,
    //     lastName: data.last_name,
    //     email: data.email_address,
    //     password: data.password,
    //     plan: {
    //       id: 1,
    //       name: 'test',
    //     },
    //     status: 'pending',
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    //   }
    // );
    // if (response.status === 200 && response.data) {
    //   debugger;
    //   const userProfile = response.data;
    //   const profile = JSON.stringify(userProfile.profile);
    //   Cookies.set('userProfile', profile, { expires: 7 });
    //   setIsLoading(false);
    //  await signIn("credentials", {
    //     redirect: false,
    //     email: data.email,
    //     password: data.password,
    //   });
    //     router.push('/plan-selection');
    

      
    // } else {
    //   setRegisterError(response && response?.data);
    // }
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {showSessionOpt ? (
        session && session?.user && session.user.name ? (
          <form className="container">
            <div className="p-6 bg-dark rounded-lg shadow-md max-w-md">
              <p className="text-gray-500">STEP 1 OF 3</p>
              <h1 className="text-2xl font-bold mb-4">Account created</h1>
              <h3 className="text-lg text-gray mb-6">
                use below email to log in
              </h3>
              <div className="grid grid-cols-2 text-black gap-4 mt-4">
                {session && session.user && session.user.email}
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
        ) : null
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
              <div className="grid grid-cols-2 text-black gap-4 mt-4">
                <Input {...firstName_validation} />
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
                  <Loader />
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
