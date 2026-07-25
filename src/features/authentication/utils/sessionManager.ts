/**
 * Session Manager (Frontend Only)
 * 
 * Handles token storage, retrieval, and auto-restore logic.
 * Ready to be connected to HTTP Only Cookies in V2.2.
 */
export const sessionManager = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nnp_auth_token', token);
      document.cookie = `nnp_auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nnp_auth_token');
    }
    return null;
  },

  setRefreshToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nnp_refresh_token', token);
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nnp_refresh_token');
    }
    return null;
  },

  clearSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nnp_auth_token');
      localStorage.removeItem('nnp_refresh_token');
      document.cookie = `nnp_auth_token=; path=/; max-age=0; SameSite=Lax`;
    }
  },

  isSessionValid: (expiryTimestamp: number | null): boolean => {
    if (!expiryTimestamp) return false;
    return Date.now() < expiryTimestamp;
  }
};
