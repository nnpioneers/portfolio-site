import { AIResponse, AIContext } from '../models/ai.model';

export interface IAIProvider {
  /**
   * Initialize or configure the provider
   */
  init(config?: any): Promise<void>;

  /**
   * Generate a single conversational response
   */
  generateResponse(prompt: string, context: AIContext): Promise<AIResponse>;

  /**
   * Stream a response (AsyncGenerator for chunking)
   */
  streamResponse(prompt: string, context: AIContext): AsyncGenerator<string, void, unknown>;

  /**
   * Analyze an uploaded image
   */
  analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse>;

  /**
   * Analyze a document (PDF, DOCX, TXT)
   */
  analyzeDocument(documentUrl: string, prompt: string): Promise<AIResponse>;

  /**
   * Specialized generation methods
   */
  generateBusinessPlan(context: AIContext): Promise<AIResponse>;
  generateStrategy(context: AIContext): Promise<AIResponse>;
  generateFinance(context: AIContext): Promise<AIResponse>;
  generateLocationInsights(context: AIContext): Promise<AIResponse>;
  generateProjectGuidance(context: AIContext): Promise<AIResponse>;
}
