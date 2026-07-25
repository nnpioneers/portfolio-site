export enum MetricType {
  COUNTER = 'COUNTER',
  GAUGE = 'GAUGE',
  HISTOGRAM = 'HISTOGRAM'
}

export class MetricsCollector {
  private static metrics: Record<string, number> = {};

  static increment(metricName: string, value: number = 1) {
    this.metrics[metricName] = (this.metrics[metricName] || 0) + value;
    // In production, emit to Prometheus/Datadog here
  }

  static set(metricName: string, value: number) {
    this.metrics[metricName] = value;
  }

  static getSnapshot() {
    return { ...this.metrics };
  }
}

export class PerformanceTracker {
  static trackDuration(operationName: string, durationMs: number) {
    MetricsCollector.increment(`latency_total_${operationName}`, durationMs);
    MetricsCollector.increment(`count_${operationName}`);
    
    // Log slow operations
    if (durationMs > 1000) {
      console.warn(`[PerformanceTracker] SLOW OPERATION: ${operationName} took ${durationMs}ms`);
    }
  }

  static async measure<T>(operationName: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    try {
      return await fn();
    } finally {
      const duration = Date.now() - start;
      this.trackDuration(operationName, duration);
    }
  }
}

export class UsageAnalytics {
  static trackAIUsage(userId: string, model: string, promptTokens: number, completionTokens: number, estimatedCost: number) {
    MetricsCollector.increment('ai_total_requests');
    MetricsCollector.increment('ai_prompt_tokens', promptTokens);
    MetricsCollector.increment('ai_completion_tokens', completionTokens);
    MetricsCollector.increment('ai_total_cost_usd', estimatedCost);
    
    // Output structured JSON for data pipeline
    console.log(JSON.stringify({
      type: 'ANALYTICS_AI_USAGE',
      timestamp: new Date().toISOString(),
      userId,
      model,
      promptTokens,
      completionTokens,
      estimatedCost
    }));
  }
}
