export interface DBUploadedFile {
  _id: string;
  userId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  storageUrl: string;
  createdAt: string;
}

export interface DBNotification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  isRead: boolean;
  createdAt: string;
}

export interface DBSubscription {
  _id: string;
  userId: string;
  planId: string;
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE';
  currentPeriodEnd: string;
  createdAt: string;
}

export interface DBActivity {
  _id: string;
  userId: string;
  action: string; // e.g., 'PROJECT_CREATED', 'MESSAGE_SENT'
  metadata: Record<string, any>;
  timestamp: string;
}

export interface DBAuditLog {
  _id: string;
  entityId: string;
  entityType: string;
  action: 'CREATED' | 'UPDATED' | 'DELETED' | 'DOWNLOADED' | 'EXPORTED' | 'VIEWED' | 'AI_GENERATED';
  performedByUserId: string;
  changes?: { field: string; oldValue: any; newValue: any }[];
  timestamp: string;
  ipAddress?: string;
}
