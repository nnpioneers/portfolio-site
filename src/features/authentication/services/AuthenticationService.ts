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
    // Mock Delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (credentials.email === 'admin@nnp.com' && credentials.password === 'admin') {
      return this.generateMockResponse('ADMIN');
    }
    
    if (credentials.email === 'user@nnp.com' && credentials.password === 'user') {
      return this.generateMockResponse('BUSINESS_OWNER');
    }

    throw {
      type: AuthErrorType.INVALID_LOGIN,
      message: 'Invalid email or password'
    } as AuthError;
  }

  public async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Clear cookies, tokens, etc.
  }

  public async register(data: any): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return this.generateMockResponse('CLIENT');
  }

  public async refresh(refreshToken: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.generateMockResponse('CLIENT');
  }

  public async verify(token: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return !!token;
  }

  public async forgotPassword(email: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  public async resetPassword(token: string, newPassword: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  public async loginWithGoogle(): Promise<AuthResponse> {
    return this.generateMockResponse('CLIENT');
  }

  public async loginWithGitHub(): Promise<AuthResponse> {
    return this.generateMockResponse('CLIENT');
  }

  private generateMockResponse(role: string): AuthResponse {
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: role === 'ADMIN' ? 'NNP Admin' : 'Demo User',
      email: role === 'ADMIN' ? 'admin@nnp.com' : 'user@nnp.com',
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
