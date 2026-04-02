import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { colors } from '../theme/color';
import Icon from 'react-native-vector-icons/Ionicons';

const BalanceCard = () => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const [show, setShow] = useState(true);
  const showState = useSharedValue(1); // 1 = show, 0 = hide

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 90 });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  useEffect(() => {
    showState.value = withTiming(show ? 1 : 0, { duration: 300 });
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const balanceStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(showState.value, [0, 1], [0.3, 1]),
      transform: [{ scale: interpolate(showState.value, [0, 1], [0.95, 1]) }],
    };
  });

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <View style={styles.cardGlow} />
      <View style={styles.header}>
        <Text style={styles.label}>Total Balance</Text>
        <Icon name="scan-outline" size={24} color="#aaa" />
      </View>

      <Pressable onPress={() => setShow(!show)} style={styles.balanceContainer}>
        <Animated.Text style={[styles.balance, balanceStyle]}>
          {show ? '₹1,20,000' : '••••••'}
        </Animated.Text>
        <Icon 
          name={show ? 'eye-off-outline' : 'eye-outline'} 
          size={20} 
          color="#aaa" 
          style={styles.eyeIcon} 
        />
      </Pressable>
      
      <View style={styles.footer}>
        <Text style={styles.cardNumber}>**** 4812</Text>
        <Icon name="logo-apple" size={24} color="#fff" />
      </View>
    </Animated.View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A1F45', // Deep rich purple to represent premium card
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
    elevation: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  cardGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(91, 46, 255, 0.4)',
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#D4D4D8',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  balance: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 1,
  },
  eyeIcon: {
    marginLeft: 12,
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  cardNumber: {
    color: '#A1A1AA',
    fontSize: 16,
    letterSpacing: 2,
  },
});