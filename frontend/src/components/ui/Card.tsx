import React, { memo, useMemo } from 'react';
import { colors, radius, shadows } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  maxWidth?: string;
  centered?: boolean;
}

const paddingMap = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

/**
 * Reusable card component with glass morphism effect
 * Memoized for performance
 */
export const Card = memo(function Card({
  children,
  padding = 'lg',
  maxWidth,
  centered = false,
}: CardProps) {
  const styles = useMemo((): React.CSSProperties => ({
    background: colors.surface,
    backdropFilter: 'blur(20px)',
    borderRadius: radius.xxl,
    border: `1px solid ${colors.border}`,
    padding: paddingMap[padding],
    boxShadow: shadows.lg,
    maxWidth: maxWidth,
    margin: centered ? '0 auto' : undefined,
  }), [padding, maxWidth, centered]);

  return <div style={styles}>{children}</div>;
});

