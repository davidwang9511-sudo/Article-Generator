import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InterviewModule } from './interview/interview.module';
import { TranscriptionModule } from './transcription/transcription.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InterviewModule,
    TranscriptionModule,
    ArticleModule,
  ],
})
export class AppModule {}

