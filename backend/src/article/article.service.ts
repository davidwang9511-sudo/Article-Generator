import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeneratedArticle, TranscriptEntry } from './interfaces/article.interface';
import { MockArticleGeneratorStrategy } from './strategies/mock-article-generator.strategy';
import { OpenAIArticleGeneratorStrategy } from './strategies/openai-article-generator.strategy';

@Injectable()
export class ArticleService {
  private articles: Map<string, GeneratedArticle> = new Map();

  constructor(
    private configService: ConfigService,
    private mockStrategy: MockArticleGeneratorStrategy,
    private openaiStrategy: OpenAIArticleGeneratorStrategy,
  ) {}

  private getStrategy() {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    // Use OpenAI if API key is available, otherwise use mock
    return apiKey ? this.openaiStrategy : this.mockStrategy;
  }

  async generateArticle(
    topic: string,
    transcript: TranscriptEntry[],
    targetWordCount?: number,
  ): Promise<GeneratedArticle> {
    const strategy = this.getStrategy();
    const article = await strategy.generateArticle(topic, transcript, targetWordCount);
    
    this.articles.set(article.id, article);
    return article;
  }

  getArticle(articleId: string): GeneratedArticle | undefined {
    return this.articles.get(articleId);
  }

  getAllArticles(): GeneratedArticle[] {
    return Array.from(this.articles.values());
  }
}

