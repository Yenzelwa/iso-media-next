'use client'
import "@/src/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { BsGithub, BsTwitter } from "react-icons/bs";
import AccountNav from "./components/NavBar";
import { Session } from "next-auth";



interface Props {
  session: Session | null
  children: React.ReactNode
}

const AccountRootLayout: React.FC <Props> = ({ children, session } ) => {
  return (
    <html lang="en">
           <SessionProvider session={session}>
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
      </SessionProvider>
    </html>
  );
}
export default AccountRootLayout;