import { IsString, IsNotEmpty, IsOptional, IsBase64 } from 'class-validator';

export class TranscribeAudioDto {
  @IsString()
  @IsNotEmpty()
  audioData: string; // Base64 encoded audio

  @IsString()
  @IsOptional()
  format?: string; // 'webm', 'mp3', 'wav', etc.
}

export class TranscriptionResultDto {
  text: string;
  confidence: number;
  duration: number;
}

