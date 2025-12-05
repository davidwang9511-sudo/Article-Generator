import React, { memo } from 'react';
import { Badge } from '../ui';
import { colors, typography, gradients } from '../../styles/theme';

/**
 * Application header with logo and status badge
 */
export const Header = memo(function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>⚡</div>
        <div>
          <div style={styles.logoText}>Pressmaster</div>
          <div style={styles.logoSub}>Interview Generator</div>
        </div>
      </div>
      <Badge variant="success">AI Powered</Badge>
    </header>
  );
});

const styles: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    paddingTop: '16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  logoIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
  },
  logoText: {
    fontWeight: typography.weights.bold,
    fontSize: '20px',
    letterSpacing: '-0.02em',
    color: colors.text,
  },
  logoSub: {
    fontSize: typography.sizes.xs,
    color: colors.textDim,
    marginTop: '2px',
  },
};

