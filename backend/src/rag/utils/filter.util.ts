export class KnowledgeFilter {
  /**
   * Pre-generation step to strip out redundant or irrelevant contexts from the search results
   * before they reach the ContextBuilder.
   */
  static filter(results: any[], confidenceThreshold: number = 0.5): any[] {
    return results.filter(result => result.score >= confidenceThreshold);
  }
}
