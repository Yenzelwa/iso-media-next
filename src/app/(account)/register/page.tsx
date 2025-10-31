'use client'
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import { UserMenu } from '@/src/components/UserMenu';
import { AccountNav } from '@/src/components/AccountNav';
import { Input } from '@/src/components/Input';
import { email_validation, firstName_validation, password_register_validation, termsAndConditions_validation } from '@/src/utils/inputValidations';
import { useRouter } from 'next/navigation';
import { themeClasses } from '@/src/lib/theme';
import { trackEvent, trackError } from '@/src/lib/obs';

type FormData = {
  first_name: string;
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  const methods = useForm<FormData>();
  const { formState: { errors } } = methods;
  const [isLoading, setIsLoading] = useState(false);
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const { login, user } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const isFormValid = methods.formState.isValid;
    setLoginBtnEnable(!isFormValid);
  }, [methods.formState.isValid]);

  const onSubmit = methods.handleSubmit(async (data: FormData) => {
    setIsLoading(true);
    try {
      trackEvent('register.submit.start', { email: data.email });
      // Mock API call structure (commented for demo)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.first_name,
          email: data.email,
          password: data.password
        }),
      });
      if(response.ok){
      const authData = await response.json();
      const token = authData.access_token;
      login(token, authData.user)
      trackEvent('register.submit.success', { email: data.email });
      router.push('plan-selection')
    
      }
      else
      {
        const error = await response.json();
        const msg = typeof error === 'string' ? error : (error?.message || 'Something went wrong. Please try again.');
        setErrorMessage(msg);
        trackError('register.submit.failure', { code: 'server_error', message: msg })
      }

    } catch  {
      setErrorMessage('Something went wrong');
      trackError('register.submit.exception', { reason: 'network_error' })
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] py-8 overflow-x-hidden text-white">

      <AccountNav step="account" />

    

      {/* Content */}
      <div className="relative z-10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] border border-gray-700/50 max-w-lg  mx-4 transform transition-all duration-700 hover:shadow-[0_25px_50px_rgba(239,68,68,0.15)] hover:border-red-500/30 mt-14">
 {user ? (
            <div className="container">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-green-500/30 animate-pulse">
                    <CheckCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Welcome Aboard!
                  </h1>
                  <h3 className="text-lg text-gray-300 mb-4">
                    Your account has been created successfully
                  </h3>
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Account verified and ready</span>
                  </div>
                </div>
                <div className="text-white font-medium mb-8 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  {user && user.email}
                </div>
                <Link
                  href="/plan-selection"
                  className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-2xl inline-flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-[0_8px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_35px_rgba(239,68,68,0.6)] font-semibold text-lg w-full justify-center"
                >
                  <span>Continue to Plan Selection</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-colors duration-300"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                </Link>
              </div>
            </div>
          ) : (
           
            <FormProvider {...methods}>
              <form
                onSubmit={onSubmit}
                noValidate
                autoComplete="off"
                className="w-full max-w-md mx-auto px-4"
              >
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-red-500/20 backdrop-blur-sm border border-red-500/30">
                    <CheckCircle className="w-12 h-12 text-red-400 drop-shadow-lg" />
                  </div>
                </div>

                <div className="text-center mb-8">
              
                   <p className="text-gray-300 text-sm font-medium tracking-wide">
             Join our community and start your streaming journey
          </p>
                </div>
                {errorMessage && (
                  <p
                    role="alert"
                    aria-live="polite"
                    className="text-red-400 mb-6 transition-all duration-300 text-center bg-red-500/10 border border-red-500/30 rounded-xl p-3 font-medium"
                  >
                    {errorMessage}
                  </p>
                )}
                <div className="space-y-6">
                  <div className="text-white">
                    <Input {...firstName_validation} hideLabel />
                  </div>
                  <div className="text-white">
                    <Input {...email_validation} hideLabel />
                  </div>
                  <div className="text-white">
                    <Input {...password_register_validation} hideLabel />
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                    <label className="flex items-start space-x-4 text-gray-300 cursor-pointer group">
                      <div className="mt-1 flex-shrink-0">
                        <Input {...termsAndConditions_validation} />
                      </div>
                      <div className="text-sm leading-relaxed">
                        <p className="mb-2 font-medium text-gray-200 group-hover:text-white transition-colors duration-200">
                          Terms & Conditions Agreement
                        </p>
                        <p>
                          I agree to the{' '}
                          <a
                            className="text-red-400 hover:text-red-400 font-medium hover:underline transition-colors duration-200"
                            href="/terms-conditions"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Terms of Use and Privacy Policy
                          </a>
                          {' '}and acknowledge that I have read and understood them.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-4">
                    <label className="flex items-start space-x-4 text-gray-300 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-600 text-red-400 focus:ring-red-400 focus:ring-offset-0 focus:ring-2 mt-1 bg-gray-800 hover:border-red-400/50 transition-colors duration-200" 
                      />
                      <div className="text-sm leading-relaxed">
                        <p className="font-medium text-gray-200 group-hover:text-white transition-colors duration-200 mb-1">
                          Marketing Communications (Optional)
                        </p>
                        <p>
                          Yes, I would like to receive emails about IsolaKwaMUNTU's latest
                          releases, exclusive content, and news updates.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  {isLoading ? (
                    <div className="flex justify-center">
                      <div aria-label="status" className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className={`group relative w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-500 transform overflow-hidden inline-flex items-center justify-center space-x-3 ${
                        LoginBtnEnable
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-[0_8px_25px_rgba(239,68,68,0.4)] hover:shadow-[0_12px_35px_rgba(239,68,68,0.6)] hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                      disabled={LoginBtnEnable || isLoading}
                    >
                      <span>Create Account</span>
                      {!LoginBtnEnable && (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                      
                      {!LoginBtnEnable && (
                        <>
                          {/* Animated border */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-colors duration-300"></div>
                          
                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-red-400 hover:text-red-300 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </FormProvider>
           
          )}
        </div>
      </div>
   
  );
};

export default Register;
