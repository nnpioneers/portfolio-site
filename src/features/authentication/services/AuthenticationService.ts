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
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.generateMockResponse('CLIENT', 'google.user@nnp.com', 'Google User');
  }

  public async loginWithGitHub(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return this.generateMockResponse('CLIENT', 'github.user@nnp.com', 'GitHub Developer');
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
