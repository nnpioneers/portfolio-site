import { AuthProvider, AuthResponse } from '../providers/AuthProvider';
import { User, AuthError, AuthErrorType } from '../types';

/**
 * AuthenticationService
 * 
 * Centralized service to manage authentication flows.
 * Currently uses mocked logic. Ready for V2.2 backend integration.
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

  private getRegisteredUsers(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('nnp_registered_users');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  private saveUser(user: User, password?: string) {
    if (typeof window === 'undefined') return;
    try {
      const users = this.getRegisteredUsers();
      const existingIdx = users.findIndex((u: any) => u.email.toLowerCase() === user.email.toLowerCase());
      const userData = { ...user, password: password || 'oauth_protected' };
      if (existingIdx >= 0) {
        users[existingIdx] = userData;
      } else {
        users.push(userData);
      }
      localStorage.setItem('nnp_registered_users', JSON.stringify(users));
    } catch (e) {}
  }

  public async login(credentials: any): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Please enter both email address and password.'
      } as AuthError;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email.toLowerCase().trim(), password: credentials.password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          type: AuthErrorType.INVALID_LOGIN,
          message: data.message || 'Invalid email or password.'
        } as AuthError;
      }

      return {
        user: data.data.user,
        token: data.data.accessToken,
        refreshToken: data.data.refreshToken
      };
    } catch (error: any) {
      if (error.type === AuthErrorType.INVALID_LOGIN) throw error;
      throw {
        type: AuthErrorType.SYSTEM_ERROR,
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
      const response = await fetch('http://localhost:4000/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, name: data.name, password: data.password })
      });

      const resData = await response.json();

      if (!response.ok) {
        throw {
          type: AuthErrorType.INVALID_LOGIN,
          message: resData.message || 'Registration failed.'
        } as AuthError;
      }

      return {
        user: resData.data.user,
        token: resData.data.accessToken,
        refreshToken: resData.data.refreshToken
      };
    } catch (error: any) {
      if (error.type === AuthErrorType.INVALID_LOGIN) throw error;
      throw {
        type: AuthErrorType.SYSTEM_ERROR,
        message: 'Authentication service unavailable.'
      } as AuthError;
    }
  }

  public async sendOtp(phone: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return true;
  }

  public async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 600));
    if (code !== '123456' && code.length !== 6) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Invalid 6-digit OTP code.'
      } as AuthError;
    }
    const email = `user_${phone.replace(/\D/g, '').slice(-4)}@nnp.com`;
    const name = `Mobile User (${phone})`;

    const users = this.getRegisteredUsers();
    let user = users.find((u: any) => u.email === email);
    if (!user) {
      user = this.generateMockResponse('CLIENT', email, name).user;
      this.saveUser(user, 'otp_protected');
    }

    return {
      user: user,
      token: 'nnp_otp_token_' + Date.now(),
      refreshToken: 'nnp_otp_refresh_' + Date.now()
    };
  }

  public async logout(token?: string): Promise<void> {
    if (!token) return;
    try {
      await fetch('http://localhost:4000/api/v1/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {
      // Ignore network errors on logout
    }
  }

  public async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      const data = await response.json();
      if (!response.ok) throw new Error('Refresh failed');
      
      // We are not passing full user data in refresh (the backend just sends tokens),
      // but if the backend does send the user, we return it. Otherwise we rely on the existing user state.
      return {
        user: data.data.user || null,
        token: data.data.accessToken,
        refreshToken: data.data.refreshToken || refreshToken
      };
    } catch (e) {
      throw { type: AuthErrorType.INVALID_LOGIN, message: 'Session expired' } as AuthError;
    }
  }

  public async verify(token: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return !!token;
  }

  public async forgotPassword(email: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return true;
  }

  public async resetPassword(token: string, newPassword: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return true;
  }

  public async loginWithGoogle(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1089234407844-3q7d066u5f0p5vh2g5a8e0qj0d0j0e0a.apps.googleusercontent.com';

      const loadGsiScript = (): Promise<void> => {
        return new Promise((res, rej) => {
          if ((window as any).google?.accounts?.oauth2) {
            res();
            return;
          }
          const existingScript = document.getElementById('google-gsi-script');
          if (existingScript) {
            existingScript.onload = () => res();
            return;
          }
          const script = document.createElement('script');
          script.id = 'google-gsi-script';
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          script.onload = () => res();
          script.onerror = () => rej(new Error('Failed to load Google Sign-In SDK'));
          document.body.appendChild(script);
        });
      };

      loadGsiScript()
        .then(() => {
          try {
            const client = (window as any).google.accounts.oauth2.initTokenClient({
              client_id: clientId,
              scope: 'openid email profile',
              prompt: 'select_account',
              callback: async (tokenResponse: any) => {
                if (!tokenResponse || tokenResponse.error) {
                  reject({
                    type: AuthErrorType.INVALID_LOGIN,
                    message: tokenResponse?.error_description || 'Google authentication was cancelled or blocked'
                  });
                  return;
                }

                try {
                  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                  });

                  if (!response.ok) {
                    throw new Error('Failed to retrieve user profile from Google');
                  }

                  const googleProfile = await response.json();
                  if (!googleProfile.email || !googleProfile.name) {
                    throw new Error('Incomplete profile data received from Google');
                  }

                  const users = this.getRegisteredUsers();
                  let authUser = users.find((u: any) => u.email.toLowerCase() === googleProfile.email.toLowerCase());

                  if (!authUser) {
                    // Automatically register new Google user
                    authUser = {
                      id: 'google_' + (googleProfile.sub || Date.now()),
                      name: googleProfile.name,
                      email: googleProfile.email.toLowerCase(),
                      avatar: googleProfile.picture || undefined,
                      role: 'CLIENT',
                      status: 'ACTIVE',
                      createdDate: new Date().toISOString(),
                      preferences: {
                        language: googleProfile.locale || 'en',
                        theme: 'dark',
                        notificationsEnabled: true
                      },
                      businessCount: 1,
                      projectCount: 3,
                      subscription: 'PRO'
                    };
                    this.saveUser(authUser, 'google_oauth');
                  } else {
                    // Update avatar if available
                    if (googleProfile.picture) authUser.avatar = googleProfile.picture;
                    this.saveUser(authUser);
                  }

                  resolve({
                    user: authUser,
                    token: tokenResponse.access_token,
                    refreshToken: 'g_refresh_' + Date.now()
                  });
                } catch (err: any) {
                  reject({
                    type: AuthErrorType.INVALID_LOGIN,
                    message: err.message || 'Failed to authenticate Google user'
                  });
                }
              },
              onerror: (err: any) => {
                reject({
                  type: AuthErrorType.INVALID_LOGIN,
                  message: 'Google Sign-In Account Picker encountered an error.'
                });
              }
            });

            client.requestAccessToken({ prompt: 'select_account' });
          } catch (e: any) {
            reject({
              type: AuthErrorType.INVALID_LOGIN,
              message: 'Google Sign-In initialization failed.'
            });
          }
        })
        .catch(() => {
          reject({
            type: AuthErrorType.INVALID_LOGIN,
            message: 'Unable to connect to Google Authentication services.'
          });
        });
    });
  }

  public async loginWithGitHub(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = this.generateMockResponse('CLIENT', 'dev.user@nnp.com', 'GitHub Developer').user;
    this.saveUser(user, 'github_oauth');
    return { user, token: 'gh_token_' + Date.now(), refreshToken: 'gh_refresh_' + Date.now() };
  }

  private generateMockResponse(role: string, email = 'user@nnp.com', name = 'Demo User'): AuthResponse {
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: role === 'ADMIN' ? 'NNP Admin' : name,
      email: email,
      role: role as any,
      status: 'ACTIVE',
      createdDate: new Date().toISOString(),
      preferences: {
        language: 'en',
        theme: 'dark',
        notificationsEnabled: true
      },
      businessCount: 1,
      projectCount: 3,
      subscription: 'PRO'
    };

    return {
      user: mockUser,
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now()
    };
  }
}

export const authService = AuthenticationService.getInstance();
