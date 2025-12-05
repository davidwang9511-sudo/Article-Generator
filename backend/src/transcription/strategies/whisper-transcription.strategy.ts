import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { TranscriptionResult, TranscriptionStrategy } from '../interfaces/transcription.interface';

@Injectable()
export class WhisperTranscriptionStrategy implements TranscriptionStrategy {
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async transcribe(audioData: string, format: string = 'webm'): Promise<TranscriptionResult> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured for Whisper');
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audioData, 'base64');
    
    // Create a File object for the API
    const audioFile = new File([audioBuffer], `audio.${format}`, {
      type: `audio/${format}`,
    });

    const startTime = Date.now();
    
    const response = await this.openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      response_format: 'verbose_json',
    });

    const duration = (Date.now() - startTime) / 1000;

    return {
      text: response.text,
      confidence: 0.95, // Whisper doesn't provide confidence, using high default
      duration: response.duration || duration,
    };
  }
}

