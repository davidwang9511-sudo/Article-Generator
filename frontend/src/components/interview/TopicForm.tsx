import React, { memo, useCallback } from 'react';
import { Card, Input, Button } from '../ui';
import { colors, typography, gradients } from '../../styles/theme';

interface TopicFormProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

const SUGGESTIONS = [
  'Artificial Intelligence',
  'Remote Work Culture',
  'Climate Technology',
  'Startup Funding',
  'Web3 & Blockchain',
];

/**
 * Topic selection form with suggestions
 */
export const TopicForm = memo(function TopicForm({
  topic,
  onTopicChange,
  onSubmit,
  isLoading,
  error,
}: TopicFormProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && topic.trim()) {
        onSubmit();
      }
    },
    [topic, onSubmit]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      onTopicChange(suggestion);
    },
    [onTopicChange]
  );

  return (
    <div style={styles.heroSection}>
      <div style={styles.heroIcon}>✨</div>
      
      <h1 style={styles.heroTitle}>
        Transform <span style={styles.gradientText}>Interviews</span>
        <br />into Articles
      </h1>
      
      <p style={styles.heroDesc}>
        Enter a topic, answer dynamic questions via voice or text,
        and let AI generate a polished article from your responses.
      </p>

      <Card maxWidth="540px" centered>
        <Input
          value={topic}
          onChange={onTopicChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your interview topic..."
          autoFocus
        />

        <div style={styles.suggestions}>
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                ...styles.suggestionBtn,
                ...(topic === suggestion ? styles.suggestionBtnActive : {}),
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <Button
          onClick={onSubmit}
          disabled={!topic.trim() || isLoading}
          fullWidth
          size="lg"
        >
          {isLoading ? '⏳ Generating Questions...' : '🚀 Start Interview'}
        </Button>

        {error && <div style={styles.error}>{error}</div>}
      </Card>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  heroSection: {
    textAlign: 'center',
    marginBottom: '48px',
    animation: 'fadeIn 0.6s ease-out',
  },
  heroIcon: {
    fontSize: '56px',
    marginBottom: '24px',
    display: 'inline-block',
  },
  heroTitle: {
    fontSize: typography.sizes['5xl'],
    fontWeight: typography.weights.bold,
    lineHeight: 1.1,
    marginBottom: '20px',
    letterSpacing: '-0.03em',
    color: colors.text,
  },
  gradientText: {
    background: gradients.hero,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroDesc: {
    fontSize: typography.sizes.lg,
    color: colors.textMuted,
    maxWidth: '500px',
    margin: '0 auto 40px',
    lineHeight: 1.7,
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '16px',
    marginBottom: '20px',
  },
  suggestionBtn: {
    padding: '10px 16px',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.textMuted,
    fontSize: typography.sizes.sm,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: typography.fontFamily,
  },
  suggestionBtnActive: {
    borderColor: colors.primary,
    color: colors.primaryLight,
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

