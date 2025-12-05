import React, { memo } from 'react';
import { gradients } from '../../styles/theme';

interface ContainerProps {
  children: React.ReactNode;
}

/**
 * Main layout container with background effects
 */
export const Container = memo(function Container({ children }: ContainerProps) {
  return (
    <div style={styles.app}>
      <div style={styles.bgGlow} />
      <div style={styles.container}>
        {children}
      </div>
    </div>
  );
});

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: '100vh',
    background: gradients.background,
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '140%',
    height: '60%',
    background: gradients.glow,
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px',
  },
};

