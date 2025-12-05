import React, { memo, useCallback } from 'react';
import { Card, Button, TextArea, ProgressBar } from '../ui';
import { ModeToggle } from './ModeToggle';
import { VoiceInput } from './VoiceInput';
import type { InputMode } from '../../types';
import { colors, typography } from '../../styles/theme';

interface QuestionPanelProps {
  question: string;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  progress: { current: number; total: number };
  isLastQuestion: boolean;
  isLoading: boolean;
  inputMode: InputMode;
  onModeChange: (mode: InputMode) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  error: string | null;
}

/**
 * Question display panel with text/voice input
 */
export const QuestionPanel = memo(function QuestionPanel({
  question,
  answer,
  onAnswerChange,
  onSubmit,
  progress,
  isLastQuestion,
  isLoading,
  inputMode,
  onModeChange,
  isRecording,
  onToggleRecording,
  error,
}: QuestionPanelProps) {
  const handleSubmit = useCallback(() => {
    if (answer.trim() && !isLoading) {
      onSubmit();
    }
  }, [answer, isLoading, onSubmit]);

  const canSubmit = answer.trim().length > 0 && !isLoading;

  return (
    <Card padding="lg">
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.progressWrapper}>
          <span style={styles.questionLabel}>Question</span>
          <ProgressBar current={progress.current} total={progress.total} />
        </div>
        <ModeToggle mode={inputMode} onModeChange={onModeChange} />
      </div>

      {/* Question */}
      <h2 style={styles.question}>{question}</h2>

      {/* Input Area */}
      {inputMode === 'text' ? (
        <div>
          <TextArea
            value={answer}
            onChange={onAnswerChange}
            placeholder="Type your answer here..."
            rows={5}
          />
          <div style={styles.footer}>
            <span style={styles.charCount}>
              {answer.length} characters
            </span>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit}
            >
              {isLastQuestion ? 'Finish Interview' : 'Next Question'} →
            </Button>
          </div>
        </div>
      ) : (
        <VoiceInput
          answer={answer}
          onAnswerChange={onAnswerChange}
          isRecording={isRecording}
          onToggleRecording={onToggleRecording}
          onSubmit={handleSubmit}
          canSubmit={canSubmit}
          isLastQuestion={isLastQuestion}
        />
      )}

      {/* Error */}
      {error && <div style={styles.error}>{error}</div>}
    </Card>
  );
});

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
  },
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
  },
  questionLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.primary,
    whiteSpace: 'nowrap',
  },
  question: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    lineHeight: 1.5,
    marginBottom: '28px',
    color: colors.text,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  charCount: {
    fontSize: typography.sizes.sm,
    color: colors.textDim,
  },
  error: {
    marginTop: '16px',
    padding: '14px 18px',
    borderRadius: '12px',
    background: colors.errorMuted,
    border: `1px solid rgba(239, 68, 68, 0.2)`,
    color: colors.errorLight,
    fontSize: typography.sizes.sm,
  },
};

