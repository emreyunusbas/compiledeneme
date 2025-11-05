/**
 * Color palette for Pilates Studio Management App
 * Dark theme with neon green accents
 */

export const Colors = {
  // Primary colors
  primary: '#00FF85', // Neon green
  primaryDark: '#00CC6A',
  primaryLight: '#33FFA3',

  // Secondary colors
  secondary: '#8B5CF6', // Purple
  secondaryDark: '#7C3AED',
  secondaryLight: '#A78BFA',

  // Background colors
  background: '#0F0F0F', // Very dark gray
  backgroundLight: '#1A1A1A',
  surface: '#1E1E1E', // Card backgrounds
  surfaceLight: '#2A2A2A',

  // Text colors
  text: '#FFFFFF', // Primary text
  textSecondary: '#A0A0A0', // Secondary text
  textTertiary: '#6B6B6B', // Tertiary/disabled text

  // Status colors
  success: '#00FF85', // Same as primary
  warning: '#FFA500', // Orange
  error: '#FF4D4D', // Red
  info: '#00B8D4', // Cyan
  accent: '#FF6B9D', // Pink

  // UI Element colors
  border: '#2A2A2A',
  borderLight: '#3A3A3A',
  divider: '#2A2A2A',
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.3)',

  // Chart colors
  chart1: '#00FF85',
  chart2: '#8B5CF6',
  chart3: '#FF6B9D',
  chart4: '#00B8D4',
  chart5: '#FFA500',
  chart6: '#FF4D4D',

  // Gradient colors
  gradientStart: '#00FF85',
  gradientEnd: '#00B8D4',

  // Transparent variations
  primaryAlpha10: 'rgba(0, 255, 133, 0.1)',
  primaryAlpha20: 'rgba(0, 255, 133, 0.2)',
  primaryAlpha30: 'rgba(0, 255, 133, 0.3)',
  primaryAlpha50: 'rgba(0, 255, 133, 0.5)',

  secondaryAlpha10: 'rgba(139, 92, 246, 0.1)',
  secondaryAlpha20: 'rgba(139, 92, 246, 0.2)',
  secondaryAlpha30: 'rgba(139, 92, 246, 0.3)',

  surfaceAlpha50: 'rgba(30, 30, 30, 0.5)',
  surfaceAlpha80: 'rgba(30, 30, 30, 0.8)',

  // Legacy/compatibility
  cardBackground: '#1E1E1E',
  inputBackground: '#1A1A1A',
  buttonBackground: '#00FF85',
  buttonText: '#0F0F0F',
  placeholderText: '#6B6B6B',
} as const;

export type ColorName = keyof typeof Colors;

/**
 * Get color with custom opacity
 * @param color - Color name from the Colors object
 * @param opacity - Opacity value between 0 and 1
 */
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Theme object for consistent styling
 */
export const Theme = {
  colors: Colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;

export default Colors;
