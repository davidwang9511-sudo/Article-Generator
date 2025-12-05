import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MockArticleGeneratorStrategy } from './strategies/mock-article-generator.strategy';
import { OpenAIArticleGeneratorStrategy } from './strategies/openai-article-generator.strategy';

@Module({
  controllers: [ArticleController],
  providers: [
    ArticleService,
    MockArticleGeneratorStrategy,
    OpenAIArticleGeneratorStrategy,
  ],
  exports: [ArticleService],
})
export class ArticleModule {}

