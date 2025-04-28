'use client'
import "../../globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'// Ensure correct path
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { AuthProvider } from "../context/authContext";
import { Props } from "next/script";
import React from 'react';
const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider > {/* Wrap your app in AuthProvider */}
          <div className="flex flex-col h-screen justify-between">
            <NavBar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

export default RootLayout;
