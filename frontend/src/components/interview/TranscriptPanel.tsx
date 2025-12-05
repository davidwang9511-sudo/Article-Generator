import React, { memo, useRef, useEffect } from 'react';
import { Card } from '../ui';
import type { TranscriptEntry } from '../../types';
import { colors, typography, radius } from '../../styles/theme';

interface TranscriptPanelProps {
  transcript: TranscriptEntry[];
}

/**
 * Live transcript panel showing Q&A history
 * Auto-scrolls to bottom when new entries are added
 */
export const TranscriptPanel = memo(function TranscriptPanel({
  transcript,
}: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript.length]);

  return (
    <Card padding="md">
      <div style={styles.header}>
        <span style={styles.icon}>📝</span>
        <span>Live Transcript</span>
        <span style={styles.count}>({transcript.length})</span>
      </div>

      <div ref={scrollRef} style={styles.content}>
        {transcript.length === 0 ? (
          <div style={styles.empty}>
            Your answers will appear here as you complete each question...
          </div>
        ) : (
          transcript.map((entry, index) => (
            <TranscriptItem
              key={entry.timestamp}
              entry={entry}
              index={index}
            />
          ))
        )}
      </div>
    </Card>
  );
});

/**
 * Individual transcript entry
 */
const TranscriptItem = memo(function TranscriptItem({
  entry,
  index,
}: {
  entry: TranscriptEntry;
  index: number;
}) {
  return (
    <div style={styles.item}>
      <div style={styles.question}>
        Q{index + 1}: {entry.question}
      </div>
      <div style={styles.answer}>
        💬 {entry.answer}
      </div>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.success,
    marginBottom: '16px',
  },
  icon: {
    fontSize: '16px',
  },
  count: {
    color: colors.textDim,
    fontWeight: typography.weights.normal,
  },
  content: {
    maxHeight: '400px',
    overflowY: 'auto',
    paddingRight: '8px',
  },
  empty: {
    color: colors.textDimmer,
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    padding: '48px 20px',
    lineHeight: 1.6,
  },
  item: {
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: `1px solid ${colors.border}`,
  },
  question: {
    fontSize: typography.sizes.xs,
    color: colors.textDim,
    marginBottom: '8px',
    fontWeight: typography.weights.medium,
  },
  answer: {
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
    lineHeight: 1.6,
  },
};

