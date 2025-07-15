import { createContext } from 'react';
import { Theme } from '../theme';

export type ThemeContextType = {
  theme: Theme;
  isDarkMode: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
