'use client'
import React from 'react';
import Link from 'next/link';
import {Input} from '../../../../components/Input'
import {
  firstName_validation,
  desc_validation,
  email_validation,
  num_validation,
  password_validation,
  lastName_validation,
} from '../../../../utils/inputValidations'
import { FormProvider, useForm } from 'react-hook-form';
import { data } from 'autoprefixer';


const CreateAccount = () =>{
  const methods = useForm()

  const onSubmit = methods.handleSubmit(data =>{
    console.log(data);
  })
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
        {/* <div className="flex space-x-4 mt-4">
          <p className="text-left text-sm">
            Already have an account?{' '}
            <Link  className="text-red hover:underline" href="/login">
              Log In
            </Link>
          </p>
          
        </div> */}
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