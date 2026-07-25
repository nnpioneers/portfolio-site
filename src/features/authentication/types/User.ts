export type UserRole = 
  | 'GUEST'
  | 'STUDENT'
  | 'CLIENT'
  | 'STARTUP_FOUNDER'
  | 'BUSINESS_OWNER'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface UserPreferences {
  language: string;
  theme: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'UNVERIFIED';
  createdDate: string;
  lastLogin?: string;
  preferences: UserPreferences;
  businessCount: number;
  projectCount: number;
  subscription: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE';
}
