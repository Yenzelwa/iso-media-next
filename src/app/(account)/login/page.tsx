'use client'
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  type FormData = {
    email: string,
    password: string
  }

  return (

    <div className="flex flex-col items-center justify-center">
      <div className="bg-dark p-12 rounded-lg shadow-md max-w-md">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form   onSubmit={handleSubmit(async ({ email, password }) =>  {
          debugger;
        const result =   await signIn('credentials', {
            redirect: false, // Do not redirect on the NextAuth side
            email: email, // Or another unique identifier for your user
            password: password // If your API provides a session token or similar
          });
          debugger;
          if (result?.ok) {
            router.push('/');
          }
        })}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray rounded-lg"
              placeholder="Enter your email"
              {...register('email', { required: 'Username is required', pattern: { value: /^\S+@\S+$/i, message: "This is not a valid email" } })}
            />
            <p className="text-red">{errors.email?.message}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              {...register('password', {
                required: 'The password required',
                minLength: {
                  value: 6,
                  message: "Password must be more tha 4 characters"
                }
              })}
            />
            <p className="text-red">{errors.password?.message}</p>
          </div>
          <button 
            type="submit"
            className="w-full bg-red text-white py-2 rounded-md hover:bg-red-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <Link href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-left text-sm">
            Don't have an account?{' '}
            <button className="text-red hover:underline" >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>

  );
}

export default Login;