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
  const pathname = usePathname();
  const hideNavRoutes = new Set(["/plan-selection", "/payment"]);
  const showNavigation = !hideNavRoutes.has(pathname ?? "");

  return (
     <html lang="en">
      <body>
    <AuthProvider>
      <div className={themeClasses.pageBackground()}>
      

    {showNavigation && (
      <div className="flex-shrink-0 text-white "> 
          <div className="border-b bg-slate-100">
      <Navigation/>
        </div>
        </div>
    )}
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
