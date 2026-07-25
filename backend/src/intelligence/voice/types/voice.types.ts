export type AudioFormat = 'WAV' | 'MP3' | 'PCM';
export type VoiceLanguage = 'English' | 'Tamil' | 'Tanglish' | 'Unknown';

export interface TranscriptionResult {
  text: string;
  confidence: number;
  isPartial: boolean;
  detectedLanguage: VoiceLanguage;
}

export interface VoiceCommand {
  command: 'START_NEW' | 'STOP' | 'REPEAT' | 'SUMMARIZE' | 'CONTINUE' | 'HELP' | 'NONE';
  intentConfidence: number;
}

export interface VoiceSessionState {
  sessionId: string;
  isAiSpeaking: boolean;
  isUserSpeaking: boolean;
  currentLanguage: VoiceLanguage;
  lastInteractionAt: Date;
}
