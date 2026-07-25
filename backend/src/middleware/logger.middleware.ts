import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const requestId = crypto.randomUUID();
  res.locals.requestId = requestId;
  
  console.log(`[${new Date().toISOString()}] [${requestId}] ${req.method} ${req.url}`);
  next();
};
