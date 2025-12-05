import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ArticleGeneratorStrategy, GeneratedArticle, TranscriptEntry } from '../interfaces/article.interface';

@Injectable()
export class OpenAIArticleGeneratorStrategy implements ArticleGeneratorStrategy {
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async generateArticle(
    topic: string,
    transcript: TranscriptEntry[],
    targetWordCount: number = 400,
  ): Promise<GeneratedArticle> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    // Format transcript for the prompt
    const transcriptText = transcript
      .map((entry, i) => `Q${i + 1}: ${entry.question}\nA${i + 1}: ${entry.answer}`)
      .join('\n\n');

    const prompt = `Based on the following interview transcript about "${topic}", write an engaging article of ${targetWordCount}-${targetWordCount + 100} words.

INTERVIEW TRANSCRIPT:
${transcriptText}

REQUIREMENTS:
1. Create a compelling title for the article
2. Write in a professional yet engaging tone
3. Synthesize the interview responses into a cohesive narrative
4. Include relevant quotes from the interview
5. Add an introduction and conclusion
6. Target word count: ${targetWordCount}-${targetWordCount + 100} words

FORMAT YOUR RESPONSE AS JSON:
{
  "title": "Your Article Title",
  "content": "Full article content here..."
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a skilled journalist who writes engaging articles based on interviews. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content || '{}';
    
    try {
      const parsed = JSON.parse(content);
      const wordCount = parsed.content.split(/\s+/).length;

      return {
        id: `article-${Date.now()}`,
        title: parsed.title || `Insights on ${topic}`,
        content: parsed.content || 'Article generation failed.',
        wordCount,
        topic,
        createdAt: new Date(),
      };
    } catch {
      // If JSON parsing fails, treat the entire response as content
      const wordCount = content.split(/\s+/).length;
      return {
        id: `article-${Date.now()}`,
        title: `Insights on ${topic}`,
        content,
        wordCount,
        topic,
        createdAt: new Date(),
      };
    }
  }
}

