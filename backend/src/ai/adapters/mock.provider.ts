import { IAIProvider } from '../types/iai-provider.interface';
import { AIResponse, AIContext } from '../models/ai.model';

export class MockProvider implements IAIProvider {
  async init(config?: any): Promise<void> {
    console.log('[MockProvider] Initialized');
  }

  private mockDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private buildMockResponse(message: string): AIResponse {
    return {
      message,
      role: 'AI',
      confidence: 0.95,
      suggestions: ['Tell me more', 'Generate a report'],
      actions: {},
      metadata: { provider: 'MockProvider', model: 'v1-mock' }
    };
  }

  async generateResponse(prompt: string, context: AIContext): Promise<AIResponse> {
    await this.mockDelay(500);
    return this.buildMockResponse(`I am a mocked response to: "${prompt}"`);
  }

  async *streamResponse(prompt: string, context: AIContext): AsyncGenerator<string, void, unknown> {
    const words = `I am a streamed mock response to: "${prompt}"`.split(' ');
    for (const word of words) {
      await this.mockDelay(100);
      yield word + ' ';
    }
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse> {
    await this.mockDelay(1000);
    return this.buildMockResponse(`Mock analysis of image ${imageUrl}: Looks like a graph.`);
  }

  async analyzeDocument(documentUrl: string, prompt: string): Promise<AIResponse> {
    await this.mockDelay(1000);
    return this.buildMockResponse(`Mock analysis of document ${documentUrl}: Key themes identified.`);
  }

  async generateBusinessPlan(context: AIContext): Promise<AIResponse> {
    await this.mockDelay(2000);
    return this.buildMockResponse(`# Mock Business Plan\n\nExecutive Summary...`);
  }

  async generateStrategy(context: AIContext): Promise<AIResponse> {
    await this.mockDelay(1500);
    return this.buildMockResponse(`Mock Strategy: Focus on product-market fit.`);
  }

  async generateFinance(context: AIContext): Promise<AIResponse> {
    await this.mockDelay(1500);
    return this.buildMockResponse(`Mock Finance: Runway looks good for 12 months.`);
  }

  async generateLocationInsights(context: AIContext): Promise<AIResponse> {
    await this.mockDelay(1000);
    return this.buildMockResponse(`Mock Location Insights: Top talent available in this region.`);
  }

  async generateProjectGuidance(context: AIContext): Promise<AIResponse> {
    await this.mockDelay(1000);
    return this.buildMockResponse(`Mock Project Guidance: Start with the MVP definition phase.`);
  }
}
