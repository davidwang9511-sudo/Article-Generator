import React, { memo } from 'react';
import { Button } from '../ui';
import { colors, radius, typography } from '../../styles/theme';

interface VoiceInputProps {
  answer: string;
  onAnswerChange: (answer: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  isLastQuestion: boolean;
}

/**
 * Voice input component with recording controls
 */
export const VoiceInput = memo(function VoiceInput({
  answer,
  onAnswerChange,
  isRecording,
  onToggleRecording,
  onSubmit,
  canSubmit,
  isLastQuestion,
}: VoiceInputProps) {
  return (
    <div style={styles.container}>
      {/* Recording Button */}
      <button
        onClick={onToggleRecording}
        style={{
          ...styles.recordButton,
          ...(isRecording ? styles.recordButtonActive : {}),
        }}
      >
        {isRecording ? '⏹️' : '🎤'}
      </button>

      <p style={styles.status}>
        {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
      </p>

      <p style={styles.note}>
        (Mock mode - simulates voice transcription)
      </p>

      {/* Transcribed Text */}
      {answer && (
        <div style={styles.transcript}>
          <span style={styles.transcriptLabel}>Transcription:</span>
          {answer}
        </div>
      )}

      {/* Manual Input Fallback */}
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Or type your answer here..."
        style={styles.input}
      />

      <Button onClick={onSubmit} disabled={!canSubmit}>
        {isLastQuestion ? 'Finish Interview' : 'Next Question'} →
      </Button>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: 'center',
    padding: '24px',
  },
  recordButton: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: `3px solid rgba(99, 102, 241, 0.3)`,
    background: colors.primaryMuted,
    color: colors.primaryLight,
    fontSize: '36px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  recordButtonActive: {
    background: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.5)',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  status: {
    color: colors.textDim,
    fontSize: typography.sizes.sm,
    marginBottom: '8px',
  },
  note: {
    color: colors.textDimmer,
    fontSize: typography.sizes.xs,
    marginBottom: '20px',
  },
  transcript: {
    padding: '16px',
    background: 'rgba(9, 9, 11, 0.6)',
    borderRadius: radius.md,
    textAlign: 'left',
    marginBottom: '16px',
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
  transcriptLabel: {
    display: 'block',
    fontSize: typography.sizes.xs,
    color: colors.textDim,
    marginBottom: '8px',
    fontWeight: typography.weights.medium,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: radius.md,
    border: `1px solid ${colors.border}`,
    background: 'rgba(9, 9, 11, 0.8)',
    color: colors.text,
    fontSize: typography.sizes.sm,
    marginBottom: '20px',
    fontFamily: typography.fontFamily,
    outline: 'none',
  },
};

