import React, { memo, useCallback } from 'react';
import type { InputMode } from '../../types';
import { colors, radius, typography, transitions } from '../../styles/theme';

interface ModeToggleProps {
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

/**
 * Toggle between text and voice input modes
 */
export const ModeToggle = memo(function ModeToggle({
  mode,
  onModeChange,
}: ModeToggleProps) {
  const handleTextClick = useCallback(() => onModeChange('text'), [onModeChange]);
  const handleVoiceClick = useCallback(() => onModeChange('voice'), [onModeChange]);

  return (
    <div style={styles.container}>
      <button
        onClick={handleTextClick}
        style={{
          ...styles.button,
          ...(mode === 'text' ? styles.buttonActive : {}),
        }}
      >
        ⌨️ Text
      </button>
      <button
        onClick={handleVoiceClick}
        style={{
          ...styles.button,
          ...(mode === 'voice' ? styles.buttonActive : {}),
        }}
      >
        🎤 Voice
      </button>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    background: 'rgba(9, 9, 11, 0.6)',
    borderRadius: radius.md,
    padding: '4px',
    border: `1px solid ${colors.border}`,
  },
  button: {
    padding: '8px 14px',
    borderRadius: radius.sm,
    border: 'none',
    background: 'transparent',
    color: colors.textDim,
    fontSize: typography.sizes.sm,
    cursor: 'pointer',
    transition: transitions.fast,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: typography.fontFamily,
  },
  buttonActive: {
    background: colors.primaryMuted,
    color: colors.primaryLight,
  },
};

