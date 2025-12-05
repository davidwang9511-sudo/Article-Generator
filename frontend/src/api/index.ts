import type { 
  ApiResponse, 
  GenerateQuestionsResponse, 
  GenerateArticleResponse,
  TranscriptEntry 
} from '../types';

const API_BASE_URL = 'http://localhost:4000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP error ${response.status}`,
      };
    }

    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error 
        ? error.message 
        : 'Network error. Please check your connection.',
    };
  }
}

/**
 * Interview API
 */
export const interviewApi = {
  /**
   * Generate interview questions for a given topic
   */
  generateQuestions: async (topic: string): Promise<ApiResponse<GenerateQuestionsResponse>> => {
    return fetchApi<GenerateQuestionsResponse>('/interview/generate-questions', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    });
  },
};

/**
 * Article API
 */
export const articleApi = {
  /**
   * Generate an article from interview transcript
   */
  generate: async (
    topic: string,
    transcript: TranscriptEntry[]
  ): Promise<ApiResponse<GenerateArticleResponse>> => {
    return fetchApi<GenerateArticleResponse>('/article/generate', {
      method: 'POST',
      body: JSON.stringify({ topic, transcript }),
    });
  },
};

/**
 * Transcription API (for voice mode)
 */
export const transcriptionApi = {
  /**
   * Transcribe audio to text
   */
  transcribe: async (audioBlob: Blob): Promise<ApiResponse<{ text: string }>> => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      const response = await fetch(`${API_BASE_URL}/transcription/transcribe`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to transcribe audio',
      };
    }
  },
};

