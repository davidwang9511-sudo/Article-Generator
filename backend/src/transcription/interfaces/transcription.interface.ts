export interface TranscriptionResult {
  text: string;
  confidence: number;
  duration: number;
  words?: TranscriptionWord[];
}

export interface TranscriptionWord {
  word: string;
  start: number;
  end: number;
  confidence: number;
}

export interface TranscriptionStrategy {
  transcribe(audioData: string, format?: string): Promise<TranscriptionResult>;
}

