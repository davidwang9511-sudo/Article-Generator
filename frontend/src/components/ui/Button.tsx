import React, { memo, useMemo } from 'react';
import { colors, radius, shadows, transitions, typography } from '../../styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  type?: 'button' | 'submit';
}

/**
 * Reusable Button component with multiple variants
 * Memoized for performance optimization
 */
export const Button = memo(function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  type = 'button',
}: ButtonProps) {
  const styles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: typography.fontFamily,
      fontWeight: typography.weights.semibold,
      borderRadius: radius.md,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: transitions.normal,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.5 : 1,
    };

    // Size variants
    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: '8px 16px', fontSize: typography.sizes.sm },
      md: { padding: '12px 24px', fontSize: typography.sizes.md },
      lg: { padding: '16px 32px', fontSize: typography.sizes.base },
    };

    // Variant styles
    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: colors.primary,
        color: colors.text,
        boxShadow: shadows.glow,
      },
      secondary: {
        background: colors.surface,
        color: colors.text,
        border: `1px solid ${colors.borderLight}`,
      },
      ghost: {
        background: 'transparent',
        color: colors.textMuted,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  }, [variant, size, fullWidth, disabled]);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
});

