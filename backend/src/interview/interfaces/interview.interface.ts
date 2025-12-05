export interface InterviewQuestion {
  id: string;
  question: string;
  order: number;
}

export interface InterviewSession {
  id: string;
  topic: string;
  questions: InterviewQuestion[];
  createdAt: Date;
}

export interface QuestionGeneratorStrategy {
  generateQuestions(topic: string, count?: number): Promise<InterviewQuestion[]>;
}

