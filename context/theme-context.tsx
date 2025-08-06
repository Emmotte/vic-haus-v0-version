'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeName, themes } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('websiteBuilderTheme') as ThemeName;
    if (savedTheme && themes.some(t => t.name === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Apply theme to HTML element
    document.documentElement.setAttribute('data-theme', currentTheme);
    // Save theme to localStorage
    localStorage.setItem('websiteBuilderTheme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
