import { useState, useCallback, useMemo } from 'react';
import type { 
  InterviewState, 
  InterviewStep, 
  InputMode, 
  TranscriptEntry, 
  Article 
} from '../types';
import { interviewApi, articleApi } from '../api';

const initialState: InterviewState = {
  step: 'topic',
  topic: '',
  questions: [],
  currentQuestionIndex: 0,
  transcript: [],
  currentAnswer: '',
  article: null,
  inputMode: 'text',
  isRecording: false,
  isLoading: false,
  error: null,
};

/**
 * Custom hook for managing interview state and logic
 * Separates business logic from UI components
 */
export function useInterview() {
  const [state, setState] = useState<InterviewState>(initialState);

  // Derived state
  const currentQuestion = useMemo(() => 
    state.questions[state.currentQuestionIndex] || '',
    [state.questions, state.currentQuestionIndex]
  );

  const progress = useMemo(() => ({
    current: state.currentQuestionIndex + 1,
    total: state.questions.length,
    percentage: state.questions.length > 0 
      ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100 
      : 0,
  }), [state.currentQuestionIndex, state.questions.length]);

  const isLastQuestion = useMemo(() => 
    state.currentQuestionIndex >= state.questions.length - 1,
    [state.currentQuestionIndex, state.questions.length]
  );

  // Actions
  const setTopic = useCallback((topic: string) => {
    setState(prev => ({ ...prev, topic, error: null }));
  }, []);

  const setAnswer = useCallback((answer: string) => {
    setState(prev => ({ ...prev, currentAnswer: answer }));
  }, []);

  const setInputMode = useCallback((mode: InputMode) => {
    setState(prev => ({ ...prev, inputMode: mode }));
  }, []);

  const setStep = useCallback((step: InterviewStep) => {
    setState(prev => ({ ...prev, step }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const toggleRecording = useCallback(() => {
    setState(prev => {
      if (prev.isRecording) {
        // Simulate transcription when stopping
        return {
          ...prev,
          isRecording: false,
          currentAnswer: prev.currentAnswer + 
            (prev.currentAnswer ? ' ' : '') + 
            'This is a simulated voice transcription.',
        };
      }
      return { ...prev, isRecording: true };
    });
  }, []);

  /**
   * Start interview by generating questions
   */
  const startInterview = useCallback(async () => {
    if (!state.topic.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    const response = await interviewApi.generateQuestions(state.topic.trim());

    if (response.success && response.data) {
      const questions = response.data.questions.map(q => q.question);
      setState(prev => ({
        ...prev,
        questions,
        step: 'interview',
        isLoading: false,
      }));
    } else {
      setState(prev => ({
        ...prev,
        error: response.error || 'Failed to generate questions',
        isLoading: false,
      }));
    }
  }, [state.topic]);

  /**
   * Submit current answer and move to next question or generate article
   */
  const submitAnswer = useCallback(async () => {
    if (!state.currentAnswer.trim()) return;

    const newEntry: TranscriptEntry = {
      question: currentQuestion,
      answer: state.currentAnswer.trim(),
      timestamp: Date.now(),
    };

    const updatedTranscript = [...state.transcript, newEntry];

    if (isLastQuestion) {
      // Generate article
      setState(prev => ({
        ...prev,
        transcript: updatedTranscript,
        currentAnswer: '',
        step: 'generating',
        isLoading: true,
      }));

      const response = await articleApi.generate(state.topic, updatedTranscript);

      if (response.success && response.data) {
        const article: Article = {
          title: response.data.title,
          content: response.data.content,
          wordCount: response.data.content.split(/\s+/).length,
          generatedAt: new Date(),
        };

        setState(prev => ({
          ...prev,
          article,
          step: 'article',
          isLoading: false,
        }));
      } else {
        setState(prev => ({
          ...prev,
          error: response.error || 'Failed to generate article',
          step: 'interview',
          isLoading: false,
        }));
      }
    } else {
      // Move to next question
      setState(prev => ({
        ...prev,
        transcript: updatedTranscript,
        currentAnswer: '',
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  }, [state.currentAnswer, state.topic, state.transcript, currentQuestion, isLastQuestion]);

  /**
   * Reset interview to initial state
   */
  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    // State
    ...state,
    currentQuestion,
    progress,
    isLastQuestion,

    // Actions
    setTopic,
    setAnswer,
    setInputMode,
    setStep,
    setError,
    toggleRecording,
    startInterview,
    submitAnswer,
    reset,
  };
}

