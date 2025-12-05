import React, { memo, useState, useCallback } from 'react';
import { Card, Button } from '../ui';
import type { Article } from '../../types';
import { colors, typography, radius } from '../../styles/theme';

interface ArticleViewProps {
  article: Article;
  topic: string;
  transcriptCount: number;
  onNewInterview: () => void;
}

/**
 * Article display component with copy functionality
 */
export const ArticleView = memo(function ArticleView({
  article,
  topic,
  transcriptCount,
  onNewInterview,
}: ArticleViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(
        `${article.title}\n\n${article.content}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [article]);

  const formattedDate = article.generatedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const paragraphs = article.content.split('\n\n').filter(Boolean);

  return (
    <div style={styles.container}>
      {/* Success Header */}
      <div style={styles.header}>
        <div style={styles.successIcon}>✅</div>
        <h2 style={styles.title}>Your Article is Ready!</h2>
        <p style={styles.subtitle}>
          Generated from {transcriptCount} interview responses about "{topic}"
        </p>
      </div>

      {/* Article Card */}
      <Card padding="xl">
        {/* Meta Info */}
        <div style={styles.meta}>
          <span>📅 {formattedDate}</span>
          <span style={styles.metaDivider}>•</span>
          <span>📝 ~{article.wordCount} words</span>
          <span style={styles.metaDivider}>•</span>
          <span>🎯 {topic}</span>
        </div>

        {/* Article Title */}
        <h1 style={styles.articleTitle}>{article.title}</h1>

        {/* Article Content */}
        <div style={styles.content}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} style={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div style={styles.actions}>
        <Button variant="secondary" onClick={handleCopy}>
          {copied ? '✓ Copied!' : '📋 Copy Article'}
        </Button>
        <Button onClick={onNewInterview}>
          🔄 New Interview
        </Button>
      </div>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  container: {
    animation: 'fadeIn 0.6s ease-out',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  successIcon: {
    fontSize: '56px',
    marginBottom: '20px',
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    marginBottom: '12px',
    color: colors.text,
  },
  subtitle: {
    color: colors.textDim,
    fontSize: typography.sizes.base,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    fontSize: typography.sizes.sm,
    color: colors.textDim,
    flexWrap: 'wrap',
  },
  metaDivider: {
    color: colors.textDimmer,
  },
  articleTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    marginBottom: '32px',
    lineHeight: 1.3,
    letterSpacing: '-0.02em',
    color: colors.text,
  },
  content: {
    fontSize: typography.sizes.lg,
    lineHeight: 1.8,
    color: colors.textMuted,
  },
  paragraph: {
    marginBottom: '20px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '32px',
  },
};

