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

  public async login(credentials: any): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!credentials.email || !credentials.password) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Please provide both email and password'
      } as AuthError;
    }

    // Default admin / user credentials or dynamic email login
    const isOwner = credentials.email.toLowerCase().includes('admin') || credentials.email === 'admin@nnp.com';
    const name = credentials.email.split('@')[0].replace('.', ' ');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    return this.generateMockResponse(isOwner ? 'ADMIN' : 'CLIENT', credentials.email, formattedName);
  }

  public async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 400));
  }

  public async register(data: any): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const email = data.email || 'newuser@nnp.com';
    const name = email.split('@')[0];
    return this.generateMockResponse('CLIENT', email, name);
  }

  public async sendOtp(phone: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  public async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (code !== '123456' && code.length !== 6) {
      throw {
        type: AuthErrorType.INVALID_LOGIN,
        message: 'Invalid 6-digit OTP code'
      } as AuthError;
    }
    return this.generateMockResponse('CLIENT', `user_${phone.slice(-4)}@nnp.com`, `Mobile User (${phone})`);
  }

  public async refresh(refreshToken: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return this.generateMockResponse('CLIENT');
  }

  public async verify(token: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return !!token;
  }

  public async forgotPassword(email: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  public async resetPassword(token: string, newPassword: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }

  public async loginWithGoogle(): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      // Configured Google OAuth Client ID or environment variable
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
                    message: tokenResponse?.error_description || 'Google authentication was cancelled or failed'
                  });
                  return;
                }

                try {
                  // Fetch authenticated user's actual Google profile info
                  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                  });

                  if (!response.ok) {
                    throw new Error('Failed to fetch profile information from Google');
                  }

                  const googleProfile = await response.json();

                  if (!googleProfile.email || !googleProfile.name) {
                    throw new Error('No profile data received from Google account');
                  }

                  const authUser: User = {
                    id: 'google_' + (googleProfile.sub || Date.now()),
                    name: googleProfile.name,
                    email: googleProfile.email,
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

                  resolve({
                    user: authUser,
                    token: tokenResponse.access_token,
                    refreshToken: 'g_refresh_' + Date.now()
                  });
                } catch (err: any) {
                  reject({
                    type: AuthErrorType.INVALID_LOGIN,
                    message: err.message || 'Failed to authenticate Google user profile'
                  });
                }
              },
              onerror: () => {
                this.openGoogleOAuthPopup(clientId).then(resolve).catch(reject);
              }
            });

            // Prompt native Google Account Picker immediately
            client.requestAccessToken({ prompt: 'select_account' });
          } catch (e: any) {
            this.openGoogleOAuthPopup(clientId).then(resolve).catch(reject);
          }
        })
        .catch(() => {
          this.openGoogleOAuthPopup(clientId).then(resolve).catch(reject);
        });
    });
  }

  private openGoogleOAuthPopup(clientId: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      const redirectUri = window.location.origin + '/login';
      const scope = encodeURIComponent('openid email profile');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scope}&prompt=select_account`;

      const width = 500;
      const height = 600;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;

      const popup = window.open(authUrl, 'GoogleAuthPopup', `width=${width},height=${height},top=${top},left=${left}`);

      if (!popup) {
        reject({
          type: AuthErrorType.INVALID_LOGIN,
          message: 'Popup blocked. Please allow popups for Google Sign-In.'
        });
        return;
      }

      const timer = setInterval(async () => {
        try {
          if (popup.closed) {
            clearInterval(timer);
            reject({
              type: AuthErrorType.INVALID_LOGIN,
              message: 'Google Authentication popup closed'
            });
            return;
          }

          if (popup.location.href.includes('access_token=')) {
            const hash = popup.location.hash || popup.location.search;
            popup.close();
            clearInterval(timer);

            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');

            if (!accessToken) {
              reject({ type: AuthErrorType.INVALID_LOGIN, message: 'No access token received from Google' });
              return;
            }

            const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (!userInfoRes.ok) {
              throw new Error('Failed to retrieve user profile from Google');
            }

            const googleUser = await userInfoRes.json();

            const authUser: User = {
              id: 'g_' + googleUser.sub,
              name: googleUser.name,
              email: googleUser.email,
              avatar: googleUser.picture,
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

            resolve({
              user: authUser,
              token: accessToken,
              refreshToken: 'g_refresh_' + Date.now()
            });
          }
        } catch (e) {
          // Cross-origin check while browsing Google account picker
        }
      }, 500);
    });
  }

  public async loginWithGitHub(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.generateMockResponse('CLIENT', 'dev.user@nnp.com', 'GitHub Developer');
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
