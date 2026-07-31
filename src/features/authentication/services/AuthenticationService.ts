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
    await new Promise(resolve => setTimeout(resolve, 600));

    if (!credentials.email || !credentials.password) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Please enter both email address and password.'
      } as AuthError;
    }

    const cleanEmail = credentials.email.toLowerCase().trim();
    const users = this.getRegisteredUsers();
    const existing = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      if (existing.password && existing.password !== 'oauth_protected' && existing.password !== credentials.password) {
        throw {
          type: AuthErrorType.INVALID_LOGIN,
          message: 'Incorrect password. Please try again or use Forgot Password.'
        } as AuthError;
      }

      return {
        user: existing,
        token: 'nnp_jwt_token_' + Date.now(),
        refreshToken: 'nnp_refresh_token_' + Date.now()
      };
    }

    // Default system accounts
    if (cleanEmail === 'admin@nnp.com' && credentials.password === 'admin') {
      const adminUser = this.generateMockResponse('ADMIN', 'admin@nnp.com', 'NNP Admin').user;
      this.saveUser(adminUser, 'admin');
      return { user: adminUser, token: 'nnp_admin_token', refreshToken: 'nnp_admin_refresh' };
    }

    if (cleanEmail === 'user@nnp.com' && credentials.password === 'user') {
      const demoUser = this.generateMockResponse('BUSINESS_OWNER', 'user@nnp.com', 'Demo User').user;
      this.saveUser(demoUser, 'user');
      return { user: demoUser, token: 'nnp_demo_token', refreshToken: 'nnp_demo_refresh' };
    }

    // Dynamic login for returning accounts
    const formattedName = cleanEmail.split('@')[0].replace('.', ' ');
    const capitalName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    const newUser = this.generateMockResponse('CLIENT', cleanEmail, capitalName).user;
    this.saveUser(newUser, credentials.password);

    return {
      user: newUser,
      token: 'nnp_token_' + Date.now(),
      refreshToken: 'nnp_refresh_' + Date.now()
    };
  }

  public async register(data: any): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const cleanEmail = (data.email || '').toLowerCase().trim();
    if (!cleanEmail) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'A valid email address is required for registration.'
      } as AuthError;
    }

    const name = data.name || cleanEmail.split('@')[0];
    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: cleanEmail,
      role: 'CLIENT',
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

    this.saveUser(newUser, data.password);

    return {
      user: newUser,
      token: 'nnp_jwt_token_' + Date.now(),
      refreshToken: 'nnp_refresh_token_' + Date.now()
    };
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

  public async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  public async refresh(refreshToken: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.generateMockResponse('CLIENT');
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
