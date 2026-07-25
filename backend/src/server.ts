import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import v1Routes from './routes/v1';
import { requestLogger } from './middleware/logger.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { rateLimiter } from './middleware/rateLimiter.middleware';
import { performanceMiddleware } from './middleware/performance.middleware';
import { securityMiddleware } from './middleware/security';

import { DatabaseManager } from './config/db';
import { Seeder } from './database/seeder';
import mongoose from 'mongoose';
import { LoggingService, LogDomain } from './operations/logging/logger.service';

const app = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(performanceMiddleware);
app.use(requestLogger);
app.use(rateLimiter);
app.use(securityMiddleware);

// API Versioning
app.use('/api/v1', v1Routes);

// 404 Handler
app.use((req, res, next) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  error.code = 'ERR_NOT_FOUND';
  next(error);
});

// Global Error Handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

// Initialize Database then start server
DatabaseManager.getInstance().connect().then(async () => {
  await Seeder.run();
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 NNP Backend API Foundation running on http://localhost:${PORT}`);
    console.log(`📚 V1 API available at http://localhost:${PORT}/api/v1`);
  });

  const gracefulShutdown = (signal: string) => {
    LoggingService.info(LogDomain.SYSTEM, `Received ${signal}. Gracefully shutting down...`);
    
    // Stop accepting new connections
    server.close(async () => {
      LoggingService.info(LogDomain.SYSTEM, 'HTTP server closed.');
      
      try {
        // Disconnect from database
        await mongoose.connection.close(false);
        LoggingService.info(LogDomain.SYSTEM, 'MongoDB connection closed.');
        process.exit(0);
      } catch (err) {
        LoggingService.error(LogDomain.SYSTEM, 'Error during MongoDB disconnection', { err });
        process.exit(1);
      }
    });

    // Force shutdown if taking too long (e.g. 10 seconds)
    setTimeout(() => {
      LoggingService.error(LogDomain.SYSTEM, 'Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
});
