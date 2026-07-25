import { KnowledgeSearch, KnowledgeRanking } from '../core/engines.core';
import { KnowledgeDomain } from '../models/knowledge.model';

export class KnowledgeService {
  private searchEngine: KnowledgeSearch;

  constructor() {
    this.searchEngine = new KnowledgeSearch();
  }

  /**
   * Step 1: Detect Intent
   * Analyzes user query to determine the KnowledgeDomain.
   */
  private detectIntent(query: string): KnowledgeDomain {
    // Mocked intent detection. Future versions will use NLP/LLM routing.
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('startup') || lowerQuery.includes('mvp')) return KnowledgeDomain.STARTUP;
    if (lowerQuery.includes('finance') || lowerQuery.includes('funding')) return KnowledgeDomain.FINANCE;
    if (lowerQuery.includes('marketing') || lowerQuery.includes('seo')) return KnowledgeDomain.MARKETING;
    
    return KnowledgeDomain.BUSINESS;
  }

  /**
   * The core Knowledge Retrieval Pipeline
   */
  async retrieveContext(userQuery: string): Promise<string> {
    console.log(`[KnowledgeService] Pipeline started for: "${userQuery}"`);
    
    // 1. Intent Detection
    const domain = this.detectIntent(userQuery);
    console.log(`[KnowledgeService] Intent detected: ${domain}`);

    // 2. Knowledge Search
    const rawResults = await this.searchEngine.search(userQuery);

    // 3. Knowledge Ranking
    const rankedResults = KnowledgeRanking.rankResults(rawResults);

    // 4. Context Compilation
    if (rankedResults.length === 0) {
      return 'No specific NNP knowledge base context found for this query.';
    }

    // In a real scenario, we extract the top N document contents
    return rankedResults.slice(0, 3).map(r => r.document.content).join('\n\n---\n\n');
  }
}
