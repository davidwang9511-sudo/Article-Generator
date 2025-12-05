// Color Palette
export const colors = {
  // Base
  background: '#050508',
  backgroundAlt: '#0a0a12',
  surface: 'rgba(24, 24, 27, 0.6)',
  surfaceHover: 'rgba(39, 39, 42, 0.8)',
  
  // Text
  text: '#f4f4f5',
  textMuted: '#a1a1aa',
  textDim: '#71717a',
  textDimmer: '#52525b',
  
  // Primary (Indigo/Purple)
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  primaryMuted: 'rgba(99, 102, 241, 0.2)',
  
  // Accent
  accent: '#a855f7',
  accentPink: '#ec4899',
  
  // Success
  success: '#22c55e',
  successMuted: 'rgba(34, 197, 94, 0.1)',
  
  // Error
  error: '#ef4444',
  errorMuted: 'rgba(239, 68, 68, 0.1)',
  errorLight: '#fca5a5',
  
  // Border
  border: 'rgba(255, 255, 255, 0.06)',
  borderLight: 'rgba(255, 255, 255, 0.1)',
} as const;

// Spacing
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const;

// Border Radius
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
  md: '0 4px 20px rgba(0, 0, 0, 0.25)',
  lg: '0 20px 40px rgba(0, 0, 0, 0.3)',
  glow: '0 4px 20px rgba(99, 102, 241, 0.3)',
} as const;

// Typography
export const typography = {
  fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
  
  sizes: {
    xs: '12px',
    sm: '13px',
    md: '15px',
    base: '16px',
    lg: '18px',
    xl: '22px',
    '2xl': '28px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '52px',
  },
  
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

// Transitions
export const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
} as const;

// Z-Index
export const zIndex = {
  base: 1,
  dropdown: 10,
  modal: 100,
  tooltip: 1000,
} as const;

// Gradients
export const gradients = {
  primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  hero: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
  background: 'linear-gradient(180deg, #050508 0%, #0a0a12 50%, #0f0f1a 100%)',
  glow: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
} as const;

