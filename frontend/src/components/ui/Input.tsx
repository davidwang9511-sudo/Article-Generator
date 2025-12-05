import React, { memo, useState, useCallback, useMemo } from 'react';
import { colors, radius, transitions, typography } from '../../styles/theme';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
}

/**
 * Styled input component with focus states
 * Memoized for performance
 */
export const Input = memo(function Input({
  value,
  onChange,
  placeholder,
  onKeyDown,
  autoFocus = false,
  disabled = false,
  type = 'text',
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const styles = useMemo((): React.CSSProperties => ({
    width: '100%',
    padding: '16px 20px',
    borderRadius: radius.lg,
    border: `1px solid ${isFocused ? colors.primary : colors.border}`,
    background: 'rgba(9, 9, 11, 0.8)',
    color: colors.text,
    fontSize: typography.sizes.base,
    fontFamily: typography.fontFamily,
    outline: 'none',
    transition: transitions.normal,
    boxShadow: isFocused ? `0 0 0 3px ${colors.primaryMuted}` : 'none',
  }), [isFocused]);

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      autoFocus={autoFocus}
      disabled={disabled}
      style={styles}
    />
  );
});

