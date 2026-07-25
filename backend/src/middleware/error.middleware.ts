import { Request, Response, NextFunction } from 'express';
import { LoggingService, LogDomain } from '../operations/logging/logger.service';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const route = `${req.method} ${req.path}`;
  
  // Categorize error based on keywords or error classes
  let domain = LogDomain.SYSTEM;
  let category = 'Unexpected Internal Error';
  
  if (err.name === 'ValidationError') category = 'Validation Error';
  else if (err.status === 401 || err.name === 'UnauthorizedError') { domain = LogDomain.AUTH; category = 'Authentication Error'; }
  else if (err.status === 403) { domain = LogDomain.AUTH; category = 'Authorization Error'; }
  else if (err.message.includes('Mongo') || err.message.includes('Database')) { domain = LogDomain.DATABASE; category = 'Database Error'; }
  else if (err.message.includes('AI') || err.message.includes('OpenAI')) { domain = LogDomain.AI; category = 'AI Provider Error'; }
  else if (err.message.includes('Knowledge')) category = 'Knowledge Engine Error';
  else if (err.message.includes('Maps')) category = 'Maps Error';
  else if (err.message.includes('File')) category = 'File Intelligence Error';
  else if (err.message.includes('Voice')) category = 'Voice Error';
  else if (err.message.includes('Cache')) category = 'Cache Error';

  LoggingService.error(domain, `Error on ${route}: [${category}] ${err.message}`, { stack: err.stack });

  const statusCode = err.status || err.statusCode || 500;
  
  // Never expose stack trace in production
  const isProd = process.env.NODE_ENV === 'production';
  
  res.status(statusCode).json({
    success: false,
    category: category,
    error: isProd && statusCode === 500 ? 'An unexpected error occurred. Please try again later.' : err.message,
    ...(isProd ? {} : { stack: err.stack })
  });
};
