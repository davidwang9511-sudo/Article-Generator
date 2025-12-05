export interface InterviewQuestion {
  id: string;
  question: string;
  order: number;
}

export interface InterviewSession {
  id: string;
  topic: string;
  questions: InterviewQuestion[];
  createdAt: string;
}

export interface TranscriptEntry {
  questionId: string;
  question: string;
  answer: string;
  mode: 'voice' | 'text';
  timestamp: Date;
}

export interface TranscriptionResult {
  text: string;
  confidence: number;
  duration: number;
}

export interface GeneratedArticle {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  topic: string;
  createdAt: string;
}

export type InterviewStep = 'topic' | 'questions' | 'article';
export type InputMode = 'voice' | 'text';

export interface InterviewState {
  step: InterviewStep;
  topic: string;
  session: InterviewSession | null;
  currentQuestionIndex: number;
  transcript: TranscriptEntry[];
  article: GeneratedArticle | null;
  inputMode: InputMode;
  isLoading: boolean;
  error: string | null;
}

