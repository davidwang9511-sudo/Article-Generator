import React, { memo, useMemo } from 'react';
import { colors } from '../../styles/theme';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: '24px',
  md: '48px',
  lg: '64px',
};

/**
 * Loading spinner component
 */
export const Spinner = memo(function Spinner({ size = 'md' }: SpinnerProps) {
  const styles = useMemo((): React.CSSProperties => ({
    width: sizeMap[size],
    height: sizeMap[size],
    borderRadius: '50%',
    border: `3px solid ${colors.primaryMuted}`,
    borderTopColor: colors.primary,
    animation: 'spin 1s linear infinite',
  }), [size]);

  return <div style={styles} />;
});

