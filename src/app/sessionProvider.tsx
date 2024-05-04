'use client';
import React from 'react'

import { SessionProvider as AuthSessionProvider } from 'next-auth/react';

type Props = {
  children?: React.ReactNode;
};

const SessionProvider = ({children}: Props) => {
  return (
    <AuthSessionProvider>{children}</AuthSessionProvider>
  )
}

export default SessionProvider