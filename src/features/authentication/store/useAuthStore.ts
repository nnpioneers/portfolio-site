import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  sessionExpiry: number | null;
  loading: boolean;
  
  // Actions
  login: (user: User, token: string, refreshToken?: string) => void;
  logout: () => void;
  setGuestMode: (isGuest: boolean) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isGuest: false,
      user: null,
      token: null,
      refreshToken: null,
      sessionExpiry: null,
      loading: false,

      login: (user, token, refreshToken) => {
        const { sessionManager } = require('../utils/sessionManager');
        sessionManager.setToken(token);
        if (refreshToken) sessionManager.setRefreshToken(refreshToken);
        
        set({
          isAuthenticated: true,
          isGuest: false,
          user,
          token,
          refreshToken: refreshToken || null,
          sessionExpiry: Date.now() + 1000 * 60 * 60 * 24 // 24 hours mock
        });
      },

      logout: () => {
        const { sessionManager } = require('../utils/sessionManager');
        sessionManager.clearSession();
        set({
          isAuthenticated: false,
          isGuest: false,
          user: null,
          token: null,
          refreshToken: null,
          sessionExpiry: null
        });
      },

      setGuestMode: (isGuest) => set({
        isGuest,
        isAuthenticated: false,
        user: null,
        token: null
      }),

      setLoading: (loading) => set({ loading }),

      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      }))
    }),
    {
      name: 'nnp-auth-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        isGuest: state.isGuest,
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        sessionExpiry: state.sessionExpiry
      }), // only persist these fields
    }
  )
);
