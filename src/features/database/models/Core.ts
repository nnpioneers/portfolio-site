export interface DBUser {
  _id: string;
  email: string;
  passwordHash?: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  preferences: {
    theme: string;
    language: string;
    notificationsEnabled: boolean;
  };
  subscriptionId?: string;
}

export interface DBBusiness {
  _id: string;
  ownerId: string;
  name: string;
  industry: string;
  stage: string;
  employeeCount: number;
  establishedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBProject {
  _id: string;
  businessId: string;
  ownerId: string;
  title: string;
  description: string;
  status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
  startDate?: string;
  targetEndDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBSettings {
  _id: string;
  userId: string;
  globalPreferences: Record<string, any>;
  privacySettings: Record<string, boolean>;
  updatedAt: string;
}
