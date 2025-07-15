import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../theme';
import { ThemeContext } from '../contexts/ThemeContext';
import { RootState } from '../redux/store';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const isDarkMode = useSelector((state: RootState) => state.app.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={{ theme, isDarkMode }}>{children}</ThemeContext.Provider>;
};
