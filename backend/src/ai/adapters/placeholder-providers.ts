import { IAIProvider } from '../types/iai-provider.interface';
import { AIResponse, AIContext } from '../models/ai.model';

export class OpenAIProvider implements IAIProvider {
  async init(config: any): Promise<void> {}
  async generateResponse(prompt: string, context: AIContext): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async *streamResponse(prompt: string, context: AIContext): AsyncGenerator<string, void, unknown> { yield 'Not Implemented'; }
  async analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async analyzeDocument(documentUrl: string, prompt: string): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async generateBusinessPlan(context: AIContext): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async generateStrategy(context: AIContext): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async generateFinance(context: AIContext): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async generateLocationInsights(context: AIContext): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
  async generateProjectGuidance(context: AIContext): Promise<AIResponse> { throw new Error('OpenAI Provider Not Implemented'); }
}

export class GeminiProvider implements IAIProvider {
  async init(config: any): Promise<void> {}
  async generateResponse(prompt: string, context: AIContext): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async *streamResponse(prompt: string, context: AIContext): AsyncGenerator<string, void, unknown> { yield 'Not Implemented'; }
  async analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async analyzeDocument(documentUrl: string, prompt: string): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async generateBusinessPlan(context: AIContext): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async generateStrategy(context: AIContext): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async generateFinance(context: AIContext): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async generateLocationInsights(context: AIContext): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
  async generateProjectGuidance(context: AIContext): Promise<AIResponse> { throw new Error('Gemini Provider Not Implemented'); }
}
