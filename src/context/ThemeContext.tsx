import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeContextType {
  themePreference: ThemePreference;
  setThemePreference: (pref: ThemePreference) => void;
  dark: boolean;
  setDark: (val: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: any) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('system');
  
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@vaultx_theme');
        if (savedTheme) {
          setThemePreferenceState(savedTheme as ThemePreference);
        }
      } catch (err) { }
    };
    loadTheme();
  }, []);

  const setThemePreference = async (pref: ThemePreference) => {
    setThemePreferenceState(pref);
    try {
      await AsyncStorage.setItem('@vaultx_theme', pref);
    } catch (err) { }
  };
  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    if (themePreference === 'system') {
      setDark(systemColorScheme === 'dark');
    } else {
      setDark(themePreference === 'dark');
    }
  }, [themePreference, systemColorScheme]);

  return (
    <ThemeContext.Provider value={{ themePreference, setThemePreference, dark, setDark }}>
      <StatusBar 
        barStyle={dark ? 'light-content' : 'dark-content'} 
        backgroundColor="transparent"
        translucent={true}
      />
      {children}
    </ThemeContext.Provider>
  );
};