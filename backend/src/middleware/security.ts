import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
const xss = require('xss-clean');

// Standard API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Stricter Rate Limiter for AI / Expensive Endpoints
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // limit each IP to 20 AI requests per hour
  message: 'Too many AI requests from this IP, please try again after an hour'
});

export const securityMiddleware = (req: any, res: any, next: any) => next();
