'use client'
import React from 'react';
import Link from 'next/link';
import {Input} from '../../../../components/Input'
import {
  firstName_validation,  email_validation,  password_validation,  lastName_validation,
} from '../../../../utils/inputValidations'
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import axios from 'axios';
import * as https from 'https';


const CreateAccount = () =>{
  const router = useRouter();
  const methods = useForm()

  const onSubmit = methods.handleSubmit(async (data) => {
    const response = await axios.post("https://localhost:7263/api/Account/register", {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email_address,
      password: data.password,
      status:'pending'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
     httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
  debugger;
    if (response.status == 200 && response.data) {
      debugger;
      const result = await signIn('credentials', {
        redirect: false, 
        email: data.email_address, 
        password: data.password 
      });
      if (result?.ok) {
        router.push('/plan-selection');
      } else {
     //  setError(null)
      }
    } else {
      console.error('Registration failed');
    }

  });
    return (
   <FormProvider {...methods}>
    <form
     onSubmit={e => e.preventDefault()}
     noValidate
     autoComplete="off"
     className="container">
    <div className="p-6 bg-dark rounded-lg  shadow-md max-w-md">
        <h1 className="font-bold text-2xl mb-4">1 of 3 steps</h1>
        <h2 className="font-bold text-3xl">Create Account</h2>
        <div className="grid grid-cols-2 text-black  gap-4 mt-4">
            <Input {...firstName_validation} />         
             <Input {...lastName_validation} />
          </div>
          <div className="text-black">
         <Input {...email_validation} />
        <Input {...password_validation}        
            />
          </div>
        <label className="text-left mt-4 flex items-center">
          <input type="checkbox" className="mr-2" />
          Yes, sign me up for emails about IsolaKwaMUNTU's latest releases and news.
        </label>
        <label className="text-left mt-2 flex items-center">
          <input type="checkbox" className="mr-2" />
          <span className="text-left text-sm"> To create an account, you must agree to the 
          <Link  className="text-red hover:underline" href="/terms-privacy" target="_blank"> Terms of Use and Privacy Policy
            </Link> by checking this box.</span>
        </label>
        <div className='py-8'>
        <button 
         onClick={onSubmit}
            className="bg-red text-white items-center px-20 py-2 hover:bg-red-600 rounded-md"
          >
            Continue
          </button>
        </div>
       
      </div>
    </form>
   </FormProvider>
 
          );
        };
        
export default CreateAccount;


