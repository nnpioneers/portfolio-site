import { IAIProvider } from '../types/iai-provider.interface';
import { AIResponse } from '../models/ai.model';
import { MemoryEngine } from '../memory/memory.engine';
import { PromptEngine } from '../prompts/prompt.engine';
import { MockProvider } from '../adapters/mock.provider';
import { OpenAIProvider } from '../adapters/openai/openai.provider';

export class AIService {
  private provider: IAIProvider;

  constructor() {
    const useOpenAI = process.env.USE_OPENAI === 'true';
    this.provider = useOpenAI ? new OpenAIProvider() : new MockProvider();
    
    // Initialize provider asynchronously
    this.provider.init().catch(err => console.error('[AIService] Failed to init provider:', err));
  }

  async chat(userId: string, message: string, history: any[]): Promise<AIResponse> {
    const context = MemoryEngine.compileContext(userId, history);
    
    // Inject PromptEngine logic
    const systemPrompt = PromptEngine.getSystemPrompt();
    context.longTermSummary = systemPrompt; // Abusing longTermSummary temporarily to inject system prompt, or better yet, the provider maps longTermSummary as the system prompt.
    
    // Provider executes the response blindly, relying on the injected context
    return this.provider.generateResponse(message, context);
  }

  async generateBusinessPlan(userId: string, businessId: string): Promise<AIResponse> {
    const context = MemoryEngine.compileContext(userId, []);
    return this.provider.generateBusinessPlan(context);
  }

  // Other orchestration methods...
}
