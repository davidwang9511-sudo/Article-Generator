import React, { memo, useMemo } from 'react';
import { colors, radius, transitions, gradients } from '../../styles/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
}

/**
 * Animated progress bar component
 */
export const ProgressBar = memo(function ProgressBar({
  current,
  total,
  showLabel = true,
}: ProgressBarProps) {
  const percentage = useMemo(() => 
    total > 0 ? (current / total) * 100 : 0,
    [current, total]
  );

  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '100%',
    } as React.CSSProperties,
    label: {
      fontSize: '14px',
      fontWeight: 600,
      color: colors.primary,
      whiteSpace: 'nowrap',
    } as React.CSSProperties,
    track: {
      flex: 1,
      height: '4px',
      background: colors.primaryMuted,
      borderRadius: radius.sm,
      overflow: 'hidden',
    } as React.CSSProperties,
    fill: {
      height: '100%',
      background: gradients.primary,
      borderRadius: radius.sm,
      transition: `width ${transitions.slow}`,
      width: `${percentage}%`,
    } as React.CSSProperties,
  }), [percentage]);

  return (
    <div style={styles.container}>
      {showLabel && (
        <span style={styles.label}>
          {current}/{total}
        </span>
      )}
      <div style={styles.track}>
        <div style={styles.fill} />
      </div>
    </div>
  );
});

