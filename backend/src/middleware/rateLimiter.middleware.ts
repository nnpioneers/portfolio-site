import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Mocked rate limiter
  const isLimited = false; 
  if (isLimited) {
    return sendError(res, 'ERR_RATE_LIMIT', 'Too many requests, please try again later', 429);
  }
  next();
};
