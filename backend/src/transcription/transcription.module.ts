import { Module } from '@nestjs/common';
import { TranscriptionController } from './transcription.controller';
import { TranscriptionService } from './transcription.service';
import { MockTranscriptionStrategy } from './strategies/mock-transcription.strategy';
import { WhisperTranscriptionStrategy } from './strategies/whisper-transcription.strategy';

@Module({
  controllers: [TranscriptionController],
  providers: [
    TranscriptionService,
    MockTranscriptionStrategy,
    WhisperTranscriptionStrategy,
  ],
  exports: [TranscriptionService],
})
export class TranscriptionModule {}

