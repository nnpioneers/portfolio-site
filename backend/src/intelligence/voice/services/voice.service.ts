import { VoiceSessionManager } from './core.services';
import { SpeechRecognitionEngine, SpeechSynthesisEngine, NoiseFilter } from '../engines/voice.engines';
import { TranscriptionResult, VoiceCommand, VoiceLanguage } from '../types/voice.types';

export class VoiceService {
  private sessionManager: VoiceSessionManager;
  private stt: SpeechRecognitionEngine;
  private tts: SpeechSynthesisEngine;

  constructor() {
    this.sessionManager = new VoiceSessionManager();
    this.stt = new SpeechRecognitionEngine();
    this.tts = new SpeechSynthesisEngine();
  }

  async processIncomingAudio(sessionId: string, audioBuffer: any): Promise<{ transcription: TranscriptionResult; command: VoiceCommand }> {
    // Register user speaking event (triggers interruption if AI is currently talking)
    this.sessionManager.handleUserSpeaking(sessionId);

    // Clean audio
    const cleanBuffer = NoiseFilter.apply(audioBuffer);

    // Transcribe
    const transcription = await this.stt.processAudioBuffer(cleanBuffer);
    
    // Update session language
    this.sessionManager.updateLanguage(sessionId, transcription.detectedLanguage);

    // Detect explicit Voice Commands (e.g. "Stop")
    const command = this.stt.detectCommand(transcription.text);

    return { transcription, command };
  }

  async generateOutgoingAudio(sessionId: string, text: string): Promise<any> {
    const session = this.sessionManager.getSession(sessionId);
    const lang = session ? session.currentLanguage : 'English';

    // Mark AI as speaking
    if (session) session.isAiSpeaking = true;

    // Generate Audio Stream
    const stream = await this.tts.generateSpeechStream(text, lang);

    return stream;
  }
}
