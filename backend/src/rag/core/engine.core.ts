import { KnowledgeService } from '../../knowledge/services/knowledge.service';
import { ContextBuilder, PromptComposer } from './builders.core';
import { KnowledgeFilter } from '../utils/filter.util';
import { ResponseValidator, ConfidenceCalculator } from '../evaluators/evaluators.core';
import { CitationManager, ConversationSummarizer } from '../memory/memory.core';
import { AIService } from '../../ai/services/ai.service';
import { MapsService } from '../../intelligence/maps/services/maps.service';
import { FileService } from '../../intelligence/files/services/file.service';
import { VoiceService } from '../../intelligence/voice/services/voice.service';

export class RetrievalEngine {
  private knowledgeService: KnowledgeService;
  private aiService: AIService;
  private mapsService: MapsService;
  private fileService: FileService;
  private voiceService: VoiceService;

  constructor() {
    this.knowledgeService = new KnowledgeService();
    this.aiService = new AIService(); 
    this.mapsService = new MapsService();
    this.fileService = new FileService();
    this.voiceService = new VoiceService();
  }

  /**
   * The core Master RAG Pipeline.
   * Intercepts the chat request, retrieves knowledge, builds prompts, calls AI, validates, and returns.
   */
  async processRequest(
    userQuestion: string,
    conversationMemory: any[],
    businessSession: any,
    userRole: string,
    language: string,
    currentGoal: string
  ): Promise<any> {
    console.log(`[RAG Pipeline] Processing request: "${userQuestion}"`);

    // 1. Memory Management Check
    await ConversationSummarizer.compressMemoryIfNeeded(conversationMemory);

    // 1. Voice Command Interception (Mock detection)
    // If this request came from the Voice Module, it might be a direct command (e.g., "Stop")
    // We mock this logic by checking if the query is literally "stop"
    if (userQuestion.toLowerCase() === 'stop') {
      return {
        message: 'Speech interrupted.',
        role: 'AI',
        confidence: 1.0,
        suggestions: [],
        actions: { systemCommand: 'STOP_VOICE' },
        metadata: { provider: 'System' }
      };
    }

    // 2. Knowledge Retrieval (Calls KnowledgeEngine -> Intent -> Search -> Rank)
    // We will bypass the `retrieveContext` string formatter here and get raw results in a real implementation.
    // For this mock, we just use a dummy array as if we searched.
    const rawKnowledgeResults = [{ score: 0.9, document: { content: 'Mocked domain knowledge', id: 'doc_1' } }];
    
    // 3. Knowledge Filtering
    const filteredResults = KnowledgeFilter.filter(rawKnowledgeResults, 0.5);

    // 3.5 Location Intelligence Injection (Mocked intent detection)
    let locationData = null;
    const lowerQ = userQuestion.toLowerCase();
    if (lowerQ.includes('in ') || lowerQ.includes('near ') || lowerQ.includes('location')) {
      try {
        // Simple regex to extract location (e.g. "restaurant in omr")
        const match = lowerQ.match(/in ([a-z ]+)/);
        const area = match ? match[1] : 'Chennai';
        const businessType = lowerQ.includes('restaurant') ? 'restaurant' : 'store';
        
        locationData = await this.mapsService.analyzeBusinessLocation(area, businessType);
      } catch (err) {
        console.error('[RAG Pipeline] Failed to fetch location data:', err);
      }
    }

    // 3.6 File Intelligence Injection (Mocked intent detection)
    let fileData = null;
    if (lowerQ.includes('analyze file') || lowerQ.includes('upload')) {
      try {
        const mockFileName = lowerQ.includes('code') ? 'project.zip' : 'business_plan.pdf';
        fileData = await this.fileService.processFile(mockFileName);
      } catch (err) {
        console.error('[RAG Pipeline] Failed to process file:', err);
      }
    }

    // 4. Context Builder
    const contextPayload = ContextBuilder.buildContext(
      filteredResults,
      conversationMemory,
      businessSession,
      userRole,
      language,
      currentGoal,
      locationData,
      fileData
    );

    // 5. Prompt Composer
    const finalPrompt = PromptComposer.compose(
      'System: You are an AI digital co-founder.',
      'Business: Focus on metrics.',
      contextPayload,
      userQuestion
    );

    console.log(`[RAG Pipeline] Generated Prompt Length: ${finalPrompt.length}`);

    // 6. AI Execution
    // Note: We bypass AIService's internal memory management in favor of this strict RAG pipeline.
    const aiResponse = await this.aiService.chat('mock_user_123', finalPrompt, []);

    // 7. Response Validation
    const validation = ResponseValidator.validate(aiResponse, contextPayload);
    if (!validation.isValid) {
      console.warn(`[RAG Pipeline] AI Response failed validation:`, validation.flags);
      return { error: 'Response failed safety validation', flags: validation.flags };
    }

    // 8. Citation Extraction
    const citations = CitationManager.extractCitations(filteredResults, aiResponse.message);

    // 9. Confidence Calculation
    const finalConfidence = ConfidenceCalculator.calculateScore(0.9, 0.8, 0.95);

    return {
      message: aiResponse.message,
      citations,
      confidence: finalConfidence,
      metadata: aiResponse.metadata
    };
  }
}
