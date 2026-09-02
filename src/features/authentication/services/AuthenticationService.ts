import { AuthProvider, AuthResponse } from '../providers/AuthProvider';
import { User, AuthError, AuthErrorType } from '../types';

/**
 * AuthenticationService
 * 
 * Centralized service to manage authentication flows.
 * Integrated with Next.js API routes and MongoDB backend.
 */
export class AuthenticationService {
  private static instance: AuthenticationService;
  
  private constructor() {}

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  public async login(credentials: any): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Please enter both email address and password.'
      } as AuthError;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email.toLowerCase().trim(), password: credentials.password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          type: AuthErrorType.INVALID_LOGIN,
          message: data.error?.message || 'Invalid email or password.'
        } as AuthError;
      }

      return {
        user: data.data.user,
        token: data.data.accessToken
      };
    } catch (error: any) {
      if (error.type === AuthErrorType.INVALID_LOGIN) throw error;
      throw {
        type: AuthErrorType.NETWORK_ERROR,
        message: 'Authentication service unavailable.'
      } as AuthError;
    }
  }

  public async register(data: any): Promise<AuthResponse> {
    const cleanEmail = (data.email || '').toLowerCase().trim();
    if (!cleanEmail || !data.password) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Valid email address and password are required for registration.'
      } as AuthError;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, name: data.name, password: data.password })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw {
          type: AuthErrorType.INVALID_LOGIN,
          message: resData.error?.message || 'Registration failed.'
        } as AuthError;
      }

      return {
        user: resData.data.user,
        token: resData.data.accessToken
      };
    } catch (error: any) {
      if (error.type === AuthErrorType.INVALID_LOGIN) throw error;
      throw {
        type: AuthErrorType.NETWORK_ERROR,
        message: 'Authentication service unavailable.'
      } as AuthError;
    }
  }

  public async logout(token?: string): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST'
      });
    } catch (e) {
      // Ignore network errors on logout
    }
  }

  public async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Refresh failed');
      
      return {
        user: data.data.user || null,
        token: data.data.accessToken
      };
    } catch (e) {
      throw { type: AuthErrorType.INVALID_LOGIN, message: 'Session expired' } as AuthError;
    }
  }

  public async verify(token: string): Promise<boolean> {
    // Relying on middleware for verification; this is just a stub for frontend state
    return !!token;
  }

  // --- Abstracted Features (Configuration Required) ---

  public async sendOtp(phone: string): Promise<boolean> {
    throw {
      type: AuthErrorType.NETWORK_ERROR,
      message: 'OTP Provider is not configured (CONFIGURATION REQUIRED)'
    } as AuthError;
  }

  public async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    throw {
      type: AuthErrorType.NETWORK_ERROR,
      message: 'OTP Provider is not configured (CONFIGURATION REQUIRED)'
    } as AuthError;
  }

  public async forgotPassword(email: string): Promise<boolean> {
    throw {
      type: AuthErrorType.NETWORK_ERROR,
      message: 'Email Provider is not configured (CONFIGURATION REQUIRED)'
    } as AuthError;
  }

  public async resetPassword(token: string, newPassword: string): Promise<boolean> {
    throw {
      type: AuthErrorType.NETWORK_ERROR,
      message: 'Email Provider is not configured (CONFIGURATION REQUIRED)'
    } as AuthError;
  }

  public async loginWithGoogle(): Promise<AuthResponse> {
    throw {
      type: AuthErrorType.NETWORK_ERROR,
      message: 'Google OAuth is not configured (CONFIGURATION REQUIRED)'
    } as AuthError;
  }

  public async loginWithGitHub(): Promise<AuthResponse> {
    throw {
      type: AuthErrorType.NETWORK_ERROR,
      message: 'GitHub OAuth is not configured (CONFIGURATION REQUIRED)'
    } as AuthError;
  }
}

export const authService = AuthenticationService.getInstance();
