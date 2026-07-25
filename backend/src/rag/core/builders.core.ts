export class ContextBuilder {
  /**
   * Merges all required data into one structured context payload.
   */
  static buildContext(
    knowledgeResults: any[],
    conversationMemory: any[],
    businessSession: any,
    userRole: string,
    language: string,
    currentGoal: string,
    locationData?: any,
    fileData?: any
  ): any {
    return {
      knowledgeContext: knowledgeResults.map(r => r.document?.content).join('\n---\n') || 'No internal knowledge retrieved.',
      memoryContext: conversationMemory.slice(-10), // Short term context window
      sessionContext: businessSession,
      locationContext: locationData,
      fileContext: fileData,
      metadata: {
        role: userRole,
        language: language,
        goal: currentGoal
      }
    };
  }
}

export class PromptComposer {
  /**
   * Generates the elite Business Co-Founder system prompt and merges Context
   */
  static compose(
    systemPrompt: string,
    businessPrompt: string,
    contextPayload: any,
    userQuestion: string
  ): string {
    const eliteSystemPrompt = `
You are an Elite Digital Business Co-Founder, Startup Mentor, and Technical Project Guide.
You must NEVER provide generic, vague, or purely theoretical answers.
Your advice must be highly professional, practical, and actionable.

LANGUAGE RULES:
- The user prefers to speak in: ${contextPayload.metadata.language || 'English'}
- You must automatically adapt to the user's language (including Tamil or Tanglish).
- Maintain a professional but supportive tone regardless of the language.

KNOWLEDGE RULES:
- Always base your answers on the provided [BUSINESS KNOWLEDGE CONTEXT].
- If industry playbooks or templates are provided, use them as the absolute foundation of your answer.
- Prioritize internal RAG knowledge over general LLM knowledge.

OUTPUT FORMATTING RULES:
Unless the user is just saying hello, EVERY business/project response MUST include these structured sections, styled cleanly in Markdown:

### 💡 Understanding
(A brief 1-sentence summary of what the user is trying to achieve)

### 🎯 Professional Recommendation
(Your expert, direct advice on their query)

### 📋 Step-by-Step Plan
(3 to 5 highly actionable bullet points)

### 💰 Estimated Budget (if applicable)
(A realistic cost breakdown. Say 'N/A' if not a financial query)

### ⏳ Expected Timeline
(A realistic timeframe for execution)

### ⚠️ Possible Risks
(Top 2 things that could go wrong and how to avoid them)

### 🧠 Business Tips
(1 advanced tip or 'secret' from industry experts)

### 🚀 Next Best Action
(The single most important thing the user should do right now)

--- SMART RECOMMENDATIONS ---
End your response by offering 2-3 short, automated ideas for:
- Cost Reduction
- Revenue Growth
- Marketing or Technology Automation
    `.trim();

    const geoBlock = contextPayload.locationContext ? `
[GEOGRAPHIC INTELLIGENCE]
Location: ${contextPayload.locationContext.requestedArea}
Suitability: ${contextPayload.locationContext.businessSuitability}
Opportunity Score (0-100): ${contextPayload.locationContext.opportunityScore}
Market Saturation: ${contextPayload.locationContext.marketSaturation}
Nearby Competitors: ${contextPayload.locationContext.nearbyCompetitors.length}
` : '';

    const fileBlock = contextPayload.fileContext ? `
[FILE INTELLIGENCE]
Classification: ${contextPayload.fileContext.classification}
Filename: ${contextPayload.fileContext.metadata.filename}
Summary: ${contextPayload.fileContext.summary || ''}
Extracted Business Metrics: ${JSON.stringify(contextPayload.fileContext.businessMetrics || {})}
Code/Project Info: ${contextPayload.fileContext.projectType || ''} (Score: ${contextPayload.fileContext.codeQualityScore || 'N/A'})
OCR/Text: ${contextPayload.fileContext.ocrText || ''}
` : '';

    return `
[SYSTEM]
${eliteSystemPrompt}

[BUSINESS KNOWLEDGE CONTEXT]
${contextPayload.knowledgeContext}
${geoBlock}
${fileBlock}
[CONVERSATION HISTORY]
${JSON.stringify(contextPayload.memoryContext)}

[USER QUESTION]
Current Goal: ${contextPayload.metadata.goal}
User Role: ${contextPayload.metadata.role}

Question: ${userQuestion}
    `.trim();
  }
}
