import React, { memo } from 'react';
import { Spinner } from '../ui';
import { colors, typography } from '../../styles/theme';

interface GeneratingViewProps {
  transcriptCount: number;
}

/**
 * Loading state while generating article
 */
export const GeneratingView = memo(function GeneratingView({
  transcriptCount,
}: GeneratingViewProps) {
  return (
    <div style={styles.container}>
      <Spinner size="lg" />
      <h2 style={styles.title}>Generating Your Article</h2>
      <p style={styles.subtitle}>
        AI is crafting a polished article from your {transcriptCount} responses...
      </p>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: 'center',
    padding: '80px 20px',
    animation: 'fadeIn 0.5s ease-out',
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.semibold,
    marginTop: '28px',
    marginBottom: '12px',
    color: colors.text,
  },
  subtitle: {
    color: colors.textDim,
    fontSize: typography.sizes.base,
  },
};

