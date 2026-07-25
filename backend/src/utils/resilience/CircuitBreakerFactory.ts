import CircuitBreaker from 'opossum';
import { LoggingService, LogDomain } from '../../operations/logging/logger.service';

export class CircuitBreakerFactory {
  
  /**
   * Creates a pre-configured circuit breaker for external API calls (e.g., OpenAI, Maps)
   */
  public static create<TI extends any[], TR>(
    action: (...args: TI) => Promise<TR>, 
    name: string,
    domain: LogDomain = LogDomain.SYSTEM,
    options: CircuitBreaker.Options = {}
  ): CircuitBreaker<TI, TR> {
    
    const defaultOptions: CircuitBreaker.Options = {
      timeout: 15000, // If function takes longer than 15 seconds, trigger a failure
      errorThresholdPercentage: 50, // When 50% of requests fail, open the circuit
      resetTimeout: 30000, // After 30 seconds, try again (half-open)
      capacity: 100, // Rolling window size
    };

    const breaker = new CircuitBreaker(action, { ...defaultOptions, ...options });

    // Logging events
    breaker.on('open', () => {
      LoggingService.warn(domain, `[CircuitBreaker: ${name}] CIRCUIT OPENED. Failing fast for the next ${breaker.options.resetTimeout}ms`);
    });

    breaker.on('halfOpen', () => {
      LoggingService.info(domain, `[CircuitBreaker: ${name}] CIRCUIT HALF-OPEN. Testing next request...`);
    });

    breaker.on('close', () => {
      LoggingService.info(domain, `[CircuitBreaker: ${name}] CIRCUIT CLOSED. Service restored.`);
    });

    breaker.on('fallback', (result) => {
      LoggingService.warn(domain, `[CircuitBreaker: ${name}] FALLBACK TRIGGERED.`);
    });

    return breaker;
  }
}
