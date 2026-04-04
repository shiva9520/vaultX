import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../theme/color';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

// Define interface for better TypeScript support
interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button = ({ title, onPress, loading, disabled }: ButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => !loading && (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      // Disable the button when loading to prevent double-taps
      disabled={disabled || loading} 
    >
      <Animated.View style={[styles.button, animatedStyle, (disabled || loading) && styles.disabled]}>
        {loading ? (
          // Standard loader that works on both iOS and Android
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center', // Centers the loader/text
    minHeight: 55, // Prevents the button from shrinking when the loader appears
  },
  disabled: {
    opacity: 0.7, // Visual feedback that the button is locked
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});