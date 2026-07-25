import { VoiceSessionState, VoiceLanguage } from '../types/voice.types';

export class VoiceSessionManager {
  private activeSessions = new Map<string, VoiceSessionState>();

  createSession(sessionId: string): VoiceSessionState {
    const session: VoiceSessionState = {
      sessionId,
      isAiSpeaking: false,
      isUserSpeaking: false,
      currentLanguage: 'English',
      lastInteractionAt: new Date()
    };
    this.activeSessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId: string): VoiceSessionState | undefined {
    return this.activeSessions.get(sessionId);
  }

  handleUserSpeaking(sessionId: string) {
    const session = this.getSession(sessionId);
    if (!session) return;
    
    session.isUserSpeaking = true;
    
    if (session.isAiSpeaking) {
      // Intelligent Interruption Logic
      console.log(`[VoiceSessionManager] User interrupted AI in session ${sessionId}. Stopping AI speech.`);
      this.stopAiSpeech(sessionId);
    }
  }

  stopAiSpeech(sessionId: string) {
    const session = this.getSession(sessionId);
    if (session) {
      session.isAiSpeaking = false;
      // Emit event to WebSocket to stop TTS on client side
    }
  }

  updateLanguage(sessionId: string, lang: VoiceLanguage) {
    const session = this.getSession(sessionId);
    if (session) session.currentLanguage = lang;
  }
}

export class VoiceAnalytics {
  static logLatency(module: string, ms: number) {
    console.log(`[VoiceAnalytics] ${module} latency: ${ms}ms`);
  }
}

export class WakeWordManager {
  async detectWakeWord(audioBuffer: any): Promise<boolean> {
    // Placeholder for future edge detection (e.g. Porcupine)
    return false;
  }
}
