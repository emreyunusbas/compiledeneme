export const Colors = {
  // Primary Colors
  primary: '#B8FF3C',
  primaryDark: '#9FE61C',
  secondary: '#FF8A50',

  // Background Colors
  background: '#1A1D23',
  backgroundLight: '#252930',

  // Surface Colors
  surface: '#2C3038',
  surfaceLight: '#363A42',

  // Text Colors
  text: '#FFFFFF',
  textSecondary: '#A0A4AB',
  textTertiary: '#6B7280',

  // Border Colors
  border: '#363A42',

  // System Colors
  success: '#4ADE80',
  warning: '#FBBF24',
  error: '#EF4444',
  danger: '#DC2626',
  accent: '#C026D3',

  // Overlay
  overlay: 'rgba(0,0,0,0.6)',

  // Transparent variants
  primaryTransparent: 'rgba(184, 255, 60, 0.1)',
  secondaryTransparent: 'rgba(255, 138, 80, 0.1)',
  successTransparent: 'rgba(74, 222, 128, 0.1)',
  warningTransparent: 'rgba(251, 191, 36, 0.1)',
  errorTransparent: 'rgba(239, 68, 68, 0.1)',
} as const;

export type ColorKey = keyof typeof Colors;