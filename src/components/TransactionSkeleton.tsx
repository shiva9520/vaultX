import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColors } from '../hooks/useThemeColors';

const TransactionSkeleton = () => {
  const colors = useThemeColors();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.item,
        {
          backgroundColor: colors.card,
          borderColor: colors.glass,
          borderWidth: 1,
        },
        animatedStyle,
      ]}
    >
      <View style={styles.leftContainer}>
        <View
          style={[styles.iconContainer, { backgroundColor: colors.glass }]}
        />
        <View>
          <View
            style={[styles.nameSkeleton, { backgroundColor: colors.glass }]}
          />
          <View
            style={[styles.dateSkeleton, { backgroundColor: colors.glass }]}
          />
        </View>
      </View>
      <View
        style={[styles.amountSkeleton, { backgroundColor: colors.glass }]}
      />
    </Animated.View>
  );
};

export default TransactionSkeleton;

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 14,
  },
  nameSkeleton: {
    width: 120,
    height: 16,
    borderRadius: 8,
    marginBottom: 6,
  },
  dateSkeleton: {
    width: 80,
    height: 12,
    borderRadius: 6,
  },

  amountSkeleton: {
    width: 60,
    height: 20,
    borderRadius: 10,
  },
});
