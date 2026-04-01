import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../theme/color';

const ScreenWrapper = ({ children }: any) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
});