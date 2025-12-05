import { Controller, Post, Body } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { TranscribeAudioDto } from './dto/transcribe.dto';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('transcribe')
  async transcribe(@Body() dto: TranscribeAudioDto) {
    const result = await this.transcriptionService.transcribeAudio(
      dto.audioData,
      dto.format,
    );
    
    return {
      success: true,
      data: result,
    };
  }
}

