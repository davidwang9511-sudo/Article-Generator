import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TranscriptionResult } from './interfaces/transcription.interface';
import { MockTranscriptionStrategy } from './strategies/mock-transcription.strategy';
import { WhisperTranscriptionStrategy } from './strategies/whisper-transcription.strategy';

@Injectable()
export class TranscriptionService {
  constructor(
    private configService: ConfigService,
    private mockStrategy: MockTranscriptionStrategy,
    private whisperStrategy: WhisperTranscriptionStrategy,
  ) {}

  private getStrategy() {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    // Use Whisper if API key is available, otherwise use mock
    return apiKey ? this.whisperStrategy : this.mockStrategy;
  }

  async transcribeAudio(audioData: string, format?: string): Promise<TranscriptionResult> {
    const strategy = this.getStrategy();
    return strategy.transcribe(audioData, format);
  }
}

