import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { InterviewQuestion, QuestionGeneratorStrategy } from '../interfaces/interview.interface';

@Injectable()
export class OpenAIQuestionGeneratorStrategy implements QuestionGeneratorStrategy {
  private openai: OpenAI | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async generateQuestions(topic: string, count: number = 5): Promise<InterviewQuestion[]> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Generate ${count} engaging interview questions about "${topic}". 
    
    The questions should:
    - Be open-ended to encourage detailed responses
    - Progress from introductory to more in-depth
    - Be suitable for creating an article from the answers
    - Cover different aspects of the topic
    
    Return ONLY a JSON array of strings, no other text. Example:
    ["Question 1?", "Question 2?", "Question 3?"]`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer who crafts thoughtful, engaging questions.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || '[]';
    
    try {
      const questions: string[] = JSON.parse(content);
      return questions.map((question, index) => ({
        id: `q-${Date.now()}-${index}`,
        question,
        order: index + 1,
      }));
    } catch {
      throw new Error('Failed to parse AI response');
    }
  }
}

