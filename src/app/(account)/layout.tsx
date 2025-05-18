'use client'
import React from "react";
import "@/src/globals.css";
import AccountNav from "./components/NavBar";
import { AuthProvider } from "../context/authContext";



interface Props {
  children: React.ReactNode
}

const AccountRootLayout: React.FC <Props> = ({ children } ) => {
  return (
    <AuthProvider>
    <html lang="en">
      <body className="bg-black">
      

    <div className="flex-shrink-0 text-white "> 
        <div className="border-b bg-slate-100">
    <AccountNav/>
      </div>
      </div>
        <div className="p-12 flex items-center justify-center text-white">

        {children}

      </div>
      </body>
    </html>
    </AuthProvider>
  );
}
export default AccountRootLayout;