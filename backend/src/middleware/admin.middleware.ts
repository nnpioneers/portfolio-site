import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response.util';
import jwt from 'jsonwebtoken';

// Mocking JWT secret, in real implementation should use process.env.JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'nnp_super_secret_key_2026';

export const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'UNAUTHORIZED', 'Unauthorized: No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // For this mock implementation, we accept any token that decodes to role: ADMIN
    // In production, we'd verify the JWT properly.
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      // Fallback for mock tokens (e.g. { role: 'ADMIN' } encoded)
      decoded = jwt.decode(token);
    }

    if (!decoded || decoded.role !== 'ADMIN') {
      console.warn(`[Security] Standard user attempted to access Admin API. ID: ${decoded?.id}`);
      return sendError(res, 'FORBIDDEN', 'Forbidden: Admin access required', 403);
    }

    // Attach admin context
    (req as any).adminUser = decoded;
    next();
  } catch (error) {
    console.error('[AdminAuthMiddleware] Error:', error);
    sendError(res, 'UNAUTHORIZED', 'Unauthorized: Invalid token', 401);
  }
};
