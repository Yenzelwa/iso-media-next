'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next'; // Correct function for removing cookies

// Define the shape of the context
interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider to wrap your app components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check if there's a token and user stored in cookies
  useEffect(() => {
    const storedToken = getCookie('auth_token') as string | null;
    const storedUser = getCookie('auth_user') as string | null;

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, user: any) => {
    setUser(user);
    setToken(token);

    // Save user and token in cookies with 7 days expiration
    setCookie('auth_token', token, { maxAge: 60 * 60 * 24 * 7 });
    setCookie('auth_user', JSON.stringify(user), { maxAge: 60 * 60 * 24 * 7 });
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Remove the cookies using deleteCookie
    deleteCookie('auth_token');
    deleteCookie('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
