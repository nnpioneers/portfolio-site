'use client';

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { User, UserRole } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: User | null;
  loading: boolean;
  role: UserRole | 'GUEST';
  login: (user: User, token: string) => void;
  logout: () => void;
  setGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const store = useAuthStore();

  // Handle auto-restore / expiry logic here if needed
  useEffect(() => {
    store.setLoading(true);
    // Simulate initial check
    if (store.sessionExpiry && Date.now() > store.sessionExpiry) {
      store.logout();
    }
    store.setLoading(false);
  }, []);

  const value: AuthContextType = {
    isAuthenticated: store.isAuthenticated,
    isGuest: store.isGuest,
    user: store.user,
    loading: store.loading,
    role: store.user?.role || (store.isGuest ? 'GUEST' : 'GUEST'),
    login: store.login,
    logout: store.logout,
    setGuestMode: () => store.setGuestMode(true)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
