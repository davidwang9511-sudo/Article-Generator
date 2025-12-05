import { InterviewSession, TranscriptionResult, GeneratedArticle, TranscriptEntry } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<T> = await response.json();
    return result.data;
  }

  async generateQuestions(topic: string): Promise<InterviewSession> {
    return this.request<InterviewSession>('/interview/generate-questions', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    });
  }

  async transcribeAudio(audioData: string, format: string = 'webm'): Promise<TranscriptionResult> {
    return this.request<TranscriptionResult>('/transcription/transcribe', {
      method: 'POST',
      body: JSON.stringify({ audioData, format }),
    });
  }

  async generateArticle(
    topic: string,
    transcript: Array<{ question: string; answer: string }>,
    targetWordCount: number = 400
  ): Promise<GeneratedArticle> {
    return this.request<GeneratedArticle>('/article/generate', {
      method: 'POST',
      body: JSON.stringify({ topic, transcript, targetWordCount }),
    });
  }
}

export const api = new ApiClient();

