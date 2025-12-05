import React, { memo, useState, useCallback, useMemo, forwardRef } from 'react';
import { colors, radius, transitions, typography } from '../../styles/theme';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  maxLength?: number;
}

/**
 * Styled textarea component with focus states
 * ForwardRef for external ref access
 */
export const TextArea = memo(forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      value,
      onChange,
      placeholder,
      rows = 4,
      disabled = false,
      maxLength,
    },
    ref
  ) {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const styles = useMemo((): React.CSSProperties => ({
      width: '100%',
      padding: '16px',
      borderRadius: radius.lg,
      border: `1px solid ${isFocused ? colors.primary : colors.border}`,
      background: 'rgba(9, 9, 11, 0.8)',
      color: colors.text,
      fontSize: typography.sizes.md,
      fontFamily: typography.fontFamily,
      lineHeight: 1.6,
      resize: 'none',
      outline: 'none',
      transition: transitions.normal,
      boxShadow: isFocused ? `0 0 0 3px ${colors.primaryMuted}` : 'none',
    }), [isFocused]);

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        style={styles}
      />
    );
  }
));

