export class OpenAIConfig {
  static getApiKey(): string {
    const key = process.env.OPENAI_API_KEY;
    if (!key && process.env.NODE_ENV === 'production') {
      throw new Error('OPENAI_API_KEY is missing in production environment.');
    }
    return key || 'dummy_key_for_testing';
  }

  static getModel(): string {
    return process.env.OPENAI_DEFAULT_MODEL || 'gpt-4o';
  }

  static getVisionModel(): string {
    return process.env.OPENAI_VISION_MODEL || 'gpt-4o';
  }

  static getTemperature(): number {
    return parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');
  }

  static getMaxTokens(): number {
    return parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10);
  }
}
