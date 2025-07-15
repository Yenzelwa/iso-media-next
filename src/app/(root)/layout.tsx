'use client';

import "../../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import React from "react";
import { Navigation } from "@/src/components/NavBar";
import { Footer } from "@/src/components/Footer";
import { Toaster } from "@/src/components/ui/sooner";
import { Sonner } from "@/src/components/ui/sooner";
import AccountSettings from "./profile/page";
import NotFound from "./not-found";
import { TooltipProvider } from "@/src/components/ui/tooltip";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthProvider>
              <div className="flex flex-col h-screen justify-between">
                <Navigation />
                {/* <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<AccountSettings />} />
                    <Route path="/account-settings" element={<AccountSettings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter> */}
                {children}
                <Footer />
              </div>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
