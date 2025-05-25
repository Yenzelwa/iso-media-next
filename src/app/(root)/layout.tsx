'use client'
import "../../globals.css";
import { AuthProvider } from "../context/authContext";
import React from 'react';
import { Navigation } from "@/src/components/NavBar";
import { Footer } from "@/src/components/Footer";
interface Props {
  children: React.ReactNode
}
const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider > {/* Wrap your app in AuthProvider */}
          <div className="flex flex-col h-screen justify-between">
            <Navigation />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
