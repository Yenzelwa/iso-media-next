'use client'
import "@/src/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/src/components/Input";
import { email_validation, password_validation } from "@/src/utils/inputValidations";
import Loader from "@/src/components/Loader";


function Login() {
  const methods = useForm()
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
  const [loginError, setLoginError] = useState('');
  const [LoginBtnEnable, setLoginBtnEnable] = useState(true);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(loginError);
  const [isLoading, setIsLoading] = useState(false);

  type FormData = {
    email: string,
    password: string
  }

  useEffect(() => {
    if (loginError) {
      setErrorMessage(loginError);
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);

  useEffect(() => {
    const isFormValid = methods.formState.isValid;
    setLoginBtnEnable(!isFormValid);
  }, [methods.formState.isValid]);
  return (

    <div className="flex flex-col items-center justify-center">
      <div className="bg-dark p-12 rounded-lg shadow-md max-w-md">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(async ({ email, password }) => {
            setIsLoading(true);
            const result = await signIn('credentials', {
              redirect: false,
              email: email,
              password: password
            });
            setIsLoading(false);
            if (result && result?.ok) {
              router.push('/');
            }
            else {
              setLoginError(result && result?.error ? "Invalid credentials. " : "Error has occurred")
            }
          })}>
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
            Don't have an account?{' '}
            <Link className="text-red hover:underline" href="/account" >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
}

export default Login;