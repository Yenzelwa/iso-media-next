'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import BrowsePage from './browse/page';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <>
      <BrowsePage />
    </>
  );
}
