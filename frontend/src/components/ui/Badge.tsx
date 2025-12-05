import React, { memo, useMemo } from 'react';
import { colors, radius, typography } from '../../styles/theme';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'primary' | 'error';
  icon?: React.ReactNode;
}

/**
 * Status badge component
 */
export const Badge = memo(function Badge({
  children,
  variant = 'success',
  icon,
}: BadgeProps) {
  const styles = useMemo(() => {
    const variantColors = {
      success: { bg: colors.successMuted, border: 'rgba(34, 197, 94, 0.2)', text: colors.success },
      primary: { bg: colors.primaryMuted, border: 'rgba(99, 102, 241, 0.2)', text: colors.primaryLight },
      error: { bg: colors.errorMuted, border: 'rgba(239, 68, 68, 0.2)', text: colors.errorLight },
    };

    const c = variantColors[variant];

    return {
      container: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: radius.full,
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontSize: typography.sizes.sm,
        color: c.text,
        fontWeight: typography.weights.medium,
      } as React.CSSProperties,
      dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: c.text,
      } as React.CSSProperties,
    };
  }, [variant]);

  return (
    <div style={styles.container}>
      {icon || <span style={styles.dot} />}
      {children}
    </div>
  );
});

