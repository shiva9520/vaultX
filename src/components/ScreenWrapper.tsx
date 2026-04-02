import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children }: any) => {
  const themeColors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});