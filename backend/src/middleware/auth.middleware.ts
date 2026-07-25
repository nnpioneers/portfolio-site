import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/response.util';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'ERR_UNAUTHORIZED', 'Missing or invalid authorization header', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const JWT_SECRET = process.env.JWT_SECRET || 'nnp_mock_secret';
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user to request
    (req as any).user = decoded;
    
    next();
  } catch (error) {
    return sendError(res, 'ERR_UNAUTHORIZED', 'Invalid or expired token', 401);
  }
};
