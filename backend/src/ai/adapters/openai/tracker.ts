export class CostEstimator {
  // Approximate pricing per 1k tokens (USD)
  private static pricing: Record<string, { prompt: number; completion: number }> = {
    'gpt-4o': { prompt: 0.005, completion: 0.015 },
    'gpt-4-turbo': { prompt: 0.01, completion: 0.03 },
    'gpt-3.5-turbo': { prompt: 0.0005, completion: 0.0015 },
  };

  static calculateCost(model: string, promptTokens: number, completionTokens: number): number {
    const rates = this.pricing[model] || this.pricing['gpt-4o'];
    const promptCost = (promptTokens / 1000) * rates.prompt;
    const completionCost = (completionTokens / 1000) * rates.completion;
    return promptCost + completionCost;
  }
}

export class TokenUsageTracker {
  static track(model: string, usage: any) {
    if (!usage) return null;
    
    const promptTokens = usage.prompt_tokens || 0;
    const completionTokens = usage.completion_tokens || 0;
    const totalTokens = usage.total_tokens || 0;
    
    const estimatedCost = CostEstimator.calculateCost(model, promptTokens, completionTokens);
    
    console.log(`[TokenTracker] Model: ${model} | Tokens: ${totalTokens} | Cost: $${estimatedCost.toFixed(5)}`);
    
    return {
      promptTokens,
      completionTokens,
      totalTokens,
      estimatedCost
    };
  }
}
