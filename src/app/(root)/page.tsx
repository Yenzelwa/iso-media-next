'use client'
import Image from 'next/image'
import BrowsePage from './browse/page'
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
export default async function Home() {

  const { user } = useAuth();
  const router = useRouter();
     const [userCookie, setUserCookie] = useState<any>(null);
        useEffect(() => {
          const userCookie = Cookies.get("userProfile");
          if (userCookie) {
            setUserCookie(userCookie)
          }
        }, [userCookie]);
  if(!user){
    router.push('/login')
  }
  return (
    <>
   <BrowsePage /> 
   {/* tet */}
    </>
  )
}
 