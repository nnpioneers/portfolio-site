export type PermissionAction = 
  | 'READ'
  | 'WRITE'
  | 'DELETE'
  | 'EXPORT'
  | 'ADMIN_ACCESS'
  | 'BUSINESS_ACCESS'
  | 'AI_ACCESS'
  | 'PROJECT_ACCESS';

export interface PermissionMatrix {
  role: string;
  permissions: PermissionAction[];
}
