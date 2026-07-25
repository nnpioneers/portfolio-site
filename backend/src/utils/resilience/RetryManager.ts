import retry from 'async-retry';
import { LoggingService, LogDomain } from '../../operations/logging/logger.service';

export interface RetryOptions {
  retries?: number;
  factor?: number;
  minTimeout?: number;
  maxTimeout?: number;
  onRetry?: (e: Error, attempt: number) => void;
}

export class RetryManager {
  /**
   * Executes a promise-returning function with exponential backoff retries.
   */
  public static async execute<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {},
    domain: LogDomain = LogDomain.SYSTEM,
    operationName: string = 'Operation'
  ): Promise<T> {
    
    const defaultOptions: RetryOptions = {
      retries: 3,
      factor: 2,
      minTimeout: 1000, // 1 second
      maxTimeout: 10000, // 10 seconds
      onRetry: (error, attempt) => {
        LoggingService.warn(domain, `[RetryManager] ${operationName} failed (attempt ${attempt}). Retrying... Error: ${error.message}`);
        if (options.onRetry) {
          options.onRetry(error, attempt);
        }
      }
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      return await retry(
        async (bail, attempt) => {
          // If we want to implement manual cancellation or timeout wrapper, it can be done here.
          return await operation();
        },
        finalOptions
      );
    } catch (err: any) {
      LoggingService.error(domain, `[RetryManager] ${operationName} ultimately failed after ${finalOptions.retries} retries.`, { err });
      throw err;
    }
  }
}
