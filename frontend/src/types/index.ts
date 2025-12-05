// Interview Types
export interface TranscriptEntry {
  question: string;
  answer: string;
  timestamp: number;
}

export interface Article {
  title: string;
  content: string;
  wordCount: number;
  generatedAt: Date;
}

export interface Question {
  id: string;
  question: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GenerateQuestionsResponse {
  sessionId: string;
  topic: string;
  questions: Question[];
}

export interface GenerateArticleResponse {
  title: string;
  content: string;
  wordCount: number;
}

// App State Types
export type InterviewStep = 'topic' | 'interview' | 'generating' | 'article';
export type InputMode = 'text' | 'voice';

export interface InterviewState {
  step: InterviewStep;
  topic: string;
  questions: string[];
  currentQuestionIndex: number;
  transcript: TranscriptEntry[];
  currentAnswer: string;
  article: Article | null;
  inputMode: InputMode;
  isRecording: boolean;
  isLoading: boolean;
  error: string | null;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  autoFocus?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

