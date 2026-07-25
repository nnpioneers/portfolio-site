import { Request, Response, NextFunction } from 'express';

// Extend Express Request to include metrics
declare global {
  namespace Express {
    interface Request {
      metrics: {
        startTime: [number, number];
        dbTime: number;
        aiTime: number;
        ragTime: number;
      };
    }
  }
}

export const performanceMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Initialize metrics for this request
  req.metrics = {
    startTime: process.hrtime(),
    dbTime: 0,
    aiTime: 0,
    ragTime: 0
  };

  // Intercept response finish to log total time
  res.on('finish', () => {
    const diff = process.hrtime(req.metrics.startTime);
    const totalTimeMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    
    // In production, send this to Datadog/NewRelic
    console.log(`[Metrics] ${req.method} ${req.originalUrl} - Total: ${totalTimeMs}ms | DB: ${req.metrics.dbTime.toFixed(2)}ms | AI: ${req.metrics.aiTime.toFixed(2)}ms | RAG: ${req.metrics.ragTime.toFixed(2)}ms`);
  });

  next();
};
