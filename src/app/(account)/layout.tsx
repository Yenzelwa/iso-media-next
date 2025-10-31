'use client'
import React from "react";
import "@/src/globals.css";
import { AuthProvider } from "../context/authContext";
import { Navigation } from "@/src/components/Navigation";
import { themeClasses } from "@/src/lib/theme";
import { usePathname } from "next/navigation";



interface Props {
  children: React.ReactNode
}

const AccountRootLayout: React.FC <Props> = ({ children } ) => {
  

  return (
     <html lang="en">
      <body>
    <AuthProvider>
      <div className={themeClasses.pageBackground()}>
      

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
