'use client';

import "../../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/authContext";
import React from "react";
import { Footer } from "@/src/components/Footer";
import { Toaster } from "@/src/components/ui/sooner";
import { Sonner } from "@/src/components/ui/sooner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Navigation } from "@/src/components/Navigation";

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
