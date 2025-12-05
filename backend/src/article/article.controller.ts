import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { GenerateArticleDto } from './dto/generate-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('generate')
  async generateArticle(@Body() dto: GenerateArticleDto) {
    const article = await this.articleService.generateArticle(
      dto.topic,
      dto.transcript,
      dto.targetWordCount,
    );
    
    return {
      success: true,
      data: article,
    };
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    const article = this.articleService.getArticle(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return {
      success: true,
      data: article,
    };
  }

  @Get()
  async getAllArticles() {
    const articles = this.articleService.getAllArticles();
    return {
      success: true,
      data: articles,
    };
  }
}

