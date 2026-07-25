import { MockProvider } from '../mock.provider';

export class RetryHandler {
  static async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelayMs: number = 1000
  ): Promise<T> {
    let attempt = 0;
    
    while (attempt < maxRetries) {
      try {
        return await operation();
      } catch (error: any) {
        attempt++;
        console.warn(`[RetryHandler] Attempt ${attempt} failed: ${error.message}`);
        
        if (attempt >= maxRetries) {
          console.error(`[RetryHandler] All ${maxRetries} attempts failed. Falling back to MockProvider.`);
          throw error; // Let the orchestrator handle the ultimate fallback
        }
        
        // Exponential backoff
        const delay = baseDelayMs * Math.pow(2, attempt - 1);
        await new Promise(res => setTimeout(res, delay));
      }
    }
    
    throw new Error('Unreachable code in RetryHandler');
  }
}
