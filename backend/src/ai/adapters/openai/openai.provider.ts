import OpenAI from 'openai';
import { IAIProvider } from '../../types/iai-provider.interface';
import { AIResponse, AIContext } from '../../models/ai.model';
import { OpenAIConfig } from './config';
import { TokenUsageTracker } from './tracker';
import { RetryHandler } from './retry';

export class OpenAIProvider implements IAIProvider {
  private client!: OpenAI;

  async init(config?: any): Promise<void> {
    this.client = new OpenAI({
      apiKey: OpenAIConfig.getApiKey()
    });
    console.log('[OpenAIProvider] Initialized successfully.');
  }

  private mapContextToMessages(prompt: string, context: AIContext): any[] {
    const messages = [];
    
    if (context.longTermSummary) {
      messages.push({ role: 'system', content: `Background context: ${context.longTermSummary}` });
    }

    if (context.shortTermHistory && context.shortTermHistory.length > 0) {
      context.shortTermHistory.forEach(msg => {
        messages.push({ role: msg.role === 'AI' ? 'assistant' : 'user', content: msg.message });
      });
    }

    messages.push({ role: 'user', content: prompt });
    return messages;
  }

  private parseResponse(content: string | null, usage: any, model: string): AIResponse {
    const tracking = TokenUsageTracker.track(model, usage);
    
    return {
      message: content || '',
      role: 'AI',
      confidence: 0.9,
      suggestions: [],
      actions: {},
      metadata: {
        provider: 'OpenAI',
        model,
        tracking
      }
    };
  }

  async generateResponse(prompt: string, context: AIContext): Promise<AIResponse> {
    const model = OpenAIConfig.getModel();
    
    const operation = async () => {
      const response = await this.client.chat.completions.create({
        model,
        temperature: OpenAIConfig.getTemperature(),
        max_tokens: OpenAIConfig.getMaxTokens(),
        messages: this.mapContextToMessages(prompt, context)
      });

      return this.parseResponse(response.choices[0].message?.content || '', response.usage, model);
    };

    return RetryHandler.executeWithRetry(operation);
  }

  async *streamResponse(prompt: string, context: AIContext): AsyncGenerator<string, void, unknown> {
    const model = OpenAIConfig.getModel();
    
    const stream = await this.client.chat.completions.create({
      model,
      temperature: OpenAIConfig.getTemperature(),
      max_tokens: OpenAIConfig.getMaxTokens(),
      messages: this.mapContextToMessages(prompt, context),
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse> {
    const model = OpenAIConfig.getVisionModel();
    
    const operation = async () => {
      const response = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
      });

      return this.parseResponse(response.choices[0].message?.content || '', response.usage, model);
    };

    return RetryHandler.executeWithRetry(operation);
  }

  async analyzeDocument(documentUrl: string, prompt: string): Promise<AIResponse> {
    // OpenAI currently analyzes text from documents via normal prompts (post parsing)
    return this.generateResponse(`Analyze the following document context: ${documentUrl}. ${prompt}`, { userId: 'sys', shortTermHistory: [], longTermSummary: '' });
  }

  async generateBusinessPlan(context: AIContext): Promise<AIResponse> {
    const operation = async () => {
      const model = OpenAIConfig.getModel();
      const response = await this.client.chat.completions.create({
        model,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: 'You are an AI generating a structured business plan in JSON.' },
          { role: 'user', content: 'Generate a business plan for a SaaS startup.' }
        ]
      });
      return this.parseResponse(response.choices[0].message?.content || '', response.usage, model);
    };
    return RetryHandler.executeWithRetry(operation);
  }

  async generateStrategy(context: AIContext): Promise<AIResponse> { return this.generateBusinessPlan(context); }
  async generateFinance(context: AIContext): Promise<AIResponse> { return this.generateBusinessPlan(context); }
  async generateLocationInsights(context: AIContext): Promise<AIResponse> { return this.generateBusinessPlan(context); }
  async generateProjectGuidance(context: AIContext): Promise<AIResponse> { return this.generateBusinessPlan(context); }
}
