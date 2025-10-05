'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next'; // Correct function for removing cookies
import { track } from '@/src/lib/obs/events';

// Define the shape of the context
interface AuthContextType {
  user: any;
  updateUser: any;
  token: string | null;
  login: (token: string, user: any) => void;
  logout: () => void;
  loading: boolean; 
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider to wrap your app components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if there's a token and user stored in cookies
  useEffect(() => {
    const storedToken = getCookie('auth_token') as string | null;
    const storedUser = getCookie('auth_user') as string | null;

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
     setLoading(false);
  }, []);

  // Idle auto-logout based on local preference (minutes)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getMinutes = () => {
      try {
        const v = localStorage.getItem('auto_logout_minutes');
        if (!v || v === 'never') return null;
        const n = Number(v);
        return Number.isFinite(n) && n > 0 ? n : 30;
      } catch {
        return 30;
      }
    };

    const resetTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      const mins = getMinutes();
      if (mins == null) return; // disabled
      idleTimerRef.current = setTimeout(() => {
        // Only auto-logout if user is logged in
        if (token) {
          track('auth.session.auto_logout');
          logout();
        }
      }, mins * 60 * 1000);
    };

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'keydown',
      'click',
      'scroll',
      'touchstart',
    ];

    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true } as any));
    resetTimer();
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [token]);
  
  const updateUser = (newUser: any) => {
    setUser(newUser);
    setCookie('auth_user', JSON.stringify(newUser), { maxAge: 60 * 60 * 24 * 7 });
  };

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
    <AuthContext.Provider value={{ user, updateUser, token, login, logout, loading }}>
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
