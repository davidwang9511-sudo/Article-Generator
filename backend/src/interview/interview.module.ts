import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { MockQuestionGeneratorStrategy } from './strategies/mock-question-generator.strategy';
import { OpenAIQuestionGeneratorStrategy } from './strategies/openai-question-generator.strategy';

@Module({
  controllers: [InterviewController],
  providers: [
    InterviewService,
    MockQuestionGeneratorStrategy,
    OpenAIQuestionGeneratorStrategy,
  ],
  exports: [InterviewService],
})
export class InterviewModule {}

