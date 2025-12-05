import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InterviewQuestion, InterviewSession } from './interfaces/interview.interface';
import { MockQuestionGeneratorStrategy } from './strategies/mock-question-generator.strategy';
import { OpenAIQuestionGeneratorStrategy } from './strategies/openai-question-generator.strategy';

@Injectable()
export class InterviewService {
  private sessions: Map<string, InterviewSession> = new Map();

  constructor(
    private configService: ConfigService,
    private mockStrategy: MockQuestionGeneratorStrategy,
    private openaiStrategy: OpenAIQuestionGeneratorStrategy,
  ) {}

  private getStrategy() {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    // Use OpenAI if API key is available, otherwise use mock
    return apiKey ? this.openaiStrategy : this.mockStrategy;
  }

  async generateQuestions(topic: string, count: number = 5): Promise<InterviewSession> {
    const strategy = this.getStrategy();
    const questions = await strategy.generateQuestions(topic, count);
    
    const session: InterviewSession = {
      id: `session-${Date.now()}`,
      topic,
      questions,
      createdAt: new Date(),
    };

    this.sessions.set(session.id, session);
    return session;
  }

  getSession(sessionId: string): InterviewSession | undefined {
    return this.sessions.get(sessionId);
  }

  getAllSessions(): InterviewSession[] {
    return Array.from(this.sessions.values());
  }
}

