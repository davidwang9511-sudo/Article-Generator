'use client';

import { useState, useCallback } from 'react';
import { api } from '@/lib/api';
import {
  InterviewState,
  InterviewStep,
  InputMode,
  TranscriptEntry,
} from '@/types';

const initialState: InterviewState = {
  step: 'topic',
  topic: '',
  session: null,
  currentQuestionIndex: 0,
  transcript: [],
  article: null,
  inputMode: 'text',
  isLoading: false,
  error: null,
};

export function useInterview() {
  const [state, setState] = useState<InterviewState>(initialState);

  const setStep = useCallback((step: InterviewStep) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const setInputMode = useCallback((mode: InputMode) => {
    setState((prev) => ({ ...prev, inputMode: mode }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const generateQuestions = useCallback(async (topic: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null, topic }));

    try {
      const session = await api.generateQuestions(topic);
      setState((prev) => ({
        ...prev,
        session,
        step: 'questions',
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate questions',
        isLoading: false,
      }));
    }
  }, []);

  const submitAnswer = useCallback((answer: string) => {
    if (!state.session) return;

    const currentQuestion = state.session.questions[state.currentQuestionIndex];
    
    const entry: TranscriptEntry = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer,
      mode: state.inputMode,
      timestamp: new Date(),
    };

    const newTranscript = [...state.transcript, entry];
    const nextIndex = state.currentQuestionIndex + 1;
    const isComplete = nextIndex >= state.session.questions.length;

    setState((prev) => ({
      ...prev,
      transcript: newTranscript,
      currentQuestionIndex: isComplete ? prev.currentQuestionIndex : nextIndex,
    }));

    return isComplete;
  }, [state.session, state.currentQuestionIndex, state.inputMode, state.transcript]);

  const generateArticle = useCallback(async () => {
    if (!state.session || state.transcript.length === 0) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const transcriptForApi = state.transcript.map((entry) => ({
        question: entry.question,
        answer: entry.answer,
      }));

      const article = await api.generateArticle(state.topic, transcriptForApi);
      
      setState((prev) => ({
        ...prev,
        article,
        step: 'article',
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate article',
        isLoading: false,
      }));
    }
  }, [state.session, state.topic, state.transcript]);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const getCurrentQuestion = useCallback(() => {
    if (!state.session) return null;
    return state.session.questions[state.currentQuestionIndex];
  }, [state.session, state.currentQuestionIndex]);

  const getProgress = useCallback(() => {
    if (!state.session) return 0;
    return ((state.currentQuestionIndex) / state.session.questions.length) * 100;
  }, [state.session, state.currentQuestionIndex]);

  const isInterviewComplete = useCallback(() => {
    if (!state.session) return false;
    return state.transcript.length >= state.session.questions.length;
  }, [state.session, state.transcript]);

  return {
    state,
    setStep,
    setInputMode,
    setError,
    setLoading,
    generateQuestions,
    submitAnswer,
    generateArticle,
    reset,
    getCurrentQuestion,
    getProgress,
    isInterviewComplete,
  };
}

