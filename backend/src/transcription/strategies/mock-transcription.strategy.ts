import { Injectable } from '@nestjs/common';
import { TranscriptionResult, TranscriptionStrategy } from '../interfaces/transcription.interface';

@Injectable()
export class MockTranscriptionStrategy implements TranscriptionStrategy {
  private readonly mockResponses = [
    "I've been working in this field for about five years now, and it's been an incredible journey of learning and growth.",
    "The biggest challenge I face is staying up-to-date with the rapidly evolving landscape while maintaining deep expertise.",
    "What really excites me is the potential for innovation and the impact we can have on people's lives.",
    "I believe the key to success is combining technical excellence with genuine curiosity and empathy.",
    "My advice would be to never stop learning and to embrace failure as a stepping stone to success.",
    "The most rewarding aspect is seeing ideas come to life and knowing they make a difference.",
    "I think the future holds tremendous opportunities for those who are willing to adapt and innovate.",
  ];

  async transcribe(audioData: string, _format?: string): Promise<TranscriptionResult> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Generate a mock transcription based on audio data length
    const dataLength = audioData.length;
    const responseIndex = dataLength % this.mockResponses.length;
    const text = this.mockResponses[responseIndex];

    return {
      text,
      confidence: 0.85 + Math.random() * 0.14, // 85-99% confidence
      duration: 3 + Math.random() * 7, // 3-10 seconds
    };
  }
}

