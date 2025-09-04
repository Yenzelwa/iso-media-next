'use client'
import React from "react";
import "@/src/globals.css";
import { AuthProvider } from "../context/authContext";
import { Navigation } from "@/src/components/Navigation";



interface Props {
  children: React.ReactNode
}

const AccountRootLayout: React.FC <Props> = ({ children } ) => {
  return (
     <html lang="en">
      <body>
    <AuthProvider>
      <div className="bg-black">
      

    <div className="flex-shrink-0 text-white "> 
        <div className="border-b bg-slate-100">
    <Navigation/>
      </div>
      </div>
        <div className="p-12 flex items-center justify-center text-white">

        {children}

      </div>
      </div>
    </AuthProvider>
    </body>
    </html>
  );
}
export default AccountRootLayout;