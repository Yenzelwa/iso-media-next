'use client'
import "../../globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import type { Metadata } from "next";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth'
interface Props {
  session: Session | null
  children: React.ReactNode
}

const RootLayout: React.FC <Props> = ({ children, session } ) => {
  return (
    <html lang="en">
      <body>
      <SessionProvider session={session}>
        <div className="flex flex-col h-screen justify-between">
          <NavBar />
          {children}
          <Footer/>
        </div>
        </SessionProvider>
      </body>
    </html>
  );
}
export default RootLayout;
