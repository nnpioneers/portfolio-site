import { Request, Response, NextFunction } from 'express';
import { PerformanceTracker } from '../operations/metrics/metrics.service';
import { LoggingService, LogDomain } from '../operations/logging/logger.service';

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = `${req.method} ${req.route ? req.route.path : req.path}`;
    
    PerformanceTracker.trackDuration(`http_${route.replace(/[^a-zA-Z0-9]/g, '_')}`, duration);
    
    LoggingService.info(LogDomain.HTTP, `${route} completed in ${duration}ms with status ${res.statusCode}`);
  });

  next();
};
