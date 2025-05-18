'use client'
import "../../globals.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { AuthProvider } from "../context/authContext";
import React from 'react';
interface Props {
  children: React.ReactNode
}
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
