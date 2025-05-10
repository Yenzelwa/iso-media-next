'use client'
import React from "react";
import "@/src/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import Link from "next/link";
import { BsGithub, BsTwitter } from "react-icons/bs";
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