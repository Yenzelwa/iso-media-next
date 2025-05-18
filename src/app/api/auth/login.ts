import axios from 'axios';
import Cookies from 'js-cookie';
import type { NextApiRequest, NextApiResponse } from 'next'
import { signIn } from 'next-auth/react'
import router from 'next/router';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure the request body is properly parsed and contains email and password
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    // Call signIn function
   
      const response = await axios.post(
        'http://172.24.74.185:4000/profile/login',
        {
          email: email,
          password: password,
          status: 'pending'
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true 
        }
      );
  debugger
      // Ensure the response is received correctly
      if (response.status === 200 && response.data) {
        const userProfile = response.data;
        const profile = JSON.stringify(userProfile);
        Cookies.set('auth_user', profile, { expires: 7 });
  
        // Redirect after successful registration
        // await signIn("credentials", {
        //   redirect: false,
        //   email: data.email,
        //   password: data.password,
        // });
  
        // Navigate to the next page
        router.push('/plan-selection');
      } 

    // If result is null or unsuccessful, handle the failure
    else {
      return res.status(401).json({ error: 'Invalid credentials.' })
    }
  } catch (error) {
    console.error('Error during signIn API request:', error)
    return res.status(500).json({ error: 'Something went wrong.' })
  }
}
