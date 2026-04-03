import React from 'react';
import { StyleSheet } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BAR_HEIGHT = 4;
const TAB_BAR_GAP = 6; // gap between tab bar bottom and safe area

const ScreenWrapper = ({ children }: any) => {
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: themeColors.background,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + TAB_BAR_GAP,
        },
      ]}
    >
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