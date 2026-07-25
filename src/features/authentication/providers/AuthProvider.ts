import { User } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface AuthProvider {
  name: string;
  login(credentials?: any): Promise<AuthResponse>;
  logout(): Promise<void>;
  register(data: any): Promise<AuthResponse>;
  verifyToken(token: string): Promise<boolean>;
  refreshToken(refreshToken: string): Promise<AuthResponse>;
}
