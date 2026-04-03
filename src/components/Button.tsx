import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/color';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Button = ({ title, onPress }: any) => {
    const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
  return (
    // <Pressable style={styles.button} onPress={onPress}>
    //   <Text style={styles.text}>{title}</Text>
    // </Pressable>
    <Pressable
  onPressIn={() => (scale.value = withSpring(0.95))}
  onPressOut={() => (scale.value = withSpring(1))}
  onPress={onPress}
>
  <Animated.View style={[styles.button, animatedStyle]}>
    <Text style={styles.text}>{title}</Text>
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
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});