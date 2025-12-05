import { Injectable } from '@nestjs/common';
import { InterviewQuestion, QuestionGeneratorStrategy } from '../interfaces/interview.interface';

@Injectable()
export class MockQuestionGeneratorStrategy implements QuestionGeneratorStrategy {
  private readonly questionTemplates: Record<string, string[]> = {
    default: [
      'What inspired you to explore {topic}?',
      'Can you describe your experience with {topic}?',
      'What are the main challenges you face when working with {topic}?',
      'How do you see {topic} evolving in the next few years?',
      'What advice would you give to someone just starting with {topic}?',
    ],
    technology: [
      'What got you interested in {topic}?',
      'How has {topic} changed the way you work?',
      'What are the biggest misconceptions about {topic}?',
      'Can you share a breakthrough moment you had while learning {topic}?',
      'What resources would you recommend for mastering {topic}?',
    ],
    business: [
      'What drove you to start working in {topic}?',
      'What strategies have been most effective for you in {topic}?',
      'How do you measure success in {topic}?',
      'What trends are you seeing in {topic} right now?',
      'What lessons have you learned from failures in {topic}?',
    ],
  };

  private determineCategory(topic: string): string {
    const techKeywords = ['software', 'programming', 'ai', 'tech', 'development', 'code', 'web', 'app', 'data', 'machine learning'];
    const businessKeywords = ['business', 'startup', 'marketing', 'sales', 'entrepreneur', 'management', 'finance'];
    
    const lowerTopic = topic.toLowerCase();
    
    if (techKeywords.some(keyword => lowerTopic.includes(keyword))) {
      return 'technology';
    }
    if (businessKeywords.some(keyword => lowerTopic.includes(keyword))) {
      return 'business';
    }
    return 'default';
  }

  async generateQuestions(topic: string, count: number = 5): Promise<InterviewQuestion[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const category = this.determineCategory(topic);
    const templates = this.questionTemplates[category];
    
    return templates.slice(0, count).map((template, index) => ({
      id: `q-${Date.now()}-${index}`,
      question: template.replace(/{topic}/g, topic),
      order: index + 1,
    }));
  }
}

