import { Request, Response } from 'express';
import { sendSuccess } from '../utils/response.util';
import { DatabaseManager } from '../config/db';
import { HealthMonitor } from '../operations/monitoring/health.service';

export class SystemController {
  
  /**
   * @swagger
   * /api/v1/system/health:
   *   get:
   *     summary: System and DB Health Check
   */
  public async getHealth(req: Request, res: Response) {
    const dbStatus = DatabaseManager.getInstance().getStatus();
    const opsHealth = await HealthMonitor.getSystemHealth();
    
    sendSuccess(res, {
      status: opsHealth.status,
      version: '3.2.0',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      database: {
        connected: dbStatus.connected,
        readyState: dbStatus.readyState,
        host: dbStatus.host
      },
      operations: opsHealth
    });
  }
}
