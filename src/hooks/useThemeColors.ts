import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { darkColors, lightColors } from '../theme/color';

export const useThemeColors = () => {
  const { dark } = useContext(ThemeContext);
  return dark ? darkColors : lightColors;
};
