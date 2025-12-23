"use client"

import { createContext, useContext } from 'react';

export type Theme = 'valentine' | 'christmas';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({ 
    theme: 'valentine', 
    toggleTheme: () => {} 
});

export const useTheme = () => useContext(ThemeContext);









