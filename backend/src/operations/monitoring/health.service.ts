import { LoggingService, LogDomain } from '../logging/logger.service';

export enum HealthStatus {
  UP = 'UP',
  DOWN = 'DOWN',
  DEGRADED = 'DEGRADED'
}

export interface SystemHealth {
  status: HealthStatus;
  timestamp: string;
  components: {
    database: HealthStatus;
    openai: HealthStatus;
    ragEngine: HealthStatus;
    voiceService: HealthStatus;
  };
  metrics: {
    uptimeSeconds: number;
    memoryUsageMB: number;
  };
}

export class AlertManager {
  static fireAlert(component: string, message: string) {
    // In production, send to PagerDuty or Slack Webhook
    LoggingService.error(LogDomain.SYSTEM, `[ALERT] ${component} Failure: ${message}`);
  }
}

export class HealthMonitor {
  private static startTime = Date.now();

  static async checkDatabase(): Promise<HealthStatus> {
    // Mock check
    return HealthStatus.UP;
  }

  static async checkOpenAI(): Promise<HealthStatus> {
    // Mock check
    return HealthStatus.UP;
  }

  static async getSystemHealth(): Promise<SystemHealth> {
    const dbStatus = await this.checkDatabase();
    const aiStatus = await this.checkOpenAI();

    let overall = HealthStatus.UP;
    if (dbStatus === HealthStatus.DOWN || aiStatus === HealthStatus.DOWN) {
      overall = HealthStatus.DEGRADED;
      AlertManager.fireAlert('System', 'A core component is down.');
    }

    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;

    return {
      status: overall,
      timestamp: new Date().toISOString(),
      components: {
        database: dbStatus,
        openai: aiStatus,
        ragEngine: HealthStatus.UP,
        voiceService: HealthStatus.UP
      },
      metrics: {
        uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
        memoryUsageMB: Math.round(memoryUsage * 100) / 100
      }
    };
  }
}
