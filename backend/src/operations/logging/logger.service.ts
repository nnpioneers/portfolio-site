export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}

export enum LogDomain {
  AUTH = 'Auth',
  AI = 'AI',
  DATABASE = 'Database',
  VOICE = 'Voice',
  MAPS = 'Maps',
  SYSTEM = 'System',
  HTTP = 'HTTP'
}

export class LoggingService {
  static log(level: LogLevel, domain: LogDomain, message: string, meta?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      domain,
      message,
      ...(meta && { meta })
    };
    
    // In production, this would pipe to Winston/Pino/Datadog
    const logString = JSON.stringify(logEntry);
    if (level === LogLevel.ERROR) {
      console.error(logString);
    } else if (level === LogLevel.WARN) {
      console.warn(logString);
    } else {
      console.log(logString);
    }
  }

  static info(domain: LogDomain, message: string, meta?: any) { this.log(LogLevel.INFO, domain, message, meta); }
  static warn(domain: LogDomain, message: string, meta?: any) { this.log(LogLevel.WARN, domain, message, meta); }
  static error(domain: LogDomain, message: string, meta?: any) { this.log(LogLevel.ERROR, domain, message, meta); }
  static debug(domain: LogDomain, message: string, meta?: any) { this.log(LogLevel.DEBUG, domain, message, meta); }
}

export enum AuditAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  PROJECT_CREATED = 'PROJECT_CREATED',
  BUSINESS_CREATED = 'BUSINESS_CREATED',
  AI_CHAT = 'AI_CHAT',
  FILE_UPLOAD = 'FILE_UPLOAD',
  VOICE_SESSION_START = 'VOICE_SESSION_START'
}

export class AuditService {
  static record(userId: string, action: AuditAction, details?: any) {
    const timestamp = new Date().toISOString();
    const auditEntry = {
      type: 'AUDIT',
      timestamp,
      userId,
      action,
      ...(details && { details })
    };

    // Audit logs strictly logged for compliance
    console.log(JSON.stringify(auditEntry));
  }
}
