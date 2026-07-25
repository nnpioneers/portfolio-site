export class PromptEngine {
  
  static getSystemPrompt(): string {
    return `You are NNP Business Partner, an advanced AI digital co-founder.
Your role is to assist users in building, scaling, and managing their businesses and software projects.
You must be professional, insightful, and concise.`;
  }

  static getBusinessPrompt(industry: string, stage: string): string {
    return `You are advising a business in the ${industry} industry, currently at the ${stage} stage.
Focus your advice strictly on relevant scaling metrics and industry-specific insights.`;
  }

  static getProjectPrompt(projectDetails: any): string {
    return `You are managing a software project with the following constraints: ${JSON.stringify(projectDetails)}.
Ensure your technical guidance aligns with best practices for these specific requirements.`;
  }

  // More specific prompts like Strategy, Finance, Location, etc.
}
