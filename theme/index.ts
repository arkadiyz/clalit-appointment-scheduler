export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    notification: string;
    error: string;
    success: string;
    warning: string;
    shadow: string;
    rgba_wite: string;
    black: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    small: number;
    medium: number;
    large: number;
  };
  typography: {
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    fontWeight: {
      light: '300';
      regular: '400';
      medium: '500';
      semiBold: '600';
      bold: '700';
    };
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    surface: '#f8f9fa',
    card: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#ecf0f1',
    notification: '#e74c3c',
    error: '#e74c3c',
    success: '#2ecc71',
    warning: '#f39c12',
    shadow: 'rgba(0, 0, 0, 0.1)',
    rgba_wite: 'rgba(255, 255, 255, 0.9)',
    black: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
    },
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    card: '#363636',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    border: '#404040',
    notification: '#e74c3c',
    error: '#e74c3c',
    success: '#2ecc71',
    warning: '#f39c12',
    shadow: 'rgba(255, 255, 255, 0.1)',
    rgba_wite: 'rgba(255, 255, 255, 0.9)',
    black: 'rgba(0, 0, 0, 0.5)',
  },
};
