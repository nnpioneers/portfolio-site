import { KnowledgeDocument, SearchResult } from '../models/knowledge.model';
import { KnowledgeRepository, KnowledgeEmbeddings } from './repository.core';

export class KnowledgeIndexer {
  private repository: KnowledgeRepository;
  private embeddings: KnowledgeEmbeddings;

  constructor() {
    this.repository = new KnowledgeRepository();
    this.embeddings = new KnowledgeEmbeddings();
  }

  async indexDocument(doc: KnowledgeDocument): Promise<void> {
    // 1. Generate Embeddings for V3.0
    const vector = await this.embeddings.generateEmbedding(doc.content);
    // 2. Store in repository
    console.log(`[KnowledgeIndexer] Indexed document ${doc.id} with vector length ${vector.length}`);
  }
}

export class KnowledgeRanking {
  
  /**
   * Calculates a composite score based on relevance, confidence, freshness, and priority.
   */
  static rankResults(results: SearchResult[]): SearchResult[] {
    return results.map(r => {
      // Dummy algorithm: Weighted average
      r.score = (r.relevance * 0.5) + (r.confidence * 0.3) + (r.freshness * 0.1) + (r.priority * 0.1);
      return r;
    }).sort((a, b) => b.score - a.score);
  }
}

export class KnowledgeSearch {
  private repository: KnowledgeRepository;

  constructor() {
    this.repository = new KnowledgeRepository();
  }

  async search(query: string): Promise<SearchResult[]> {
    console.log(`[KnowledgeSearch] Searching for: "${query}"`);
    // Mock domain search for now
    const allDocs = await this.repository.findByDomain('BUSINESS' as any);
    
    // Basic keyword matching (mocking a real vector search)
    const lowerQuery = query.toLowerCase();
    
    const results = allDocs.map(doc => {
      let relevance = 0.1;
      if (doc.content.toLowerCase().includes(lowerQuery) || doc.title.toLowerCase().includes(lowerQuery)) {
        relevance = 0.9;
      }
      return {
        document: doc,
        relevance,
        confidence: 0.8,
        freshness: 1.0,
        priority: 0.5,
        score: 0
      } as SearchResult;
    });

    // Only return docs with some relevance
    return results.filter(r => r.relevance > 0.5);
  }
}
